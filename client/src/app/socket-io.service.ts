import { Injectable } from '@angular/core';
import * as socketio from 'socket.io-client';
import { Message } from './message';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  private url = 'http://localhost:4444/';
  private socket = socketio(this.url);
  private subMessage:  Subject<Message> = new Subject<Message>();

  constructor() {

    this.socket.on('message', (m:Message)=>{
      this.subMessage.next(m);
    })
   }

  send(msg: Message){
    this.socket.emit('message', msg);
  }

  messages(){
    return this.subMessage.asObservable();
  }

}
