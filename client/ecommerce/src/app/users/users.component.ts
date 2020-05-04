import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  actualizar = false;
  login: any;
  usuario: any;
  ELEMENT_DATA: any = [];
  UP_USER: any = {
    id_usuario: "",
    nombre: "",
    apellido: "",
    contrasenia: "",
    telefono: "",
    direccion: "",
    credito: "",
  }
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
    tipo_usuario: 0,
    credito: null,
    membresia: null
  }
  tipo: any = ""; //tipo de usuario  

  constructor(private servicio: ServiciosService, private router: Router) { }

  ngOnInit() {
    this.usuario = this.servicio.getLog();
    this.login = this.servicio.getLogued();
    if(this.login == false || this.usuario.tipo_usuario != 1) {
      this.router.navigateByUrl('/denied');
    }
    this.getUsers();
  }


  upUsuario(valor?: boolean, usuario?: any) {
    this.actualizar = valor;
    this.UP_USER.id_usuario = usuario.id_usuario;
    this.UP_USER.nombre = usuario.nombre;
    this.UP_USER.apellido = usuario.apellido;
    this.UP_USER.contrasenia = usuario.contrasenia;
    this.UP_USER.telefono = usuario.telefono;
    this.UP_USER.direccion = usuario.direccion;
    this.UP_USER.credito = usuario.credito;
  }

  updateUser(valor?: boolean, id_usuario?: number) {
    this.actualizar = valor;
    this.servicio.putUsuario(this.UP_USER, id_usuario)
      .subscribe(() => {
        console.log('ok')
        this.getUsers();
      })
  }

  getUsers() {
    this.servicio.getUsuarios()
      .subscribe(data => {
        this.ELEMENT_DATA = data;
        this.ELEMENT_DATA = this.ELEMENT_DATA.filter(usuario => usuario.estatus === 1);
      })
  }

  deleteUser(id_usuario: number) {
    this.servicio.deleteUsuario(id_usuario)
      .subscribe(() => {
        console.log('ok')
        this.getUsers();
      })
  }

  onFileChanged(event) {
    this.NUEVO.avatar = event.target.files[0]
  }

  insertarUsuario() {
    const strImg = this.NUEVO.fotografia;
    const foto = strImg.split("\\",4);
    this.NUEVO.fotografia = foto[2];
    this.servicio.postUsuario(this.NUEVO)
      .subscribe(() => this.getUsers());
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
    delete this.NUEVO.avatar;
  }
}
