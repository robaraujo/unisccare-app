import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserService } from '../../../providers/user-service';
import { SocialService } from '../../../providers/social-service';
import { ProtectedPage } from '../../protected-page/protected-page';

@IonicPage()
@Component({
  selector: 'page-social-user',
  templateUrl: 'social-user.html',
})
export class SocialUserPage extends ProtectedPage {

  public segment = 'feed';
  public foruns;
  public posts;
  public following;
  public user;

  constructor(public navCtrl: NavController,
              public userService: UserService,
              public navParams: NavParams,
              private socialService: SocialService,
              private loadingController: LoadingController) {

    super(navCtrl, userService);
  }

  ionViewDidLoad() {
    this.segmentChanged();
  }

  segmentChanged($event = null) {

    let loader = this.loadingController.create();
    loader.present();

    if (this.segment === 'forum') {
      
      this.socialService.listForum().subscribe(
        (res:any)=> {
            loader.dismiss();
            this.foruns = res;
        },
        err=> {
          loader.dismiss();
          console.error(err);
        }
      );
        
    } else if (this.segment === 'follow') {
      
      this.socialService.listFollow().subscribe(
        (res:any)=> {
          loader.dismiss();
          this.following = res;
        },
        err=> {
          loader.dismiss();
          console.error(err);
        }
      );

    } else {
      
      this.socialService.listFeed().subscribe(
        (res:any)=> {
          loader.dismiss();
          this.posts = res;
        },
        err=> {
          loader.dismiss();
          console.error(err);
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
