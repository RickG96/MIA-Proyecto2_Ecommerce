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
  USUARIOS: any = [];
  CARRITO: any = {
    id_usuario: null
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
      const strImg = this.NUEVO.fotografia;
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
        .subscribe((data) => this.auxiliar(data));
      this.servicio.uploadImage(this.NUEVO.avatar)
        .subscribe(() => console.log('ok1'));
      this.servicio.correoConfirmacion(this.NUEVO)
        .subscribe(() => {
          this.NUEVO.nombre = null;
          this.NUEVO.apellido = null;
          this.NUEVO.correo = null;
          this.NUEVO.contrasenia = null;
          this.NUEVO.fecha_nacimiento = null;
          this.NUEVO.genero = null;
          this.NUEVO.telefono = null;
          this.NUEVO.direccion = null;
          this.NUEVO.tipo_usuario = null;
          this.NUEVO.fotografia = null;
          delete this.NUEVO.avatar;
        });
        
      console.log('mula');
    } else {
      alert("Contraseña no valida")
    }
  }

  public async auxiliar(usuario) {
    //console.log(usuario)
      this.servicio.getUsuarios()
        .subscribe(async (data) => {
          this.USUARIOS = data
          //console.log(this.USUARIOS)
          await this.USUARIOS.forEach(element => {
            if(usuario.nombre === element.nombre) {
              this.CARRITO.id_usuario = element.id_usuario;
              console.log(this.CARRITO)
              this.servicio.postCarrito(this.CARRITO)
                .subscribe(data => alert('se enviara un correo para la confirmacion'));
              return;
            }
          });
          //console.log('mula2')
        });
  }

}
