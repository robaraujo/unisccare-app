import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { SocialService } from '../../providers/social-service';
import { Global } from '../../helpers/global';

@IonicPage({
  name: 'social-user'
})
@Component({
  selector: 'page-social-user',
  templateUrl: 'social-user.html',
})
export class SocialUserPage {

  public userId: any;
  public segment = 'feed';
  public foruns;
  public posts;
  public following;
  public user;
  public isFollowing;

  constructor(public navCtrl: NavController,
              public userService: UserService,
              public navParams: NavParams,
              public global: Global,
              private socialService: SocialService,
              private loadingController: LoadingController) {

    this.userId = this.navParams.get('userId');
  }

  ionViewCanEnter() {
    return new Promise((resolve, reject)=> {
      if (!this.userId) reject();

      let loader = this.loadingController.create();
      loader.present();

      this.socialService.listUserFeed(this.userId).subscribe(
        (res:any)=> {
          this.posts = res.posts;
          this.user = res.user;
          this.isFollowing = res.following;

          resolve();
          loader.dismiss();
        },
        err=> {
          loader.dismiss();
          reject();
        }
      );
    })
    
  }

  openForum(id) {
    this.navCtrl.push('ForumPage', {id: id});
  }

  follow() {
    let loader = this.loadingController.create();
    loader.present();

    this.socialService.followUser(this.userId).subscribe(
      res=> {
        loader.dismiss();
        this.global.showMsg('Agora você segue este usuário.', 'success');
        this.isFollowing = true;
      },
      err=> {
        loader.dismiss();
        this.global.showMsg('Erro ao seguir usuário, tente mais tarde.', 'error');
      }
    );
  }
  unfollow() {
    let loader = this.loadingController.create();
    loader.present();

    this.socialService.unfollowUser(this.userId).subscribe(
      res=> {
        loader.dismiss();
        this.global.showMsg('Agora você não segue mais este usuário.', 'success');
        this.isFollowing = false;
      },
      err=> {
        loader.dismiss();
        this.global.showMsg('Erro ao deixar de seguir usuário, tente mais tarde.', 'error');
      }
    );
  }

}
