import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import {ProtectedPage} from '../protected-page/protected-page';
import {Storage} from '@ionic/storage';
import {UserService} from './../../providers/user-service';


@IonicPage()
@Component({
  selector: 'page-profile-page',
  templateUrl: 'profile-page.html',
})
export class ProfilePage extends ProtectedPage {
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public userService: UserService,
    public storage: Storage) {
    
    super(navCtrl, navParams, storage);
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true);
  }

}
