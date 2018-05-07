import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../app/config';


@Injectable()
export class StaffService {

    constructor(private http: HttpClient) {
    }

    list() {
        return this.http.get(config.apiUrl + `/staffs`);
    }

    listRatings() {
        return this.http.get(config.apiUrl + `/staffs/ratings`);
    }

    getPicture(staff) {
        let pic = staff.picture ? staff.picture : 'empty.png';
        return `http://${config.server}/img/staffs/${pic}`;
    }

    rate(staffId, rating, text) {
        return this.http.post(config.apiUrl + '/staffs/rate', {
            staff_id: staffId,
            rating: rating,
            text: text,
        });
    }
}
