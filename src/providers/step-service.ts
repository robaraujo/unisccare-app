import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../app/config';
import { Platform } from 'ionic-angular';
import { Pedometer } from '@ionic-native/pedometer';
import { isMoment } from 'moment';
import moment from 'moment';

@Injectable()
export class StepService {
    
    private stepTimeout: number;
    public enabled:boolean = false;

    constructor(private http: HttpClient,
                public pedometer: Pedometer,
                private platform: Platform) {

        this.platform.ready().then(()=> {
            this.enabled = localStorage.getItem('step_counter') === '1';
            this.toggle(this.enabled);
        })
    }

    public toggle(enabled) {
        
        this.enabled = enabled;
        localStorage.setItem('step_counter', this.enabled ? '1' : '0');

        // disable
        if (!this.enabled) {
            return this.pedometer.stopPedometerUpdates();
        }

        // enable
        this.pedometer.startPedometerUpdates().subscribe(
            (res:any)=> {
                if (!res.numberOfSteps) return;

                // espera 4s para enviar posição, se chegar nova, cancela o envio da antiga
                if (this.stepTimeout) clearTimeout(this.stepTimeout);

                this.stepTimeout = setTimeout(()=> {
                    this.create(res).subscribe(
                        res=> console.log('step created'),
                        err=> console.error('step not created'),
                    );
                }, 5000);
            },
            err=> {
                console.error(err);
            }
        );
    }

    create(step) {
        return this.http.post(config.apiUrl + '/step/store', {
            steps: step.numberOfSteps,
            start_date: moment(step.startDate).format('YYYY-MM-DD HH:mm:ss'),
            end_date: moment(step.endDate).format('YYYY-MM-DD HH:mm:ss'),
        });
    }

    getDaySteps():number {
        return 0;
    }
}
