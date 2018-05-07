import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WeightsPage } from './weights';
import { SharedModule } from '../../helpers/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    WeightsPage,
  ],
  imports: [
    IonicPageModule.forChild(WeightsPage),
    SharedModule,
    NgxChartsModule
  ],
  exports: [
    WeightsPage
  ]
})
export class WeightsPageModule {}
