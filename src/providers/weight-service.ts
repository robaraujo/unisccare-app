import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../app/config';

@Injectable()
export class WeightService {

    constructor(private http: HttpClient) {
    }

    list() {
        return this.http.get(config.apiUrl + '/weights');
    }

    create(weight) {
        return this.http.post(config.apiUrl + '/weights/store', {weight: weight});
    }
}
