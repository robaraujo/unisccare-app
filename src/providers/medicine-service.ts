import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../app/config';

@Injectable()
export class MedicineService {

    constructor(private http: HttpClient) {
    }

    list() {
        return this.http.get(config.apiUrl + '/user-medicine');
    }

    create(userMedicine) {
        return this.http.post(config.apiUrl + '/user-medicine/store', userMedicine);
    }
}
