import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialPage } from './social';
import { SharedModule } from '../../helpers/shared.module';

@NgModule({
  declarations: [
    SocialPage,
  ],
  imports: [
    IonicPageModule.forChild(SocialPage),
    SharedModule
  ],
  exports: [
    SocialPage
  ]
})
export class SocialPageModule {}
