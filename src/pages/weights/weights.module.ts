import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WeightsPage } from './weights';
import { SharedModule } from '../../helpers/shared.module';

@NgModule({
  declarations: [
    WeightsPage,
  ],
  imports: [
    IonicPageModule.forChild(WeightsPage),
    SharedModule
  ],
  exports: [
    WeightsPage
  ]
})
export class WeightsPageModule {}
