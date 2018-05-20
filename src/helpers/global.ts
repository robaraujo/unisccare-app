
import { Injectable } from '@angular/core';
import { ToastController, App} from 'ionic-angular';
import { UserService } from '../providers/user-service';
import moment from 'moment';

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

    openPage(page, params = {}, push = false) {
        let nav = this.app.getRootNav();
        let method = push ? 'push' : 'setRoot';
        return nav[method](page, params);
    }

    /**
     * Transform datetime string to moment
     * @param val 
     * @param format 
     */
    public fromDatetime(val, format = 'YYYY-MM-DD HH:mm:ss') {
        return moment(new Date(val));
    }
};