import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { PhotoService } from '../../providers/photo-service';
import { config } from '../../app/config';
import { ProtectedPage } from '../protected-page/protected-page';
import { UserService } from '../../providers/user-service';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html',
})
export class PhotosPage extends ProtectedPage {

  photos: any;
  moment = moment;
  
  constructor(public navCtrl: NavController,
              public userService: UserService,
              public photoService: PhotoService,
              private loadingCtrl: LoadingController,
              private modalController: ModalController,
              public navParams: NavParams) {
                
    super(navCtrl, userService);
  }

  ionViewDidLoad() {
    this.getNewPhotos();
  }

  /**
   * Get new photos from server
   */
  getNewPhotos() {
    let loader = this.loadingCtrl.create();
    loader.present();

    this.photoService.list().subscribe(
      (res:any)=> {
        loader.dismiss();
        this.photos = res;
      },
      err=> {
        loader.dismiss();
        console.error(err);
      }
    );
  }

  /**
   * Open modal that to take or select picture and send to server
   */
  sendPhoto() {
    let modalOpts = {cssClass: 'my-modal modal-cam-gallery', showBackdrop: true};
    let modal = this.modalController.create('modal-camera-gallery', {}, modalOpts);
    
    modal.present();
    modal.onDidDismiss(res=> {
      if (['cancel', 'error'].indexOf(res) !== -1) return;

      this.getNewPhotos();
    })
  }

  /**
   * Return photo filename
   * @param photo photo object
   */
  getPhotoUrl(photo) {
    return `url(http://${config.server}/img/uploads/${photo.filename})`;
  }

  openPhoto(photo) {
    let modalOpts = {cssClass: 'photo-modal', showBackdrop: true};
    let modal = this.modalController.create('photo-modal', {photo: photo}, modalOpts);
    modal.present();
  }
}
