import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { ProtectedPage } from '../protected-page/protected-page';

/**
 * Generated class for the JourneyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-journey',
  templateUrl: 'journey.html',
})
export class JourneyPage extends ProtectedPage {
  
  constructor(private nav: NavController,
              public navCtrl: NavController,
              public userService: UserService,
              private alertCtrl: AlertController,
              public navParams: NavParams) {

    super(navCtrl, userService);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JourneyPage');

    this.checkIncompleteUser();
  }

  checkIncompleteUser() {
    let user = this.userService.logged;
    if (user && user.first_weight && user.dt_operation && user.dt_end && user.staff_id) {
      return true;
    }

    let alert = this.alertCtrl.create({
      title: 'Atenção',
      message: 'Percebemos que seu cadastro não está completo, isso é fundamental para uma melhor experiência. Deseja finalizar seu cadastro?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.openPage('ProfilePage');
          }
        }
      ]
    });
    alert.present();
  }
  openPage(page) {
    this.nav.push(page);
  }
}
