import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../providers/user-service';
import { Global } from '../../helpers/global';

@IonicPage()
@Component({
  selector: 'page-forgot-page',
  templateUrl: 'forgot-page.html',
})
export class ForgotPage {

  public forgotData: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public global: Global,
    public formBuilder: FormBuilder,
    public userService: UserService) {

    this.forgotData = this.formBuilder.group({
      egn: ['', Validators.compose([Validators.required, Validators.minLength(10), , Validators.maxLength(10)])],
      email: ['', Validators.required],
    });

  }

  ionViewDidLoad() {
    if (this.userService.logged) {
      return this.global.openPage('JourneyPage');
    }

    //hide menu when on the login page, regardless of the screen resolution
    this.menuCtrl.enable(false);
  }

}
