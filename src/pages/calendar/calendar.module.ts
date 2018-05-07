import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarPage } from './calendar';
import { SharedModule } from '../../helpers/shared.module';
import { CalendarModule } from "ion2-calendar";

@NgModule({
  declarations: [
    CalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarPage),
    SharedModule,
    CalendarModule
  ],
  exports: [
    CalendarPage
  ]
})
export class CalendarPageModule {}
