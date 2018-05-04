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
export class SocialService {

    private cfg: any;

    constructor(private http: Http,
                private authHttp: AuthHttp) {

        this.cfg = AppConfig.cfg;
    }

    listForum() {
        return this.authHttp.get(this.cfg.apiUrl + '/forum')
            .toPromise()
            .then(res=> {return res.json()});
    }

    getForum(id) {
        return this.authHttp.get(this.cfg.apiUrl + '/forum/'+id)
            .toPromise()
            .then(res=> {return res.json()});
    }

    listFeed() {
        return this.authHttp.get(this.cfg.apiUrl + '/feed')
            .toPromise()
            .then(res=> {return res.json()});
    }

    listFollow() {
        return this.authHttp.get(this.cfg.apiUrl + '/follow')
            .toPromise()
            .then(res=> {return res.json()});
    }

    addPost(idForum, text) {
        return this.authHttp.post(this.cfg.apiUrl + '/post/store/'+idForum, {text: text})
            .toPromise()
            .then(res=> {return res.json()});
    }
}
