import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewSchedulePage } from './new-schedule';
import { SharedModule } from '../../helpers/shared.module';

@NgModule({
  declarations: [
    NewSchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(NewSchedulePage),
    SharedModule
  ],
  exports: [
    NewSchedulePage
  ]
})
export class NewSchedulePageModule {}
