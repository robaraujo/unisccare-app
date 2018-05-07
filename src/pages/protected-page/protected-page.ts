import {NavController} from 'ionic-angular';
import { UserService } from '../../providers/user-service';

export class ProtectedPage {

  constructor(
    public navCtrl: NavController,
    public userService: UserService) {
  }

  ionViewCanEnter() {
    if (this.userService.logged) return true;

    setTimeout(()=> {
      this.navCtrl.setRoot('LoginPage');
    });
    return false;
  }
}
