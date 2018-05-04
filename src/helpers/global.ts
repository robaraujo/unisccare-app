
import { Injectable } from '@angular/core';
import { ToastController} from 'ionic-angular';

@Injectable()
export class Global
{   
    constructor(private toastCtrl: ToastController,
                ) {
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
};