import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { SocialService } from '../../providers/social-service';
import { UserService } from '../../providers/user-service';

/**
 * Generated class for the ForumPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-forum',
  templateUrl: 'forum.html',
})
export class ForumPage {

  public forum;
  public posts;

  constructor(public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public userService: UserService,
              public alertCtrl: AlertController,
              private socialService: SocialService
      ) {
  }

  ionViewDidLoad() {
  }

  ionViewCanEnter() {
    let loader = this.loadingCtrl.create();
    loader.present();

    return new Promise((resolve, reject)=> {
      
      let forumId = this.navParams.get('id');
      if (!forumId) reject();

      this.socialService.getForum(forumId).then(
        res=> {
          this.forum = res.forum;
          this.posts = res.posts;

          loader.dismiss();
          resolve();
        },
        err=> {
          loader.dismiss();
          reject();
        }
      );
    });
  }

  addResposta() {
    var alert: any = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: 'Adicionar Post',
      message: 'Dê sua contribuição para o forum',
      inputs: [{
              name: 'text',
              placeholder: '',
              type: 'textarea'
      }],
      buttons: [
          {
              text: 'Cancelar',
              role: 'cancel',
              handler: data => {}
          },
          {
              text: 'Criar',
              handler: data => {
                if (!data.text) return;
                
                this.socialService.addPost(this.forum.id, data.text).then(
                  res=> {
                    this.posts.unshift(res);
                  }
                )
              }
          },
      ]
    });

    alert.present();
  }
}
