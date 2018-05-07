import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicinePage } from './medicine';
import { SharedModule } from '../../helpers/shared.module';

@NgModule({
  declarations: [
    MedicinePage,
  ],
  imports: [
    IonicPageModule.forChild(MedicinePage),
    SharedModule
  ],
  exports: [
    MedicinePage
  ]
})
export class MedicinePageModule {}
