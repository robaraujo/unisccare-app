import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodPage } from './food';
import { SharedModule } from '../../helpers/shared.module';

@NgModule({
  declarations: [
    FoodPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodPage),
    SharedModule
  ],
  exports: [
    FoodPage
  ]
})
export class FoodPageModule {}
