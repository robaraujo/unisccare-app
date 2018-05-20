import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../app/config';

@Injectable()
export class ReportService {

    constructor(private http: HttpClient) {
    }

    food(view, date) {
        let params = `?view=${view}&date=${date}`;
        return this.http.get(config.apiUrl + '/report/food'+params);
    }

    water(view, date) {
        let params = `?view=${view}&date=${date}`;
        return this.http.get(config.apiUrl + '/report/water'+params);
    }


    medicine(view, date) {
        let params = `?view=${view}&date=${date}`;
        return this.http.get(config.apiUrl + '/report/medicine'+params);
    }
}
