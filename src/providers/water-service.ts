import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../app/config';

@Injectable()
export class WaterService {

    constructor(private http: HttpClient) {
    }

    list() {
        return this.http.get(config.apiUrl + '/water');
    }

    create(qtt) {
        return this.http.post(config.apiUrl + '/water/store', {qtt: qtt});
    }
}
