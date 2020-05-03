import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-headerb',
  templateUrl: './headerb.component.html',
  styleUrls: ['./headerb.component.css']
})
export class HeaderbComponent implements OnInit {

  USUARIO: any = {};
  CARRITO: any = {};
  usuario: any;

  constructor(private servicio: ServiciosService) { }

  ngOnInit() {
    this.usuario = this.servicio.getLog();
  }

  logOut() {
    this.servicio.setLog(this.USUARIO);
    this.servicio.setCarrito(this.CARRITO);
  }

}
