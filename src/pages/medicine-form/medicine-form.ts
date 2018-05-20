import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import moment from 'moment';
import { MedicineService } from '../../providers/medicine-service';
import { Global } from '../../helpers/global';
import { ProtectedPage } from '../protected-page/protected-page';
import { UserService } from '../../providers/user-service';

@IonicPage({
  name: 'medicine-form'
})
@Component({
  selector: 'page-medicine-form',
  templateUrl: 'medicine-form.html',
})
export class MedicineFormPage extends ProtectedPage{

  public medicines: any;
  public qtt: any;
  public medicine_id: any;

  constructor(public navCtrl: NavController,
              public userService: UserService,
              public viewCtrl: ViewController,
              public medicineService: MedicineService,
              public global: Global,
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {
    
    super(navCtrl, userService);
    this.medicines = this.navParams.get('medicines') || [];
  }

  save() {
    let userMedicine = {
      medicine_id: this.medicine_id,
      qtt: this.qtt
    };

    if (!userMedicine.medicine_id || !userMedicine.qtt) {
      return this.global.showMsg('Todos os campos são obrigatórios.', 'error');
    }

    // show loader
    let loader = this.loadingCtrl.create();
    loader.present();

    this.medicineService.create(userMedicine).subscribe(
      res=> {
          loader.dismiss();
          this.close('success');
      },
      err=> {
          loader.dismiss();
          this.global.showMsg('Falha ao cadastrar ingestão.', 'error');
      }
    );
  }

  close(status = 'cancel') {
    this.viewCtrl.dismiss(status);
  }
}
