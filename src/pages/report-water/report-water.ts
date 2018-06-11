import { Component, ViewChild, group } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController, DateTime } from 'ionic-angular';
import { Global } from '../../helpers/global';
import moment from 'moment';
import { ProtectedPage } from '../protected-page/protected-page';
import { UserService } from '../../providers/user-service';
import { ReportService } from '../../providers/report-service';

@IonicPage()
@Component({
  selector: 'report-water-page',
  templateUrl: 'report-water.html',
})
export class ReportWaterPage extends ProtectedPage {
  
  public lineChartColors:Array<any> = [
    { // blue
      backgroundColor: 'rgba(33, 150, 243,0.2)',
      borderColor: 'rgba(33, 150, 243,1)',
      pointBackgroundColor: 'rgba(33, 150, 243,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(33, 150, 243,0.8)'
    },
  ];

  public waters: any = [];
  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true,
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label: (tooltipItems, data)=> {

          if (tooltipItems.yLabel > 1000) {
            let total = (tooltipItems.yLabel/1000).toFixed(2);
            return parseFloat(total)+' litro(s)';
          }
          
          return tooltipItems.yLabel+'ml';
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
    this.getNewWaters();
  }

  getNewWaters() {
    let loader = this.loadingCtrl.create();
    loader.present();
    
    let mDate = this.global.fromDatetime(this.form.selectedDate);
    this.reportService.water(this.form.view, mDate.format('YYYY-MM-DD')).subscribe(
      (waters:any)=> {
        loader.dismiss();
        this.waters = waters;
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

    this.waters.map(water=> {
      let time = this.getTimeLabel(water.created_at);
      grouped[time] = water.total;
    });

    // put grouped data in chats.js format
    labels.map(time=> {
      let total = grouped[time] || 0;
      data.push(total);
    });

    this.lineChartData = [{data: data, label: 'Água'}];
    // hack for update labels
    setTimeout(() => this.lineChartLabels = labels);
  }

  /**
   * Return x label name. Ex.: 05, 16, Abr
   * @param water 
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
    this.getNewWaters();
  }
}
