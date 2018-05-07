import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { MedicineService } from '../../providers/medicine-service';
import { Global } from '../../helpers/global';
import moment from 'moment';
import { ProtectedPage } from '../protected-page/protected-page';
import { UserService } from '../../providers/user-service';

@IonicPage()
@Component({
  selector: 'page-medicine',
  templateUrl: 'medicine.html',
})
export class MedicinePage extends ProtectedPage{
  userMedicines: any;
  public medicines: any;
  public moment = moment;

  constructor(public navCtrl: NavController,
              public userService: UserService,
              public alertCtrl: AlertController,
              public medicineService: MedicineService,
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController,
              private global: Global,
              public navParams: NavParams) {

    super(navCtrl, userService);
  }

  ionViewDidLoad() {
    this.getNewMedicines();
  }

  getNewMedicines() {
    let loader = this.loadingCtrl.create();
    loader.present();

    this.medicineService.list().subscribe(
      (res:any)=> {
        
        loader.dismiss();
        this.userMedicines = res.user_medicines;
        this.medicines = res.medicines;
        console.log(res);
      },
      err=> {
        loader.dismiss();
      }
    )
  }

  addMedicine() {
    let modal = this.modalCtrl.create('medicine-form', {medicines: this.medicines});
    modal.present();
    modal.onDidDismiss(msg=> {
        console.log(msg)
        if (msg !== 'success') return;
        
        this.global.showMsg('Consumo adicionado com sucesso.', 'success');
        this.getNewMedicines();
    });
  }
}
