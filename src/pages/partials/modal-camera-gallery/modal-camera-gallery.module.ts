import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalCameraGalleryPage } from './modal-camera-gallery';
import { SharedModule } from './../../../helpers/shared.module';

@NgModule({
  declarations: [
    ModalCameraGalleryPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalCameraGalleryPage),
    SharedModule
  ],
  entryComponents: [
    ModalCameraGalleryPage
  ]
})
export class ModalChooseCameraGalleryPageModule {}