import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {CredentialsModel} from '../models/credentials.model';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {Observable} from 'rxjs/Rx';
import *  as AppConfig from '../app/config';
import moment from 'moment';


@Injectable()
export class ScheduleService {

    private cfg: any;

    constructor(private http: Http,
                private authHttp: AuthHttp) {

        this.cfg = AppConfig.cfg;
    }

    getMonth(month) {
        return this.authHttp.get(this.cfg.apiUrl + `/schedules/month/${month}`)
            .toPromise()
            .then(res=> {return res.json()});
    }

    create(schedule) {
        return this.authHttp.post(this.cfg.apiUrl + '/schedules/store', schedule)
            .toPromise()
            .then(res=> {return res.json()});
    }
}
