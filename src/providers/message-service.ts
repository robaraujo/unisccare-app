import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {config} from '../app/config';
import { Platform } from 'ionic-angular';

@Injectable()
export class MessageService {
    
    private stepTimeout: number;
    public enabled:boolean = false;

    public msgs = [];
    public lastMsgId: number = 0;
    public intervalPolling;

    constructor(private http: HttpClient,
                private platform: Platform) {
    }

    startPolling() {
        if (this.intervalPolling) return false;
        
        let getChat = ()=> {
            this.getChat().subscribe(
                (msgs:any)=> {
                    msgs.map((msg)=> this.msgs.push(msg))
                },
                err=> console.error(err)
            );
        };

        getChat();
        this.intervalPolling = setInterval(() => getChat(), 5000);
    }

    stopPolling() {
        if (this.intervalPolling) {
            clearInterval(this.intervalPolling);
            this.intervalPolling = null;
        }
    }

    getChat() {
        let count = this.msgs.length;
        this.lastMsgId = count ? this.msgs[count-1]['id'] : 0;
        return this.http.get(config.apiUrl + '/messages?last_id='+this.lastMsgId);
    }
    
    send(msg) {
        return this.http.post(config.apiUrl + '/messages/store', msg).do(
            (res:any)=> {
                let id = msg.messageId;
                let index = this.msgs.findIndex(e => e.messageId === id);
                if (index !== -1) {
                    this.msgs[index].id = res.id;
                    this.msgs[index].status = 'success';
                }
            }
        )
    }
}
