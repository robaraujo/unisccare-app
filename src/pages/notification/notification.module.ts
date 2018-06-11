import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationPage } from './notification';
import { SharedModule } from '../../helpers/shared.module';

@NgModule({
  declarations: [
    NotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationPage),
    SharedModule
  ],
  exports: [
    NotificationPage
  ]
})
export class NotificationPageModule {}
