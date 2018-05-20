import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportWaterPage } from './report-water';
import { SharedModule } from '../../helpers/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    ReportWaterPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportWaterPage),
    SharedModule,
    NgxChartsModule,
    ChartsModule
  ],
  exports: [
    ReportWaterPage
  ]
})
export class ReportWaterPageModule {}
