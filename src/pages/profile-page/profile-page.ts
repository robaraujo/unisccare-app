import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, LoadingController } from 'ionic-angular';
import {ProtectedPage} from '../protected-page/protected-page';
import {UserService} from './../../providers/user-service';


@IonicPage()
@Component({
  selector: 'page-profile-page',
  templateUrl: 'profile-page.html',
})
export class ProfilePage extends ProtectedPage {
  
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public userService: UserService) {
    
    super(navCtrl, userService);
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true);
    let loader = this.loadingCtrl.create();
    loader.present();

    this.userService.getFromServer().subscribe(
      res=> loader.dismiss(),
      err=> loader.dismiss()
    )
  }

}
