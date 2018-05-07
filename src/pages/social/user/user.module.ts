import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialUserPage } from './user';
import { SharedModule } from '../../../helpers/shared.module';

@NgModule({
  declarations: [
    SocialUserPage,
  ],
  imports: [
    IonicPageModule.forChild(SocialUserPage),
    SharedModule
  ],
  exports: [
    SocialUserPage
  ]
})
export class SocialPageModule {}
