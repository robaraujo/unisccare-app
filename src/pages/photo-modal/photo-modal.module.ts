import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoModalPage } from './photo-modal';
import { SharedModule } from '../../helpers/shared.module';

@NgModule({
  declarations: [
    PhotoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoModalPage),
    SharedModule
  ],
  exports: [
    PhotoModalPage
  ]
})
export class PhotoModalPageModule {}
