import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProtectedPage } from '../protected-page/protected-page';
import { UserService } from '../../providers/user-service';

/**
 * Generated class for the MonitorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-monitor',
  templateUrl: 'monitor.html',
})
export class MonitorPage extends ProtectedPage{

  constructor(public navCtrl: NavController,
              public userService: UserService,
              private nav: NavController,
              public navParams: NavParams) {

    super(navCtrl, userService);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MonitorPage');
  }

  openPage(page) {
    this.nav.push(page);
  }

}
