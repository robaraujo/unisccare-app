import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportStepPage } from './report-step';
import { SharedModule } from '../../helpers/shared.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    ReportStepPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportStepPage),
    SharedModule,
    ChartsModule
  ],
  exports: [
    ReportStepPage
  ]
})
export class ReportStepPageModule {}
