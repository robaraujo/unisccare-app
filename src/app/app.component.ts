import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {UserService} from '../providers/user-service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'JourneyPage';

  pages: Array<{title: string, component: any, method?: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public menuCtrl: MenuController,
    public userService: UserService,
    translate: TranslateService) {

    this.initializeApp();
    translate.setDefaultLang('pt');

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'page.journey', component: 'JourneyPage'},
      {title: 'page.monitor', component: 'MonitorPage'},
      {title: 'page.social', component: 'SocialPage'},
      {title: 'page.calendar', component: 'CalendarPage'},
      {title: 'page.surgery', component: 'SurgeryPage'},
      {title: 'page.logout', component: 'LoginPage', method: 'logout'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {

    if (page.method && page.method === 'logout') {
      this.userService.logout();
    }

    this.nav.setRoot(page.component);
  }

  openProfilePage() {
    this.openPage({title: 'page.profile', component: 'ProfilePage'});
    this.menuCtrl.close();
  }
}
