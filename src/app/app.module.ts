import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';
import { JwtModule } from '@auth0/angular-jwt';
import { StatusBar } from '@ionic-native/status-bar';
import { DatePicker } from '@ionic-native/date-picker';
import { FileTransfer } from '@ionic-native/file-transfer';
import { ImageResizer } from '@ionic-native/image-resizer';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { MyApp } from './app.component';
import { config } from '../app/config';
import { Global } from '../helpers/global';
import { UserService } from '../providers/user-service';
import { StaffService } from '../providers/staff-service';
import { PhotoService } from '../providers/photo-service';
import { WaterService } from '../providers/water-service';
import { FoodService } from '../providers/food-service';
import { SocialService } from '../providers/social-service';
import { WeightService } from '../providers/weight-service';
import { MedicineService } from '../providers/medicine-service';
import { ScheduleService } from '../providers/schedule-service';
import { ReportService } from '../providers/report-service';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export function gettoken (){
  return localStorage.getItem('access_token');
};

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    }),
    JwtModule.forRoot({
      config: {
          tokenGetter: gettoken,
          whitelistedDomains: [config.server],
          //blacklistedRoutes: ['localhost:3001/auth/']
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePicker,
    Crop,
    ImageResizer,
    Camera,
    FileTransfer,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PhotoService,
    UserService,
    SocialService,
    ScheduleService,
    StaffService,
    WeightService,
    WaterService,
    MedicineService,
    FoodService,
    ReportService,
    Global
  ]
})
export class AppModule {}
