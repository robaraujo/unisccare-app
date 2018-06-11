import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { SocialService } from '../../providers/social-service';
import { ProtectedPage } from '../protected-page/protected-page';
import { Global } from '../../helpers/global';

@IonicPage()
@Component({
  selector: 'page-social',
  templateUrl: 'social.html',
})
export class SocialPage extends ProtectedPage {

  public segment = 'feed';
  public foruns;
  public posts;
  public users;
  public user;

  constructor(public navCtrl: NavController,
              public userService: UserService,
              public navParams: NavParams,
              public global: Global,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
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
        
    } else if (this.segment === 'users') {
      
      this.socialService.listFollow().subscribe(
        (res:any)=> {
          loader.dismiss();
          this.users = res;
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

  /**
   * Open forum by id
   * @param id 
   */
  openForum(id) {
    this.navCtrl.push('ForumPage', {id: id});
  }

  /**
   * Add forum in server
   */
  addForum(name) {
    if (!name) return;

    let loader = this.loadingCtrl.create();
    loader.present();
    
    this.socialService.createForum(name).subscribe(
      (res:any)=> {
        loader.dismiss();
        this.global.showMsg('Forum criado.', 'success');
        this.openForum(res.id);
      },
      err=> {
        loader.dismiss();
        this.global.showMsg('Não foi possível adicionar, tente mais tarde.', 'error');
      }
    )
  }

  /**
   * Open alert form to add forum
   */
  formForum() {
      let alert = this.alertCtrl.create({
        title: 'Novo Forum',
        message: 'Infome o assunto:',
        inputs: [
          {
            name: 'forum',
            placeholder: 'Ex.: Dicas de dieta.',
            type: 'text'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              
            }
          },{
            text: 'Cadastrar',
            handler: (data) => {
              this.addForum(data.forum)
            }
          }
        ]
      });
      alert.present();
  }

  /**
   * Open user social page
   * @param userId 
   */
  openUser(userId) {
    this.global.openPage('social-user', {userId: userId}, true);
  }

}
