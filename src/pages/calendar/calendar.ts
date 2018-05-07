import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { ScheduleService } from '../../providers/schedule-service';
import moment from 'moment';
import { Global } from '../../helpers/global';
import { CalendarModalOptions } from 'ion2-calendar';
import { ProtectedPage } from '../protected-page/protected-page';
import { UserService } from '../../providers/user-service';

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage extends ProtectedPage {
    /** @var pageReady finish to get first calendar dates on server */
    public pageReady: boolean = false;
    
    /** @var selectedDay day selected on calendar */
    public selectedDay: any = null;

    /** @var schedules list of schedules categorized by day */
    public schedules: any = {};

    /** @var date start date */
    public date: string;
    
    /** @var type type of return onChange event */
    public type: 'date';

    /** @var lastMonth last selected month */
    public lastMonth = '05';

    /** @var calendar options of calendar directive */
    public options: CalendarModalOptions = {
        daysConfig: []
    };

    /** @var moment access moment o view */
    public moment = moment;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public scheduleService: ScheduleService,
                public loadingCtrl: LoadingController,
                public userService: UserService,
                public global: Global,
                private modalCtrl: ModalController
            ) {

        super(navCtrl, userService);
        this.getUpdatedSchedules();
    }

    onChange(e) {
        this.selectedDay = e.format('DD');
        let month = e.format('MM');
        
        // month changed
        if (this.lastMonth !== month) {
            this.lastMonth = month;
            this.getUpdatedSchedules();
        }
    }

    getUpdatedSchedules() {
        this.scheduleService.getMonth(this.lastMonth).subscribe(
            (schedules) => this.formatSchedules(schedules),
            err=> {
                this.pageReady = true;
                this.global.showMsg('Não foi possível buscar seus compromissos.', 'error');
            }
        );
    }

    formatSchedules(schedlues) {
        this.schedules = {};
        const newOptions = {daysConfig: []};
        
        schedlues.map(schedule=> {
            let date = moment(schedule.datehr);
            let day = date.format('DD');
            schedule.formatedTime = date.format('HH:mm');

            // catecorize schedules by day
            if (!this.schedules[day]) {
                this.schedules[day] = [];
            }
            this.schedules[day].push(schedule);

            // add day to calendar options
            newOptions.daysConfig.push({
                date: date.toDate(),
                marked: true
            });
        });

        // workaround to show marked days on calendar
        setTimeout(() => {
            this.options = {
                ...this.options,
                ...newOptions
            };
        }, 2000);
        this.pageReady = true;
    }

    newEvent() {
        let modal = this.modalCtrl.create('calendar-form');
        modal.present();
        modal.onDidDismiss(msg=> {
            console.log(msg)
            if (msg !== 'success') return;
            
            this.global.showMsg('Compromisso criado com sucesso.', 'success');
            this.getUpdatedSchedules();
        })
    }

    removeSchedule(schedule) {
        let loader = this.loadingCtrl.create();
        loader.present();

        this.scheduleService.remove(schedule.id).subscribe(
            res=> {
                loader.dismiss();
                this.getUpdatedSchedules();
                this.global.showMsg('Compromisso removido com sucesso.', 'success');
            },
            err=> {
                loader.dismiss();
                this.global.showMsg('Não foi possível remover este compromisso, tente mais tarde.', 'error');
            }
        )
    }
}
