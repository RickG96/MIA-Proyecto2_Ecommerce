import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-headerb',
  templateUrl: './headerb.component.html',
  styleUrls: ['./headerb.component.css']
})
export class HeaderbComponent implements OnInit {

  USUARIO: any = {};

  constructor(private servicio: ServiciosService) { }

  ngOnInit() {
  }

  logOut() {
    this.servicio.setLog(this.USUARIO)
  }

}
