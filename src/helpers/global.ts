
import { Injectable } from '@angular/core';
import { ToastController, App} from 'ionic-angular';
import { UserService } from '../providers/user-service';

@Injectable()
export class Global
{   
    constructor(private toastCtrl: ToastController,
                private app: App,
                private userServive: UserService) {
    }
    
    showMsg(message, type = 'info', time = 3000) {
        let toast = this.toastCtrl.create({
            dismissOnPageChange: true,
            duration: time,
            position: 'top',
            cssClass: 'toast-'+type,
            message: message
        })
        toast.present();
        return toast;
    }

    openPage(page) {
        let nav = this.app.getRootNav();
        return nav.setRoot(page);
    }
};