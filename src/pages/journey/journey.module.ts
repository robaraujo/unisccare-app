import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JourneyPage } from './journey';
import { SharedModule } from '../../helpers/shared.module';

@NgModule({
  declarations: [
    JourneyPage,
  ],
  imports: [
    IonicPageModule.forChild(JourneyPage),
    SharedModule
  ],
  exports: [
    JourneyPage,
  ]
})
export class JourneyPageModule {}
