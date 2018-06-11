import { Component, ViewChild, group } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, DateTime } from 'ionic-angular';
import { Global } from '../../helpers/global';
import moment from 'moment';
import { ProtectedPage } from '../protected-page/protected-page';
import { UserService } from '../../providers/user-service';
import { ReportService } from '../../providers/report-service';

@IonicPage()
@Component({
  selector: 'report-food-page',
  templateUrl: 'report-food.html',
})
export class ReportFoodPage extends ProtectedPage {

  public foods: any = [];
  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true,
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label: (tooltipItems, data)=> {
          let prefix = data.datasets[tooltipItems.datasetIndex].label+': ';
          let suffix = tooltipItems.yLabel;
  
          if (this.form.type === 'nutrient') {
            if (tooltipItems.yLabel > 1000) {
              let total = (tooltipItems.yLabel/1000).toFixed(2);
              suffix = parseFloat(total)+' g';
            } else {
              suffix = tooltipItems.yLabel + ' mg';
            }
          }
          
          return prefix + suffix;
        }
      }
    },
  };
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  
  @ViewChild('displayDateElem') displayDateElem: DateTime;

  public form = {
    view: 'day',
    selectedDate: new Date().toISOString(),
    type:'nutrient',
    displayDate: 'DD/MM/YYYY'
  };

  public nutrients = {
    protein: 'Proteína',
    carb: 'Carboidrato',
    satured_fat: 'Gord Saturada',
    trans_fat: 'Gord Trans',
    total_fat: 'Gord Total',
    fiber: 'Fibras',
    sodium: 'Sódio',
    iron: 'Ferro',
    calcium: 'Cálcio',
  };

  constructor(public navCtrl: NavController,
              public userService: UserService,
              public alertCtrl: AlertController,
              public reportService: ReportService,
              private loadingCtrl: LoadingController,
              private global: Global,
              public navParams: NavParams) {

    super(navCtrl, userService);
    moment.locale('pt-br');
  }

  ionViewDidLoad() {
    this.getNewFoods();
  }

  getNewFoods() {
    let loader = this.loadingCtrl.create();
    loader.present();
    
    let mDate = this.global.fromDatetime(this.form.selectedDate);
    this.reportService.food(this.form.view, mDate.format('YYYY-MM-DD')).subscribe(
      (foods:any)=> {
        loader.dismiss();
        this.foods = foods;
        this.categorize(mDate);
      },
      err=> {
        loader.dismiss();
      }
    )
  }

  categorize(mDate) {
    
    let grouped = {};
    this.lineChartData = [];
    let labels = this.global.getTimeLabels(mDate, this.form.view);

    this.foods.map(food=> {
      this.preCategorize(grouped, food);
    });

    // put grouped data in chats.js format
    Object.keys(grouped).forEach(groupAttr=> {
    
      let data = [];
      labels.map(time=> {
        let total = grouped[groupAttr][time] || 0;
        data.push(total);
      });

      this.lineChartData.push({data: data, label: groupAttr});
    });
    console.log(grouped)

    // hack for update labels
    setTimeout(() => this.lineChartLabels = labels);
  }

  /**
   * Create an obj in the following formats:
   *   food: {food1: {time1: qtt, time2: qtt}, food2: {time1: qtt, time2: qtt}}
   *   nutrients: {food1: {'Proteína': qtt, time2: qtt}, Carboidrato: {time1: qtt, time2: qtt}}
   * @param grouped 
   * @param food 
   * @param time 
   */
  preCategorize(grouped, food) {
    let time = this.getTimeLabel(food.created_at);

    if (this.form.type === 'food') {
      let groupAttr = food.name+' '+food.portion+food.unity;
      // group by food
      if (!grouped[groupAttr]) {
        grouped[groupAttr] = {};
      }

      grouped[groupAttr][time] = food.total;
      return;
    }

    // form type nutrients
    Object.keys(this.nutrients).forEach(nutrient=> {
      let groupAttr = this.nutrients[nutrient];
      
      // group by food
      if (!grouped[groupAttr]) {
        grouped[groupAttr] = {};
      }

      if (!grouped[groupAttr][time]) {
        grouped[groupAttr][time] = 0;
      }

      grouped[groupAttr][time] += food[nutrient] * food.total;
    });
  }

  /**
   * Return x label name. Ex.: 05, 16, Abr
   * @param food 
   */
  private getTimeLabel(date) {
    let time = moment(date).format('HH');

    if (this.form.view === 'week') {
      time = moment(date).format('ddd');
    } else if (this.form.view === 'month') {
      time = moment(date).format('DD');
    } else if (this.form.view === 'year') {
      time = moment(date).format('MMM');
    }

    return time;
  }

  /**
   * Change view(month, day, hour)
   * @param value 
   */
  changeView(value) {

    if (value === 'day' || value === 'week') {
      this.form.displayDate = 'DD/MM/YYYY';
    } else if (value === 'month') {
      this.form.displayDate = 'MMM YYYY';
    } else {
      this.form.displayDate = 'YYYY';
    }

    setTimeout(()=> this.displayDateElem.open());
  };

  /**
   * Change datetime
   * @param value 
   */
  public changeDate(value) {
    this.form.selectedDate = value;
    this.getNewFoods();
  }

  /**
   * Change type(nutrient or food)
   * @param value 
   */
  changeType(value) {
    this.form.type = value;
    this.lineChartData = [];
    
    let mDate = this.global.fromDatetime(this.form.selectedDate);
    setTimeout(()=> this.categorize(mDate));
  }
}
