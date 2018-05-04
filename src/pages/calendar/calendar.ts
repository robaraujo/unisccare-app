import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ScheduleService } from '../../providers/schedule-service';
import moment from 'moment';
import { Global } from '../../helpers/global';

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
    // my
    public lastMonth;

    eventSource;
    viewTitle;
    isToday:boolean;
  
    calendar = {
    mode: 'month',
    currentDate: new Date(),
    dateFormatter: {
        formatMonthViewDay: function(date:Date) {
            return date.getDate().toString();
        },
        formatMonthViewDayHeader: function(date:Date) {
            return 'MonMH';
        },
        formatMonthViewTitle: function(date:Date) {
            return 'testMT';
        },
        formatWeekViewDayHeader: function(date:Date) {
            return 'MonWH';
        },
        formatWeekViewTitle: function(date:Date) {
            return 'testWT';
        },
        formatWeekViewHourColumn: function(date:Date) {
            return 'testWH';
        },
        formatDayViewHourColumn: function(date:Date) {
            return 'testDH';
        },
        formatDayViewTitle: function(date:Date) {
            return 'testDT';
        }
    }
};


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public scheduleService: ScheduleService,
                public global: Global,
                private modalCtrl: ModalController
            ) {
    }

    ionViewDidLoad() {
    }

    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    onEventSelected(event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }

    changeMode(mode) {
        this.calendar.mode = mode;
    }

    today() {
        this.calendar.currentDate = new Date();
    }

    onTimeSelected(ev) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }

    onCurrentDateChanged(event:Date) {

        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();

        let month = moment(event).format('MM');
        if (month === this.lastMonth) return;
        this.lastMonth = month;

        this.getUpdatedSchedules();
    }

    getUpdatedSchedules() {
        this.scheduleService.getMonth(this.lastMonth)
            .then((schedules) => this.formatSchedules(schedules))
            .catch(e => this.global.showMsg('Não foi possível buscar seus compromissos.', 'error'));
    }

    formatSchedules(schedlues) {
        this.eventSource = [];
        let startTime;
        let endTime;

        schedlues.map(schedule=> {
            startTime = moment(schedule.datehr).toDate();
            endTime = moment(schedule.datehr).add(1, 'hours').toDate();

            this.eventSource.push({
                title: schedule.title,
                startTime: startTime,
                endTime: endTime,
                allDay: false
            });
        });
    }


    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }

    markDisabled = (date:Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };

    newEvent() {
        let modal = this.modalCtrl.create('new-schedule');
        modal.present();
        modal.onDidDismiss(msg=> {
            console.log(msg)
            if (msg !== 'success') return;
            
            this.global.showMsg('Compromisso criado com sucesso.', 'success');
            this.getUpdatedSchedules();
        })
    }
}
