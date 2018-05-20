import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportMedicinePage } from './report-medicine';
import { SharedModule } from '../../helpers/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    ReportMedicinePage,
  ],
  imports: [
    IonicPageModule.forChild(ReportMedicinePage),
    SharedModule,
    NgxChartsModule,
    ChartsModule
  ],
  exports: [
    ReportMedicinePage
  ]
})
export class ReportMedicinePageModule {}
