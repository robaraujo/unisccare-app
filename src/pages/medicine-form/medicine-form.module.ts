import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicineFormPage } from './medicine-form';
import { SharedModule } from '../../helpers/shared.module';

@NgModule({
  declarations: [
    MedicineFormPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicineFormPage),
    SharedModule
  ],
  exports: [
    MedicineFormPage
  ]
})
export class MedicineFormPageModule {}
