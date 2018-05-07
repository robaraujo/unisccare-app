import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SurgeryPage } from './surgery';
import { Ionic2RatingModule } from 'ionic2-rating';
import { SharedModule } from '../../helpers/shared.module';

@NgModule({
  declarations: [
    SurgeryPage,
  ],
  imports: [
    IonicPageModule.forChild(SurgeryPage),
    Ionic2RatingModule,
    SharedModule
  ],
  exports: [
    SurgeryPage
  ]
})
export class SurgeryPageModule {}
