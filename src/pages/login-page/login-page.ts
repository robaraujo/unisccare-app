import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../providers/user-service';
import { Global } from '../../helpers/global';

@IonicPage()
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
})
export class LoginPage {

  private loginData: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public global: Global,
    public formBuilder: FormBuilder,
    public userService: UserService) {

    this.loginData = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    });
  }

  ionViewDidLoad() {
    if (this.userService.logged) {
      return this.global.openPage('JourneyPage');
    }
    
    //hide menu when on the login page, regardless of the screen resolution
    this.menuCtrl.enable(false);
  }

  login() {
    this.userService.login(this.loginData.value).subscribe(
      res=> this.redirectToHome(),
      err=> this.global.showMsg('Usuário ou senha inválido.', 'error')
    );
  }

  redirectToHome() {
    this.navCtrl.setRoot('JourneyPage');
    this.menuCtrl.enable(true);
  }

  /**
   * Opens a paage
   * 
   * @param page string Page name
   */
  openPage(page: string) {
    this.navCtrl.push(page);
  }
}
