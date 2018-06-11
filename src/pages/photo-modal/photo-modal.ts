import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import moment from 'moment';
import { ProtectedPage } from '../protected-page/protected-page';
import { UserService } from '../../providers/user-service';
import { config } from '../../app/config';

@IonicPage({
  name: 'photo-modal'
})
@Component({
  selector: 'page-photo-modal',
  templateUrl: 'photo-modal.html',
})
export class PhotoModalPage extends ProtectedPage {

  public photo: any;
  public moment = moment;

  constructor(private navParams: NavParams,
              private viewCtrl: ViewController,
              public navCtrl: NavController,
              public userService: UserService) {
    
    super(navCtrl, userService);
    this.photo = this.navParams.get('photo') || [];
  }

  close(status = 'cancel') {
    this.viewCtrl.dismiss(status);
  }

  getPhotoUrl(photo) {
    return `http://${config.server}/img/uploads/${photo.filename}`;
  }
}
