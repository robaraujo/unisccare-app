import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { WaterService } from '../../providers/water-service';
import moment from 'moment';
import { ProtectedPage } from '../protected-page/protected-page';
import { UserService } from '../../providers/user-service';
import { NotificationService } from '../../providers/notification-service';

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage extends ProtectedPage {
  public localNotifications: { id: number; text: string; actions: { id: string; title: string; }[]; }[];
  public water: any;
  public moment = moment;

  constructor(public navCtrl: NavController,
              public userService: UserService,
              public alertCtrl: AlertController,
              public waterService: WaterService,
              private loadingCtrl: LoadingController,
              private notificationService: NotificationService,
              public navParams: NavParams) {
          
    super(navCtrl, userService);
  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create();
    loader.present();

    this.notificationService.getLocal().then(
      (local:any)=> {
        loader.dismiss();
        this.localNotifications = local;
      },
      err=> {
        loader.dismiss();
      }
    );
  }

  changeLocal(value, local) {
    // show loader 
    let loader = this.loadingCtrl.create();
    loader.present();
    setTimeout(()=> loader.dismiss(), 800);

    if (!value) {
      this.notificationService.local.cancel(local.id);
    } else {
      this.notificationService.local.schedule({
        id: local.id,
        text: local.text,
        actions: local.actions,
        trigger: local.trigger
      });
    }
  }
}
