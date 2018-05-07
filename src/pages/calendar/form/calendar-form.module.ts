import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarFormPage } from './calendar-form';
import { SharedModule } from '../../../helpers/shared.module';

@NgModule({
  declarations: [
    CalendarFormPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarFormPage),
    SharedModule
  ],
  exports: [
    CalendarFormPage
  ]
})
export class CalendarFormPageModule {}
