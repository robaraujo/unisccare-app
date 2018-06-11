import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { FoodService } from '../../providers/food-service';
import { Global } from '../../helpers/global';
import moment from 'moment';
import { ProtectedPage } from '../protected-page/protected-page';
import { UserService } from '../../providers/user-service';

@IonicPage()
@Component({
  selector: 'page-food',
  templateUrl: 'food.html',
})
export class FoodPage extends ProtectedPage {
  userFoods: any;
  public foods: any;
  public moment = moment;
  public meals: any;

  constructor(public navCtrl: NavController,
              public userService: UserService,
              public alertCtrl: AlertController,
              public foodService: FoodService,
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController,
              private global: Global,
              public navParams: NavParams) {

    super(navCtrl, userService);
  }

  ionViewDidLoad() {
    this.getNewFoods();
  }

  getNewFoods() {
    let loader = this.loadingCtrl.create();
    loader.present();

    this.foodService.list().subscribe(
      (res:any)=> {
        
        loader.dismiss();
        this.userFoods = res.user_foods;
        this.foods = res.foods;
        this.meals = res.diets;
      },
      err=> {
        loader.dismiss();
      }
    )
  }

  /**
   * @param type strin - food or diet
   */
  addFood() {
    let modal = this.modalCtrl.create('food-form', {
      foods: this.foods, meals: this.meals
    });

    modal.present();
    modal.onDidDismiss(msg=> {
        console.log(msg)
        if (msg !== 'success') return;
        
        this.global.showMsg('Consumo adicionado com sucesso.', 'success');
        this.getNewFoods();
    });
  }
}
