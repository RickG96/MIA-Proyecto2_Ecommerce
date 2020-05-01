import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  producto: any;
  usuario: any;
  COMENTARIOS: any = [];
  comentario: any = {
    titulo: "",
    descripcion: "",
    punteo: "",
    id_producto: 0,
    id_usuario: 0,
  }
  esAutor: boolean = false;
  comRespuesta: any = {
    respuesta: "",
    id_comentario: 0,
  }

  constructor(private servicio: ServiciosService) { }

  ngOnInit() {
    this.usuario = this.servicio.getLog();
    this.producto = this.servicio.getProductoVer();
    this.getComentarios();
    if(this.producto.id_usuario == this.usuario.id_usuario) this.esAutor = true;
  }

  public putComentario(id: number) {
    this.comRespuesta.id_comentario = id;
    this.servicio.putComentario(this.comRespuesta, id)
      .subscribe(() => {
        this.getComentarios();
        this.comRespuesta.respuesta = "";
        this.comRespuesta.id_comentario = 0; 
      })
  }

  public deleteComentario(id: number) {
    this.servicio.deleteComentario(id)
      .subscribe(() => this.getComentarios())
  }
  
  public getComentarios() {
    this.servicio.getComentarios()
      .subscribe(data => {
        this.COMENTARIOS = data;
        this.COMENTARIOS = this.COMENTARIOS.filter(comentario => comentario.estatus === 1)
        this.COMENTARIOS = this.COMENTARIOS.filter(comentario => comentario.id_producto === this.producto.id_producto)
      })
  }

  public postComentario() {
    this.comentario.id_producto = this.producto.id_producto;
    this.comentario.id_usuario = this.usuario.id_usuario;
    this.comentario.punteo += ""; 
    this.servicio.postComentario(this.comentario)
      .subscribe(() => this.getComentarios());
    this.comentario.id_producto = 0;
    this.comentario.id_usuario = 0;
    this.comentario.punteo = "";
    this.comentario.titulo = "";
    this.comentario.descripcion = "";
  }

}
