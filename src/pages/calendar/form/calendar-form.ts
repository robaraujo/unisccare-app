import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import moment from 'moment';
import { ScheduleService } from '../../../providers/schedule-service';
import { Global } from '../../../helpers/global';
import { ProtectedPage } from '../../protected-page/protected-page';
import { UserService } from '../../../providers/user-service';

@IonicPage({
  name: 'calendar-form'
})
@Component({
  selector: 'page-calendar-form',
  templateUrl: 'calendar-form.html',
})
export class CalendarFormPage extends ProtectedPage {

  public date = moment().add(1, 'days').toDate();
  public time = new Date();
  
  public title;
  public formatedDate = moment().add(1, 'days').format('DD/MM/YY');
  public formatedTime = moment().format('HH:mm');

  constructor(public navCtrl: NavController,
              public datePicker: DatePicker,
              public viewCtrl: ViewController,
              public scheduleService: ScheduleService,
              public global: Global,
              public loadingCtrl: LoadingController,
              public userService: UserService,
              public navParams: NavParams) {

      super(navCtrl, userService);
  }

  save() {
    let schedule = {
      title: this.title,
      datehr: moment(this.date).format('YYYY-MM-DD')+' '+this.formatedTime
    };

    if (!schedule.title) {
      return this.global.showMsg('Você precisa informar um título.', 'error');
    }

    // show loader
    let loader = this.loadingCtrl.create();
    loader.present();

    this.scheduleService.create(schedule).subscribe(
      res=> {
          loader.dismiss();
          this.close('success');
      },
      err=> {
          loader.dismiss();
          this.global.showMsg('Falha ao criar compromisso.', 'error');
      }
    );
  }

  close(status = 'cancel') {
    this.viewCtrl.dismiss(status);
  }

  openDatePicker() {
    this.datePicker.show({
      date: this.date,
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        this.date = date;
        this.formatedDate = moment(this.date).format('DD/MM/YY');
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  openTimePicker() {
    this.datePicker.show({
      date: this.time,
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      time => {
        this.time = time;
        this.formatedTime = moment(this.time).format('HH:mm');
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

}
