import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/toPromise';
import {UserModel} from '../models/user.model';
import {CredentialsModel} from '../models/credentials.model';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {Observable} from 'rxjs/Rx';
import *  as AppConfig from '../app/config';
import moment from 'moment';

@Injectable()
export class UserService {

  private cfg: any;
  public idToken: string;
  public logged:any;
  public refreshSubscription: any;


  constructor(
    private storage: Storage,
    private http: Http,
    private jwtHelper:JwtHelper,
    private authHttp: AuthHttp) {

    this.cfg = AppConfig.cfg;

    this.storage.get('user').then(user => this.logged = user);
    this.storage.get('token').then(token => this.idToken = token);

  }

  register(userData) {

    return this.http.post(this.cfg.apiUrl + this.cfg.user.register, userData)
      .toPromise()
      .then(data => {
        this.saveData(data)
        let rs = data.json();
        this.idToken = rs.token;
      })
      .catch(e => console.log("reg error", e));


  }

  login(credentials) {

    return this.http.post(this.cfg.apiUrl + this.cfg.user.login, credentials)
      .toPromise()
      .then(data => {
         let rs = data.json();
         this.saveData(data);
         this.idToken = rs.token;
      })
      .catch(e => console.log('login error', e));


  }

  saveData(data: any) {

    let rs = data.json();

    this.storage.set("user", rs.user);
    this.storage.set("id_token", rs.token);
  }

  logout() {
    // stop function of auto refesh
    this.storage.remove('user');
    this.storage.remove('id_token');

  }

  isValid() {
    return tokenNotExpired();
  }





    public info(field) {
      return this.logged && this.logged[field] !== null ? this.logged[field] : null;
    }

    public staffInfo(field) {
      return this.logged && this.logged.staff && this.logged.staff[field] !== null ? this.logged.staff[field] : null;
    }
    getFullname(user = null) {
      user = user || this.logged;
      return user ? `${user.first_name} ${user.last_name}` : null;
    }

    getAddress(user = null) {
      user = user || this.logged;
      return user && user.city ? `${user.city} - ${user.state}` : null;
    }

    getPicture(user = null) {
      user = user || this.logged;
      if (!user) return null;

      let pic = user.picture ? user.picture : 'empty.png';
      return this.cfg.server+'/img/users/'+pic;
    }

    lostWeight() {
      if (!this.logged) return null;
      return this.logged.first_weight - this.logged.last_weight;
    }

    timeElapsed() {
      if (!this.logged) return null;

      let start = moment(this.logged.dt_operation, 'YYYY-MM-DD');
      let end = moment();
      var duration = moment.duration(end.diff(start));
      let diff = Math.trunc(duration.asDays());
      return diff+' dias';
    }
}
