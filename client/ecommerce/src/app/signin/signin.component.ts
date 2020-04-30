import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  encontrado: boolean = false;
  USUARIOS: any = [];
  USER: any = {
    correo: "",
    contrasenia: ""
  }

  constructor(private servicio: ServiciosService, private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  login() {
    
    this.USUARIOS.forEach(usuario => {
      if(usuario.correo == this.USER.correo && usuario.contrasenia == this.USER.contrasenia) {
        this.encontrado = true;
        this.servicio.setLog(usuario);
      }
    });
    if(this.encontrado) {
      this.router.navigateByUrl('/feed');
    } else {
      alert("ERROR");
    }
  }

  getUsers() {
    this.servicio.getUsuarios()
      .subscribe(data => {
        this.USUARIOS = data;
        this.USUARIOS = this.USUARIOS.filter(usuario => usuario.estatus === 1);
      })
  }

}
