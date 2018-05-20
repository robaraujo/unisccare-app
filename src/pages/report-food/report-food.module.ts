import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportFoodPage } from './report-food';
import { SharedModule } from '../../helpers/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    ReportFoodPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportFoodPage),
    SharedModule,
    NgxChartsModule,
    ChartsModule
  ],
  exports: [
    ReportFoodPage
  ]
})
export class ReportFoodPageModule {}
