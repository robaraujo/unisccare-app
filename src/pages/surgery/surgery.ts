import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { StaffService } from '../../providers/staff-service';
import { Global } from '../../helpers/global';
import { UserService } from '../../providers/user-service';
import { ProtectedPage } from '../protected-page/protected-page';

/**
 * Generated class for the SurgeryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-surgery',
  templateUrl: 'surgery.html',
})
export class SurgeryPage extends ProtectedPage {

  public youAlreadyRate: any;
  public staffs: any;
  public ready = false;
  public youRateValue = 3;

  constructor(public navCtrl: NavController,
              public userService: UserService,
              public staffService: StaffService,
              private loadingCtrl: LoadingController,
              private global: Global,
              public navParams: NavParams) {

    super(navCtrl, userService);
  }

  ngOnInit() {
    let loader = this.loadingCtrl.create();
    loader.present();

    this.staffService.listRatings().subscribe(
      (res:any) => {
        this.ready = true;
        loader.dismiss();

        this.staffs = res.staffs;
        this.youAlreadyRate = res.you_rate;
        
        this.staffs.map((staff, i)=> {
          this.staffs[i]['avarage'] = parseFloat(this.staffs[i]['avarage']);
        });
      },
      err=> {
        this.ready = true;
        loader.dismiss();
      }
    );
  }

  youRateChange(e) {
    let message = 'Você irá avaliar seu cirurgião com '+this.youRateValue+' estrelas. Adicione uma mensagem à avaliação(opcional):';
    let ratingText = prompt(message);
    
    if (ratingText === null) {
      return;
    }

    let loader = this.loadingCtrl.create();
    loader.present();

    this.staffService.rate(this.userService.staffInfo('id'), this.youRateValue, ratingText).subscribe(
      res=> {
        loader.dismiss();
        this.youAlreadyRate = 1;
        this.global.showMsg('Avaliação efetuada com sucesso.', 'success');
      },
      err=> {
        loader.dismiss();
        this.global.showMsg('Não foi possível efetuar a avaliação.', 'error');
      }
    );
  }

}
