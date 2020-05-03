import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  actualizar = false;
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

  constructor(private servicio: ServiciosService) { }

  ngOnInit() {
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
}
