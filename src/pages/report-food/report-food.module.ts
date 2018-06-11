import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportFoodPage } from './report-food';
import { SharedModule } from '../../helpers/shared.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    ReportFoodPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportFoodPage),
    SharedModule,
    ChartsModule
  ],
  exports: [
    ReportFoodPage
  ]
})
export class ReportFoodPageModule {}
