import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodFormPage } from './food-form';
import { SharedModule } from '../../../helpers/shared.module';

@NgModule({
  declarations: [
    FoodFormPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodFormPage),
    SharedModule
  ],
  exports: [
    FoodFormPage
  ]
})
export class FoodFormPageModule {}
