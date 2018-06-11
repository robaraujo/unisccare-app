import { Component, ReflectiveInjector } from '@angular/core';
import { IonicPage, NavController, MenuController, LoadingController, NavParams } from 'ionic-angular';
import {UserService} from './../../providers/user-service';
import { StaffService } from '../../providers/staff-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Global } from '../../helpers/global';
import moment from 'moment';
import { StepService } from '../../providers/step-service';

@IonicPage()
@Component({
  selector: 'page-profile-page',
  templateUrl: 'profile-page.html',
})
export class ProfilePage {
  
  public staffs: Array<any> = [];
  private regData: FormGroup;
  public maxDate = moment().add(5, 'year').format('YYYY');
  public submenu:any;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private staffService: StaffService,
    public global: Global,
    public stepService: StepService,
    private formBuilder: FormBuilder,
    public userService: UserService) {

    this.submenu = this.navParams.get('submenu') || 'profile';
  }

  ionViewCanEnter() {
  
    let loader = this.loadingCtrl.create();
    loader.present();

    return new Promise((resolve, reject)=> {
      // not logged
      
      if (!this.userService.logged) {
        setTimeout(()=> {
          this.navCtrl.setRoot('LoginPage');
        });

        loader.dismiss();
        return reject();
      }

      // update user data
      this.userService.getFromServer().subscribe(
        res=> {
          // get staff list
          this.staffService.list().subscribe(
            (res:any)=> {
              resolve();
              loader.dismiss();
              this.staffs = res;
            },
            err=> {
              reject();
              loader.dismiss();
            }
          );
        },
        err=> {
          reject();
          loader.dismiss();
        }
      )
    });
  }

  ngOnInit() {
    let user = this.userService.logged;
    this.regData = this.formBuilder.group({
      first_name: [user['first_name'], Validators.required],
      last_name: [user['last_name'], Validators.required],
      email: [user['email'], Validators.required],

      age: [user['age']],
      staff_id: [user['staff_id']],
      dt_operation: [user['dt_operation']],
      dt_end: [user['dt_end']],
    });
  }

  update() {

    let form = this.regData.value;
    let loader = this.loadingCtrl.create();
    loader.present();

    this.userService.update(form).subscribe(
      res=> {
        loader.dismiss();
        this.global.showMsg('Seus dados foram atualizados.', 'success')
        this.menuCtrl.enable(true);
      },
      err=> {
        loader.dismiss();
        this.global.showMsg('falha ao atualizar dados, tente mais tarde.', 'error');
      }
    );
  }

}
