import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../app/config';

@Injectable()
export class FoodService {

    constructor(private http: HttpClient) {
    }

    list() {
        return this.http.get(config.apiUrl + '/user-food');
    }

    create(userFood) {
        return this.http.post(config.apiUrl + '/user-food/store', userFood);
    }
}
