import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../app/config';

@Injectable()
export class ScheduleService {

    constructor(private http: HttpClient) {
    }

    getMonth(month) {
        return this.http.get(config.apiUrl + `/schedules/month/${month}`);
    }

    create(schedule) {
        return this.http.post(config.apiUrl + '/schedules/store', schedule);
    }

    update(schedule) {
        return this.http.post(config.apiUrl + '/schedules/update/'+schedule.id, schedule);
    }
    
    remove(id) {
        return this.http.delete(config.apiUrl + '/schedules/remove/'+id);
    }
}
