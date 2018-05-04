import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarPage } from './calendar';
import { SharedModule } from '../../helpers/shared.module';
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  declarations: [
    CalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarPage),
    SharedModule,
    NgCalendarModule
  ],
  exports: [
    CalendarPage
  ]
})
export class CalendarPageModule {}
