import { Component, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { SocketIoService } from './socket-io.service';
import { Message } from './message';
import { Subscription } from 'rxjs';
import { MatList, MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nickname: string;
  message: string;
  messages: Message[] = [];
  subjMessages: Subscription;
  subjList: Subscription;
  
  @ViewChild(MatList, {read: ElementRef, static: true}) list:ElementRef;
  @ViewChildren(MatListItem) listItems: QueryList<MatListItem>;


  constructor(private socketService: SocketIoService){

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.subjMessages = this.socketService.messages().subscribe((m: Message)=>{
      console.log(m)
      this.messages.push(m);
    });
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.subjList= this.listItems.changes.subscribe((e)=>{
      console.log(e);
      this.list.nativeElement.scrollTop = this.list.nativeElement.scrollHeight;
    });
  }
  send(){
    this.socketService.send({
      from: this.nickname,
      message: this.message
    });
    this.message = '';
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subjMessages.unsubscribe();
    this.subjList.unsubscribe();
  }
}
