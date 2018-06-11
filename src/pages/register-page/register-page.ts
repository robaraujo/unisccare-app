import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController, LoadingController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../providers/user-service';
import { Global } from '../../helpers/global';
import moment from 'moment';
import { StaffService } from '../../providers/staff-service';

@IonicPage()
@Component({
  selector: 'page-register-page',
  templateUrl: 'register-page.html',
})
export class RegisterPage {

  staffs: any;
  private regData: FormGroup;
  maxDate = moment().add(5, 'year').format('YYYY');
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private staffService: StaffService,
    public menuCtrl: MenuController,
    public global: Global,
    private loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public userService: UserService) {

    this.regData = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirm_password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],

      first_weight: [''],
      dt_operation: [''],
      dt_end: [''],
      age: [''],
      staff_id: [''],
    });

  }

  ionViewDidLoad() {
    if (this.userService.logged) {
      return this.global.openPage('JourneyPage');
    }

    //hide menu when on the login page, regardless of the screen resolution
    this.menuCtrl.enable(false);

    let loader = this.loadingCtrl.create();
    loader.present();

    this.staffService.list().subscribe(
      (res:any)=> {
        loader.dismiss();
        this.staffs = res;
      },
      err=> {
        loader.dismiss();
      }
    )
  }

  register() {

    let form = this.regData.value;
    
    if (form.dt_operation) {
      form.dt_operation = this.global.fromDatetime(form.dt_operation).format('YYYY-MM-DD');
    }
    if (form.dt_end) {
      form.dt_end = this.global.fromDatetime(form.dt_end).format('YYYY-MM-DD');
    }
    
    this.userService.register(form).subscribe(
      res=> {
        this.navCtrl.setRoot('JourneyPage').then(
          res=> {
            if (!res) return;
            this.global.showMsg('Registro efetuado com sucesso.', 'success')
            this.menuCtrl.enable(true);
          }
        )
      },
      err=> this.global.showMsg('Erro ao efetuar registro, tente mais tarde.', 'error')
    );
  }
}
