
import { Injectable } from '@angular/core';
import { ToastController, App, MenuController, LoadingController, Events} from 'ionic-angular';
import moment from 'moment';

import { UserService } from '../providers/user-service';
import { NotificationService } from '../providers/notification-service';

@Injectable()
export class Global
{   
    constructor(private toastCtrl: ToastController,
                private app: App,
                public menuCtrl: MenuController,
                private loadingCtrl: LoadingController,
                private localNotifications: NotificationService,
                private userServive: UserService) {

        this.listenEvents();
    }

    listenEvents() {
        
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
        
        this.menuCtrl.close();
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

    /**
     * Get possible time labels based on view(day, month, year..) selected
     */
    getTimeLabels(momentDate, view) {
        var labels = [];
        var isThisYear = momentDate.format('YYYY') === moment().format('YYYY');
        var isThisMonth = isThisYear && momentDate.format('MM') === moment().format('MM');
        var isThisWeek = isThisMonth && momentDate.week() === moment().week();
        var isThisDay = isThisMonth && momentDate.format('DD') === moment().format('DD');
        
        var thisHour:any = moment().format('HH');
        var thisWeekDay = moment().format('ddd');
        var thisDay:any = moment().format('DD');
        var thisMonth:any = moment().format('MMM');

        if (view === 'day')
        {
            for (var i=1; i<= 23; i++) {
                // do not show hours after actual
                if (isThisDay && i > thisHour) {
                    break;
                }

                labels.push( ("0" + i).slice(-2) );
            }
        } else if (view === 'week')
        {
            var weekDays = moment.weekdaysShort();

            for (var i=0; i<weekDays.length; i++) {
                var weekDay = weekDays[i];
                labels.push(weekDay);

                // do not show week day after actual
                if (isThisWeek && thisWeekDay === weekDay) {
                    break;
                }
            }
        } else if (view === 'month')
        {
            for (var i=1; i<= momentDate.daysInMonth(); i++) {
                // do not show days after actual
                if (isThisMonth && i > thisDay) {
                    break;
                }

                labels.push( ("0" + i).slice(-2) );
            }
        } else if (view === 'year')
        {
            var months = moment.monthsShort();

            for (var i=0; i<months.length; i++) {
                var month = months[i];
                labels.push(month);

                // do not show months after actual
                if (isThisYear && thisMonth === month) {
                    break;
                }
            }
        }

        return labels;
    }
};

