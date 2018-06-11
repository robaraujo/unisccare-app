import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import moment from 'moment';
import { FoodService } from '../../providers/food-service';
import { Global } from '../../helpers/global';
import { ProtectedPage } from '../protected-page/protected-page';
import { UserService } from '../../providers/user-service';

@IonicPage({
  name: 'food-form'
})
@Component({
  selector: 'page-food-form',
  templateUrl: 'food-form.html',
})
export class FoodFormPage extends ProtectedPage {

  public foods: any;
  public meals: any;
  public qtt: any;
  public mealId;
  public food_id: any;
  public type = 'meal'; //meal or food

  constructor(public navCtrl: NavController,
              public userService: UserService,
              public foodService: FoodService,
              public global: Global,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {
    
    super(navCtrl, userService);
    this.foods = this.navParams.get('foods') || [];
    this.meals = this.navParams.get('meals') || [];
  }

  save() {
    let form = {
      type: this.type,
      diet: this.mealId,
      food_id: this.food_id,
      qtt: this.qtt,

    };

    if (this.type === 'meal' && !form.diet) {
      return this.global.showMsg('Selecione a refeição.', 'error');
    }
    if (this.type === 'food' && (!form.food_id || !form.qtt)) {
      return this.global.showMsg('Todos os campos são obrigatórios.', 'error');
    }

    // show loader
    let loader = this.loadingCtrl.create();
    loader.present();

    this.foodService.create(form).subscribe(
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
