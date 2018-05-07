import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { WaterService } from '../../providers/water-service';
import { Global } from '../../helpers/global';
import moment from 'moment';
import { ProtectedPage } from '../protected-page/protected-page';
import { UserService } from '../../providers/user-service';

@IonicPage()
@Component({
  selector: 'page-water',
  templateUrl: 'water.html',
})
export class WaterPage extends ProtectedPage {
  public water: any;
  public moment = moment;

  constructor(public navCtrl: NavController,
              public userService: UserService,
              public alertCtrl: AlertController,
              public waterService: WaterService,
              private loadingCtrl: LoadingController,
              private global: Global,
              public navParams: NavParams) {
          
    super(navCtrl, userService);
  }

  ionViewDidLoad() {
    this.getNewWaters();
  }

  getNewWaters() {
    let loader = this.loadingCtrl.create();
    loader.present();

    this.waterService.list().subscribe(
      (water:any)=> {
        
        loader.dismiss();
        this.water = water;
      },
      err=> {
        loader.dismiss();
      }
    )
  }

  sendWater(water) {
    if (!water) return;

    let loader = this.loadingCtrl.create();
    loader.present();
    
    this.waterService.create(water).subscribe(
      res=> {
        loader.dismiss();
        this.global.showMsg('Consumo adicionado com sucesso.', 'success');
        this.getNewWaters();
      },
      err=> {
        loader.dismiss();
        this.global.showMsg('Não foi possível adicionar, tente mais tarde.', 'error');
      }
    )
  }

  showWaterAlert() {
    let alert = this.alertCtrl.create({
      title: 'Consumo de Água',
      message: 'Quantidade(ml):',
      inputs: [
        {
          name: 'water',
          placeholder: '250',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
          }
        },{
          text: 'Cadastrar',
          handler: (data) => {
            this.sendWater(data.water)
          }
        }
      ]
    });

    alert.present();
  }

}
