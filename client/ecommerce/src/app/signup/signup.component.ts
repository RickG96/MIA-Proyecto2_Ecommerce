import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  NUEVO: any = {
    nombre: "",
    apellido: "",
    correo: "",
    contrasenia: "",
    telefono: "",
    direccion: "",
    fotografia: "",
    genero: "",
    fecha_nacimiento: "",
    tipo_usuario: 3,
    credito: "",
    membresia: ""
  }

  constructor(private servicio: ServiciosService, private router: Router) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.NUEVO.avatar = event.target.files[0]
  }

  insertarUsuario() {
    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gm;
    if(regexPass.test(this.NUEVO.contrasenia)) {
      /*const strImg = this.NUEVO.fotografia;
      const foto = strImg.split("\\",4);
      this.NUEVO.fotografia = foto[2];
      let membresia = Math.floor((Math.random() * 5) + 1);
      if(membresia == 0) {
        this.NUEVO.credito = "50000";
        this.NUEVO.membresia = "diamante";
      } else if(membresia == 2) {
        this.NUEVO.credito = "25000";
        this.NUEVO.membresia = "platino";
      } else if(membresia == 3) {
        this.NUEVO.credito = "10000";
        this.NUEVO.membresia = "oro";
      } else if(membresia == 4) {
        this.NUEVO.credito = "5000";
        this.NUEVO.membresia = "plata";
      } else if(membresia == 1) {
        this.NUEVO.credito = "1000";
        this.NUEVO.membresia = "bronce";
      }
      this.servicio.postUsuario(this.NUEVO)
        .subscribe(() => console.log('ok'));
      this.servicio.uploadImage(this.NUEVO.avatar)
        .subscribe(() => console.log('ok'));
      this.NUEVO.nombre = "";
      this.NUEVO.apellido = "";
      this.NUEVO.correo = "";
      this.NUEVO.contrasenia = "";
      this.NUEVO.fecha_nacimiento = "";
      this.NUEVO.genero = "";
      this.NUEVO.telefono = "";
      this.NUEVO.direccion = "";
      this.NUEVO.tipo_usuario = 0;
      this.NUEVO.fotografia = "";
      delete this.NUEVO.avatar;*/
      this.servicio.correoConfirmacion(this.NUEVO)
        .subscribe(() => console.log('correo'))
    } else {
      alert("Contraseña no valida")
    }
    
    
  }

}
