import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaterPage } from './water';
import { SharedModule } from '../../helpers/shared.module';

@NgModule({
  declarations: [
    WaterPage,
  ],
  imports: [
    IonicPageModule.forChild(WaterPage),
    SharedModule
  ],
  exports: [
    WaterPage
  ]
})
export class WaterPageModule {}
