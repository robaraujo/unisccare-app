import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../app/config';
import moment from 'moment';
import 'rxjs/add/operator/do'

@Injectable()
export class UserService {

  public idToken: string;
  public logged:any;
  public refreshSubscription: any;


  constructor(private http: HttpClient) {
    let userCache = localStorage.getItem("user");
    this.logged = userCache ? JSON.parse(userCache) : null;
    this.idToken = localStorage.getItem("access_token");
  }

  /**
   * Register user on server
   * @param userData 
   */
  register(userData) {

    return this.http.post(config.apiUrl + config.user.register, userData).do(
        data => this.saveData(data),
        err=> console.log("reg error", err)
    );
  }

  /**
   * Update user on server
   * @param userData 
   */
  update(userData) {
    return this.http.post(config.apiUrl + '/user/update', userData).do(
        data => this.saveDataUser(data),
        err=> console.log("reg error", err)
    );
  }

  login(credentials) {

    return this.http.post(config.apiUrl + config.user.login, credentials).do(
      data => this.saveData(data),
      err=> console.error(err)
    );
  }

  saveData(data: any) {
    this.saveDataUser(data.user);
    localStorage.setItem("access_token", data.token);
    this.idToken = data.token;
  }

  saveDataUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
    this.logged = user;
  }

  logout() {
    // stop function of auto refesh
    localStorage.setItem("user", null);
    localStorage.setItem("access_token", null);
    this.logged = null;
    this.idToken = null;
  }

  getFromServer() {
    return this.http.get(config.apiUrl + '/authenticate/user').do(
      data => this.saveDataUser(data),
      err=> console.error(err)
    );
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

  getPicture(user = null, folder = 'users') {
    user = user || this.logged;
    if (!user) return null;

    let pic = user.picture ? user.picture : 'empty.png';
    return `http://${config.server}/img/${folder}/${pic}`;
  }

  lostWeight() {
    if (!this.logged) return null;
    if (this.logged.first_weight < this.logged.last_weight || !this.logged.last_weight) return 0;

    return this.logged.first_weight - this.logged.last_weight;
  }

  /**
   * Time elapsed after surgery
   */
  timeElapsed(user?) {
    user = user || this.logged
    if (!user || !user.dt_operation) return null;

    let start = moment(user.dt_operation, 'YYYY-MM-DD');
    let end = moment();
    var duration = moment.duration(end.diff(start));
    let diff = Math.trunc(duration.asDays());
    return diff;
  }

  /**
   * Percento of time elapsed
   */
  timePercent() {
    if (!this.logged || !this.logged.dt_operation || !this.logged.dt_end) return null;

    let start = moment(this.logged.dt_operation, 'YYYY-MM-DD');
    let end = moment(this.logged.dt_end, 'YYYY-MM-DD');
    let now = moment();

    let daysElapsed:any = moment.duration(now.diff(start)).asDays();
    let daysUntilEnd:any = moment.duration(end.diff(start)).asDays();

    let percent = 100 * daysElapsed / daysUntilEnd;
    let roundPercent = Math.trunc(percent);

    return roundPercent >= 0 && roundPercent < 101 ? roundPercent : null;
  }
  

}
