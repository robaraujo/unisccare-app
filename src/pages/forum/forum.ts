import { Component } from '@angular/core';
import { IonicPage, NavParams, LoadingController, AlertController, NavController } from 'ionic-angular';
import { SocialService } from '../../providers/social-service';
import { UserService } from '../../providers/user-service';
import { Global } from '../../helpers/global';
import { ProtectedPage } from '../protected-page/protected-page';

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
              public alertCtrl: AlertController,
              public global: Global,
              private socialService: SocialService) {
  }

  ionViewCanEnter() {
    let loader = this.loadingCtrl.create();
    loader.present();

    return new Promise((resolve, reject)=> {
      
      let forumId = this.navParams.get('id');
      if (!forumId) reject();

      this.socialService.getForum(forumId).subscribe(
        (res:any)=> {
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
                
                this.socialService.addPost(this.forum.id, data.text).subscribe(
                  res=> {
                    this.posts.unshift(res);
                  },
                  err=> this.global.showMsg('Não foi possível enviar sua contribuição, tente mais tarde.', 'error')
                )
              }
          },
      ]
    });

    alert.present();
  }
}
