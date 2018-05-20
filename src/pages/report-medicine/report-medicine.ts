import { Component, ViewChild, group } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController, DateTime } from 'ionic-angular';
import { Global } from '../../helpers/global';
import moment from 'moment';
import { ProtectedPage } from '../protected-page/protected-page';
import { UserService } from '../../providers/user-service';
import { ReportService } from '../../providers/report-service';

@IonicPage()
@Component({
  selector: 'report-medicine-page',
  templateUrl: 'report-medicine.html',
})
export class ReportMedicinePage extends ProtectedPage {

  public medicines: any = [];
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
    this.getNewMedicines();
  }

  getNewMedicines() {
    let loader = this.loadingCtrl.create();
    loader.present();
    
    let date = this.global.fromDatetime(this.form.selectedDate).format('YYYY-MM-DD');
    this.reportService.medicine(this.form.view, date).subscribe(
      (medicines:any)=> {
        loader.dismiss();
        this.medicines = medicines;
        this.categorize();
      },
      err=> {
        loader.dismiss();
      }
    )
  }

  categorize() {
    
    let grouped = {};
    this.lineChartData = [];
    let labels = this.getTimeLabels();

    this.medicines.map(medicine=> {
      this.preCategorize(grouped, medicine);
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
   *   medicine: {medicine1: {time1: qtt, time2: qtt}, medicine2: {time1: qtt, time2: qtt}}
   *   nutrients: {medicine1: {'Proteína': qtt, time2: qtt}, Carboidrato: {time1: qtt, time2: qtt}}
   * @param grouped 
   * @param medicine 
   * @param time 
   */
  preCategorize(grouped, medicine) {
    let time = this.getTimeLabel(medicine.created_at);
    let groupAttr = medicine.name;

    // group by medicine
    if (!grouped[groupAttr]) {
      grouped[groupAttr] = {};
    }

    grouped[groupAttr][time] = medicine.total;

  }

  /**
   * Get possible time labels based on view(day, month, year..) selected
   */
  private getTimeLabels() {
    let date = this.global.fromDatetime(this.form.selectedDate);
    let labels = [];

    if (this.form.view === 'day') {
      for (let i=1; i<= 23; i++) {
        labels.push( ("0" + i).slice(-2) );
      }
    } else if (this.form.view === 'week') {
      labels =  moment.weekdaysShort();
    } else if (this.form.view === 'month') {
      for (let i=1; i<= date.daysInMonth(); i++) {
        labels.push( ("0" + i).slice(-2) );
      }
    } else if (this.form.view === 'year') {
      labels = moment.monthsShort();
    }

    return labels;
  }

  /**
   * Return x label name. Ex.: 05, 16, Abr
   * @param medicine 
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
    this.getNewMedicines();
  }
}
