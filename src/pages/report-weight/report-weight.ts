import { Component, ViewChild, group } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController, DateTime } from 'ionic-angular';
import { Global } from '../../helpers/global';
import moment from 'moment';
import { ProtectedPage } from '../protected-page/protected-page';
import { UserService } from '../../providers/user-service';
import { ReportService } from '../../providers/report-service';

@IonicPage()
@Component({
  selector: 'report-weight-page',
  templateUrl: 'report-weight.html',
})
export class ReportWeightPage extends ProtectedPage {

  public weights: any = [];
  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
    },
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label: (tooltipItems, data)=> {
          return tooltipItems.yLabel+'kg';
        }
      }
    },
  };
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';
  
  @ViewChild('displayDateElem') displayDateElem: DateTime;

  public form = {
    view: 'day',
    selectedDate: new Date().toISOString(),
    displayDate: 'DD/MM/YYYY'
  };

  constructor(public navCtrl: NavController,
              public userService: UserService,
              public alertCtrl: AlertController,
              public reportService: ReportService,
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController,
              private global: Global,
              public navParams: NavParams) {

    super(navCtrl, userService);
    moment.locale('pt-br');
  }

  ionViewDidLoad() {
    this.getNewWeights();
  }

  getNewWeights() {
    let loader = this.loadingCtrl.create();
    loader.present();
    
    let mDate = this.global.fromDatetime(this.form.selectedDate);
    this.reportService.weight(this.form.view, mDate.format('YYYY-MM-DD')).subscribe(
      (weights:any)=> {
        loader.dismiss();
        this.weights = weights;
        this.categorize(mDate);
      },
      err=> {
        loader.dismiss();
      }
    )
  }

  categorize(mDate) {
    
    let grouped = {};
    let data = [];
    let labels = this.global.getTimeLabels(mDate, this.form.view);

    this.weights.map(weight=> {
      let time = this.getTimeLabel(weight.created_at);
      grouped[time] = weight.weight;
    });

    // put grouped data in chats.js format
    labels.map((time, i)=> {
      let last = data[i-1] || 0
      let total = grouped[time] || last;
      data.push(total);
    });
    data = this.fixZeroWeights(data);
    
    this.lineChartData = [{data: data, label: 'Peso'}];
    // hack for update labels
    setTimeout(() => this.lineChartLabels = labels);
  }

  fixZeroWeights(data) {
    var firstWeightIndex = data.lastIndexOf(0)+1;
      if (firstWeightIndex !== 0) {
        var firstWeight = data[firstWeightIndex];
        for (var i=firstWeightIndex; i>=0; i--) {
          data[i] = firstWeight;
        }
      }

      return data;
  }

  /**
   * Return x label name. Ex.: 05, 16, Abr
   * @param weight 
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
    this.getNewWeights();
  }
}
