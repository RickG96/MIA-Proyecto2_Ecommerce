import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { ServiciosService } from '../servicios.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.component.html',
  styleUrls: ['./soporte.component.css']
})
export class SoporteComponent implements OnInit {

  
  
  
  constructor(private wss: WebsocketService, private servicio: ServiciosService) { }

  ngOnInit() {
    
  }

}
