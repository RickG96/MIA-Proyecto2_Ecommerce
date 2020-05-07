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
  isShown:boolean = false;

  constructor(private servicio: ServiciosService) { }

  ngOnInit() {
    this.usuario = this.servicio.getLog();
    this.usuario.fotografia = this.usuario.fotografia.replace("localhost", "192.168.0.3");
  }

  logOut() {
    this.servicio.setLog(this.USUARIO);
    this.servicio.setCarrito(this.CARRITO);
  }

  
}
