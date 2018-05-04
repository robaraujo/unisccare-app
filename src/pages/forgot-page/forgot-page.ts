import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../providers/user-service';

@IonicPage()
@Component({
  selector: 'page-forgot-page',
  templateUrl: 'forgot-page.html',
})
export class ForgotPage {

  private forgotData: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public storage: Storage,
    public formBuilder: FormBuilder,
    public userService: UserService) {

    this.forgotData = this.formBuilder.group({
      egn: ['', Validators.compose([Validators.required, Validators.minLength(10), , Validators.maxLength(10)])],
      email: ['', Validators.required],
    });

  }

  ionViewDidLoad() {
    //hide menu when on the login page, regardless of the screen resolution
    this.menuCtrl.enable(false);
  }

}
