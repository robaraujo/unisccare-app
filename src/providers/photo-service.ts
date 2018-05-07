import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../app/config';

@Injectable()
export class PhotoService {

    constructor(private http: HttpClient) {
    }

    list() {
        return this.http.get(config.apiUrl + '/photos');
    }
}
