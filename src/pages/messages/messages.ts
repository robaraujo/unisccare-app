import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, Content, Events } from 'ionic-angular';
import { MessageService } from '../../providers/message-service';
import { config } from '../../app/config';
import { ProtectedPage } from '../protected-page/protected-page';
import { UserService } from '../../providers/user-service';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage extends ProtectedPage {

  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;
  user;
  toUser;
  editorMsg = '';
  showEmojiPicker = false;
  
  constructor(public navCtrl: NavController,
              public userService: UserService,
              public messageService: MessageService,
              private loadingCtrl: LoadingController,
              private modalController: ModalController,
              private events: Events,
              public navParams: NavParams) {
                
    super(navCtrl, userService);
    this.user = this.userService.logged;
    this.toUser = this.user.staff;
  }

  ionViewWillLeave() {
    // unsubscribe
    this.events.unsubscribe('chat:received');
  }

  ionViewDidEnter() {
    //get message list
    this.messageService.startPolling();
    this.getMsg();
  }

  onFocus() {
    this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      this.focus();
    } else {
      this.setTextareaScroll();
    }
    this.content.resize();
    this.scrollToBottom();
  }

  /**
   * @name getMsg
   * @returns {Promise<ChatMessage[]>}
   */
  getMsg() {
    // Get mock message list
    return this.messageService.getChat().subscribe(
        (res:any) => {
          this.messageService.msgs = res;
          //this.scrollToBottom();
        },
        err=> {
          console.log('err');
        }
      );
  }

  /**
   * @name sendMsg
   */
  sendMsg() {
    if (!this.editorMsg.trim()) return;

    // Mock message
    const id = Date.now().toString();
    let newMsg = {
      id: this.messageService.lastMsgId+1,
      messageId: Date.now().toString(),
      user_id: this.user.id,
      staff_id: this.toUser.id,
      from: 'user',
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      content: this.editorMsg,
      status: 'pending'
    };

    this.messageService.msgs.push(newMsg);
    this.editorMsg = '';

    if (!this.showEmojiPicker) {
      this.focus();
    }

    this.messageService.send(newMsg).subscribe(
      (res) => this.scrollToBottom(),
      err=> {

      }
    )
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content && this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  private setTextareaScroll() {
    const textarea = this.messageInput.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }
}
