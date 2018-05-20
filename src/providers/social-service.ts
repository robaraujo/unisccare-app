import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../app/config';

@Injectable()
export class SocialService {

    constructor(private http: HttpClient) {
    }

    listForum() {
        return this.http.get(config.apiUrl + '/forum');
    }

    getForum(id) {
        return this.http.get(config.apiUrl + '/forum/'+id);
    }

    listFeed() {
        return this.http.get(config.apiUrl + '/feed');
    }

    listUserFeed(userId) {
        return this.http.get(config.apiUrl + '/feed/'+userId);
    }

    listFollow() {
        return this.http.get(config.apiUrl + '/follow');
    }

    followUser(userId) {
        return this.http.get(config.apiUrl + '/follow/'+userId);
    }

    unfollowUser(userId) {
        return this.http.delete(config.apiUrl + '/unfollow/'+userId);
    }

    addPost(idForum, text) {
        return this.http.post(config.apiUrl + '/post/store/'+idForum, {text: text});
    }
}
