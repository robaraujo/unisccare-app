import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {UserService} from '../providers/user-service';
import {TranslateService} from '@ngx-translate/core';
import { NotificationService } from '../providers/notification-service';
import { Global } from '../helpers/global';
import { MessageService } from '../providers/message-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'JourneyPage';
  pages: Array<{title: string, component: any, icon?: any, method?: any, subpages?: Array<any>}>;
  openedSubmenu:any = false;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public menuCtrl: MenuController,
    public userService: UserService,
    private global: Global,
    public msgService: MessageService,
    public notificationService: NotificationService,
    translate: TranslateService) {

    this.initializeApp();
    translate.setDefaultLang('pt');

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'page.journey', component: 'JourneyPage', icon: 'md-home'},
      {title: 'page.report', component: 'ReportPage', icon: 'md-analytics', subpages: [
        {title: 'Alimentação', component: 'ReportFoodPage'},
        {title: 'Seus Passos', component: 'ReportStepPage'},
        {title: 'Pesagens', component: 'ReportWeightPage'},
        {title: 'Medicamentos', component: 'ReportMedicinePage'},
        {title: 'Água', component: 'ReportWaterPage'},
      ]},
      {title: 'page.social', component: 'SocialPage', icon: 'md-contacts'},
      {title: 'page.calendar', component: 'CalendarPage', icon: 'md-calendar'},
      {title: 'page.messages', component: 'MessagesPage', icon: 'md-chatbubbles'},
      {title: 'page.surgery', component: 'SurgeryPage', icon: 'ios-contact'},
      {title: 'page.notification', component: 'NotificationPage', icon: 'md-notifications-outline'},
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

  openPage(page, event = false, i = false) {
    

    // check toggle submenu
    if (i !== false) {
      if (this.openedSubmenu === i) {
        return this.openedSubmenu = false;
      }
      if (page.subpages) {
        return this.openedSubmenu = i;
      }
    }

    if (page.method && page.method === 'logout') {
      this.msgService.stopPolling();
      this.userService.logout();
      this.notificationService.local.cancelAll();
    }

    this.openedSubmenu = false;
    this.global.openPage(page.component);
  }

  openProfilePage() {
    this.global.openPage('ProfilePage');
  }
}
