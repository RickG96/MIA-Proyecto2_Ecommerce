import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private wss: WebsocketService) { }

  ngOnInit() {
    this.wss.listen('test event').subscribe(data => {
      console.log(data);
    })
  }

}
