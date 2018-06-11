import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { WeightService } from '../../providers/weight-service';
import { Global } from '../../helpers/global';
import moment from 'moment';
import { UserService } from '../../providers/user-service';
import { ProtectedPage } from '../protected-page/protected-page';

@IonicPage()
@Component({
  selector: 'page-weights',
  templateUrl: 'weights.html',
})
export class WeightsPage extends ProtectedPage {
  
  public weights: any;
  public moment = moment;

  constructor(public navCtrl: NavController,
              public userService: UserService,
              public alertCtrl: AlertController,
              public weightService: WeightService,
              private loadingCtrl: LoadingController,
              private global: Global,
              public navParams: NavParams) {
        
    super(navCtrl, userService);
  }

  ionViewDidLoad() {
    this.getNewWeights();
  }

  /**
   * Get new wight from server
   */
  getNewWeights() {
    let loader = this.loadingCtrl.create();
    loader.present();

    this.weightService.list().subscribe(
      (weights:any)=> {
        this.weights = weights;
        loader.dismiss();
      },
      err=> {
        loader.dismiss();
      }
    )
  }

  /**
   * Send weight to server
   * @param weight 
   */
  sendWeight(weight) {
    if (!weight) return;

    let loader = this.loadingCtrl.create();
    loader.present();
    
    this.weightService.create(weight).subscribe(
      res=> {
        loader.dismiss();
        this.global.showMsg('Peso adicionado com sucesso.', 'success');
        this.getNewWeights();
        this.controlNewWeight(weight);
      },
      err=> {
        loader.dismiss();
        this.global.showMsg('Não foi possível adicionar seu peso, tente mais tarde.', 'error');
      }
    )
  }

  /**
   * Show alert to add new weight
   */
  showWeightAlert() {
    let alert = this.alertCtrl.create({
      title: 'Cadastro de Peso',
      message: 'Informe seu peso atual:',
      inputs: [
        {
          name: 'weight',
          placeholder: '',
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
            this.sendWeight(data.weight)
          }
        }
      ]
    });

    alert.present();
  }

  controlNewWeight(weight) {
    let user = this.userService.logged;

    user.last_weight = parseFloat(weight);
    if (!user.first_weight) {
      user.first_weight = user.last_weight;
    }
    console.log(user)
    this.userService.saveDataUser(user);
  }
}
