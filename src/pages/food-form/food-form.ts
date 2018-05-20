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
  public qtt: any;
  public food_id: any;

  constructor(public navCtrl: NavController,
              public userService: UserService,
              public foodService: FoodService,
              public global: Global,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {
    
    super(navCtrl, userService);
    this.foods = this.navParams.get('foods') || [];
  }

  save() {
    let userFood = {
      food_id: this.food_id,
      qtt: this.qtt
    };

    if (!userFood.food_id || !userFood.qtt) {
      return this.global.showMsg('Todos os campos são obrigatórios.', 'error');
    }

    // show loader
    let loader = this.loadingCtrl.create();
    loader.present();

    this.foodService.create(userFood).subscribe(
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
