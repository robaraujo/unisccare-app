import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForumPage } from './forum';
import { SharedModule } from '../../helpers/shared.module';

@NgModule({
  declarations: [
    ForumPage,
  ],
  imports: [
    IonicPageModule.forChild(ForumPage),
    SharedModule
  ],
  exports: [
    ForumPage
  ]
})
export class ForumPageModule {}
