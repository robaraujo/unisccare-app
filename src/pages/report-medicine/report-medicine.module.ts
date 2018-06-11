import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportMedicinePage } from './report-medicine';
import { SharedModule } from '../../helpers/shared.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    ReportMedicinePage,
  ],
  imports: [
    IonicPageModule.forChild(ReportMedicinePage),
    SharedModule,
    ChartsModule
  ],
  exports: [
    ReportMedicinePage
  ]
})
export class ReportMedicinePageModule {}
