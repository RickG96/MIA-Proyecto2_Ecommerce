import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forguet',
  templateUrl: './forguet.component.html',
  styleUrls: ['./forguet.component.css']
})
export class ForguetComponent implements OnInit {

  USUARIOS: any = [];
  CAMBIAR: any;
  correo: any = "";

  constructor(private servicio: ServiciosService, private router: Router) { }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    this.servicio.getUsuarios()
      .subscribe(data => {
        this.USUARIOS = data;
        console.log(this.USUARIOS)
        this.USUARIOS = this.USUARIOS.filter(usuario => usuario.estatus === 1);
      })
  }

  async cambiarPass() {
    let encontrado = false;
    this.USUARIOS.forEach(usuario => {
      if(this.correo == usuario.correo) {
        this.CAMBIAR = usuario;
        encontrado = true;
        return;
      }
    });
    if(encontrado) {
      this.CAMBIAR.contrasenia = await this.nuevo();
      this.servicio.putUsuario(this.CAMBIAR, this.CAMBIAR.id_usuario)
        .subscribe(() => console.log('ok'))
      this.servicio.correoContra(this.CAMBIAR)
        .subscribe(() => alert('Se ha enviado un correo con una contrasenia nueva'))
      this.router.navigateByUrl('/home');  
    } else {
      alert("Usuario no encontrado")
    }
  }

  nuevo() {
    const pass = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '_', '.', ':', ',', ';', '@', '+', '*']
    let generar = ''
    for(let i = 0; i < 8; i++) {
      generar += pass[Math.floor(Math.random() * 71)]
    }

    return generar
  }

}
