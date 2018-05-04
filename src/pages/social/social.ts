import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { SocialService } from '../../providers/social-service';

/**
 * Generated class for the SocialPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-social',
  templateUrl: 'social.html',
})
export class SocialPage {

  public segment = 'feed';
  public foruns;
  public posts;
  public following;
  public user;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private socialService: SocialService,
              private loadingController: LoadingController,
              public userService: UserService) {

    this.user = {name: 'Roberto', email: 'asdasd'}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialPage');

    this.segmentChanged();
  }

  segmentChanged($event = null) {

    let loader = this.loadingController.create();
    loader.present();

    if (this.segment === 'forum') {
      this.socialService.listForum().then(
        (res:any)=> {
          loader.dismiss();
          this.foruns = res;
        }
      );
    } else if (this.segment === 'follow') {
      this.socialService.listFollow().then(
        (res:any)=> {
          loader.dismiss();
          this.following = res;
        }
      );
    } else {
      this.socialService.listFeed().then(
        (res:any)=> {
          loader.dismiss();
          this.posts = res;
        }
      );
    }
  }

  openForum(id) {
    this.navCtrl.push('ForumPage', {id: id});
  }

  addForum() {

  }

  unfollow(e, index) {
    
  }

}
