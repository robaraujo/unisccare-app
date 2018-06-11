import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagesPage } from './messages';
import { SharedModule } from '../../helpers/shared.module';
import { EmojiPickerComponentModule } from "../../helpers/emoji-picker/emoji-picker.module";

@NgModule({
  declarations: [
    MessagesPage,
  ],
  imports: [
    EmojiPickerComponentModule,
    IonicPageModule.forChild(MessagesPage),
    SharedModule
  ],
  exports: [
    MessagesPage
  ]
})
export class MessagesPageModule {}
