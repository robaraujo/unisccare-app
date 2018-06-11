import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportWeightPage } from './report-weight';
import { SharedModule } from '../../helpers/shared.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    ReportWeightPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportWeightPage),
    SharedModule,
    ChartsModule
  ],
  exports: [
    ReportWeightPage
  ]
})
export class ReportWeightPageModule {}
