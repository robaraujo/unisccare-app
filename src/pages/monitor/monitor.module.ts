import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MonitorPage } from './monitor';
import { SharedModule } from '../../helpers/shared.module';

@NgModule({
  declarations: [
    MonitorPage,
  ],
  imports: [
    IonicPageModule.forChild(MonitorPage),
    SharedModule
  ],
  exports: [
    MonitorPage
  ]
})
export class MonitorPageModule {}
