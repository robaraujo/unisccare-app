import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotosPage } from './photos';
import { SharedModule } from '../../helpers/shared.module';

@NgModule({
  declarations: [
    PhotosPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotosPage),
    SharedModule
  ],
  exports: [
    PhotosPage
  ]
})
export class PhotosPageModule {}
