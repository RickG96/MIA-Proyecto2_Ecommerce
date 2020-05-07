import { Component, OnInit, TemplateRef } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  actualizar = false;
  login: any;
  usuario: any;
  constructor(private servicio: ServiciosService, private router: Router) { }

  ngOnInit() {
    this.login = this.servicio.getLogued();
    if(this.login == false) {
      this.router.navigateByUrl('/denied');
    }
    this.usuario = this.servicio.getLog();
    this.usuario.fotografia = this.usuario.fotografia.replace("localhost", "192.168.0.3");
  } 

  updateUser(mostrar?: boolean) {
    this.actualizar = mostrar;
    console.log("acutaliza")
  }

  update(mostrar?: boolean) {
    this.actualizar = mostrar;
    this.servicio.putUsuario(this.usuario, this.usuario.id_usuario)
      .subscribe(() => {
        this.servicio.setLog(this.usuario)
      })
  }

  deleteUser() {
    this.servicio.deleteUsuario(this.usuario.id_usuario)
      .subscribe(() => {
        this.servicio.setLog({});
        this.servicio.setCarrito({});
        this.router.navigateByUrl('/home');
      })
  }
}
