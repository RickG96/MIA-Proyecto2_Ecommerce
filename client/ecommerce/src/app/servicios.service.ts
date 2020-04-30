import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const httpOptions = {
  headers:new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  USUARIO_LOG: any;
  PRODUCTO_VER: any;

  constructor(private http: HttpClient, private router: Router) { }

  setLog(usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  getLog() {
    this.USUARIO_LOG = JSON.parse(localStorage.getItem('usuario'));
    return this.USUARIO_LOG;
  }

  setProductoVer(producto) {
    localStorage.setItem('producto', JSON.stringify(producto));
  }

  getProductoVer() {
    this.PRODUCTO_VER = JSON.parse(localStorage.getItem('producto'));
    return this.PRODUCTO_VER;
  }

  uploadImage(imagenSubida: File) {
    const formData = new FormData();
    formData.append('userImage', imagenSubida);
    return this.http.post('http://localhost:3000/imagenusuario', formData);
  }
  //api usuarios
  getUsuarios() {
    return this.http.get('http://localhost:3000/api/usuarios');
  }

  deleteUsuario(id) {
    return this.http.delete('http://localhost:3000/api/usuarios/' + id, httpOptions)
  }
  
  putUsuario(usuario, id) {
    return this.http.put('http://localhost:3000/api/usuarios/' + id, usuario, httpOptions)
  }
  //api productos
  getProductos() {
    return this.http.get('http://localhost:3000/api/productos')
  }

  postProductos(producto) {
    return this.http.post('http://localhost:3000/api/productos', producto, httpOptions)
  }

  putProductos(producto, id) {
    return this.http.put('http://localhost:3000/api/productos/' + id, producto, httpOptions)
  }

  deleteProducto(id) {
    return this.http.delete('http://localhost:3000/api/productos/' + id, httpOptions)
  }
}
