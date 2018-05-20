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

  pages: Array<{title: string, component: any, icon?: any, method?: any, subpages?: Array<any>}>;

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
      {title: 'page.journey', component: 'JourneyPage', icon: 'md-home'},
      {title: 'page.monitor', component: 'MonitorPage', icon: 'md-pulse'},
      {title: 'page.report', component: 'ReportPage', icon: 'md-pulse', subpages: [
        {title: 'page.report-food', component: 'ReportFoodPage'},
        {title: 'page.report-weight', component: 'ReportWeightPage'},
      ]},
      {title: 'page.social', component: 'SocialPage', icon: 'md-contacts'},
      {title: 'page.calendar', component: 'CalendarPage', icon: 'md-calendar'},
      {title: 'page.surgery', component: 'SurgeryPage', icon: 'ios-contact'},
      {title: 'page.logout', component: 'LoginPage', method: 'logout', icon: 'md-log-out'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.hide();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    
    if (page.subpages) return;

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
