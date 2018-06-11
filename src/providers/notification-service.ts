import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../app/config';
import { Platform, App } from 'ionic-angular';

declare var window: any;

@Injectable()
export class NotificationService {

    public localList = [
      {
        id: 0,
        text: 'Não esqueça de tomar água.',
        active: false,
        trigger: { every: 2, unit: 'hour' },
        triggerText: 'A cada duas horas.',
        page: 'WaterPage'
      },
      {
        id: 1,
        text: 'Já tomou seu café da manhã?',
        active: false,
        trigger: { every: {hour: 9, minute:0} },
        triggerText: 'Às 09:00 horas.',
        page: 'FoodPage'
      },
      {
        id: 2,
        text: 'O que almoçou hoje?',
        active: false,
        trigger: { every: {hour: 13, minute: 0} },
        triggerText: 'Às 13:00 horas.',
        page: 'FoodPage'
      },
      {
        id: 3,
        text: 'Já tomou seu café da tarde?',
        active: false,
        trigger: { every: {hour: 16, minute: 0} },
        triggerText: 'Às 16:00 horas.',
        page: 'FoodPage'
      },
      {
        id: 4,
        text: 'O que jantou hoje?',
        active: 0,
        trigger: { every: {hour: 21, minute: 30} },
        triggerText: 'Às 21:30 horas.',
        page: 'FoodPage'
      },
      {
        id: 5,
        text: 'Já cadastrou seu peso hoje?.',
        active: false,
        trigger: { every: 2, unit: 'day' },
        triggerText: 'A cada dois dias.',
        page: 'WeightsPage'
      },
      {
        id: 6,
        text: 'Envie uma foto da sua evolução.',
        active: false,
        trigger: { every: 1, unit: 'week' },
        triggerText: 'Uma vez por semana.',
        page: 'PhotosPage'
      }
    ];

    public local:any;

    constructor(private platform: Platform,
                private app: App) {

        // start local not plugin
        this.platform.ready().then(()=> {
            let mock = {
                on: function() {},
                cancelAll: function() {},
                getScheduledIds: (cb)=> cb([1,2,3]),
            };
            this.local = window.cordova ? window.cordova.plugins.notification.local : mock;
            this.listenLocalAction();
        })
    }

    /**
     * wait for notifacion click
     */
    listenLocalAction() {
        this.local.on("click", (notification)=> {
            let localNot = this.localList[notification.id];

            if (localNot && localNot.page) {
                let nav = this.app.getRootNav();
                nav.setRoot(localNot.page);
            }
        });
    }

    /**
     * Return local notification list with active status
     */
    getLocal() {
        let locals = this.localList;

        return new Promise((resolve, reject)=> {
            this.local.getScheduledIds(ids=> {

                locals.map((local, i)=> {
                    locals[i].active = ids.indexOf(local.id) !== -1;
                });

                resolve(locals);
            });
        });
    }
}
