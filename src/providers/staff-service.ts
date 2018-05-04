import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';
import *  as AppConfig from '../app/config';


@Injectable()
export class StaffService {

    private cfg: any;

    constructor(private authHttp: AuthHttp) {
        this.cfg = AppConfig.cfg;
    }

    list() {
        return this.authHttp.get(this.cfg.apiUrl + `/staffs`)
            .toPromise()
            .then(res=> {return res.json()});
    }

    getPicture(staff) {
        let pic = staff.picture ? staff.picture : 'empty.png';
        return this.cfg.server+'/img/staffs/'+pic;
    }

    rate(staffId, rating, text) {
        let data = {
            staff_id: staffId,
            rating: rating,
            text: text,
        };
        return this.authHttp.post(this.cfg.apiUrl + '/staff/rate', data)
            .toPromise()
            .then(res=> {return res.json()});
    }
}
