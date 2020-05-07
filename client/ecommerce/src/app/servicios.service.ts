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
  CARRITO_LOG: any;
  LOGUED: any;

  constructor(private http: HttpClient, private router: Router) { }

  setLogued(valor: boolean) {
    localStorage.setItem('logued', JSON.stringify(valor))
  }

  getLogued() {
    this.LOGUED = JSON.parse(localStorage.getItem('logued'));
    return this.LOGUED;
  }

  setCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  getCarrito() {
    this.CARRITO_LOG = JSON.parse(localStorage.getItem('carrito'));
    return this.CARRITO_LOG;
  }

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
    return this.http.post('http://192.168.0.3:3000/imagenusuario', formData);
  }

  correoVenta(listado) {
    return this.http.post('http://192.168.0.3:3000/correoventa', listado, httpOptions)
  }

  correoCompra(listado) {
    return this.http.post('http://192.168.0.3:3000/correocompra', listado, httpOptions)
  }

  correoConfirmacion(correo) {
    return this.http.post('http://192.168.0.3:3000/confirmacion', correo, httpOptions)
  }

  correoContra(usuario) {
    return this.http.post('http://192.168.0.3:3000/restablecer', usuario, httpOptions)
  }
  //api usuarios
  getUsuarios() {
    return this.http.get('http://192.168.0.3:3000/api/usuarios');
  }

  postUsuario(usuario) {
    return this.http.post('http://192.168.0.3:3000/api/usuarios', usuario, httpOptions)
  }

  deleteUsuario(id) {
    return this.http.delete('http://192.168.0.3:3000/api/usuarios/' + id, httpOptions)
  }
  
  putUsuario(usuario, id) {
    return this.http.put('http://192.168.0.3:3000/api/usuarios/' + id, usuario, httpOptions)
  }
  //api productos
  getProductos() {
    return this.http.get('http://192.168.0.3:3000/api/productos').toPromise()
  }

  postProductos(producto) {
    return this.http.post('http://192.168.0.3:3000/api/productos', producto, httpOptions).toPromise()
  }

  putProductos(producto, id) {
    return this.http.put('http://192.168.0.3:3000/api/productos/' + id, producto, httpOptions)
  }

  deleteProducto(id) {
    return this.http.delete('http://192.168.0.3:3000/api/productos/' + id, httpOptions)
  }
  //api categorias
  getCategorias() {
    return this.http.get('http://192.168.0.3:3000/api/categorias')
  }

  postCategoria(categoria) {
    return this.http.post('http://192.168.0.3:3000/api/categorias', categoria, httpOptions)
  }

  putCategoria(categoria, id) {
    return this.http.put('http://192.168.0.3:3000/api/categorias/' + id, categoria, httpOptions)
  }

  deleteCategoria(id) {
    return this.http.delete('http://192.168.0.3:3000/api/categorias/' + id, httpOptions)
  }
  //relacion categoria con producto
  getCatPro() {
    return this.http.get('http://192.168.0.3:3000/api/catprodu')
  }

  postCatPro(catpro) {
    return this.http.post('http://192.168.0.3:3000/api/catprodu', catpro, httpOptions)
  }
  //comentarios
  getComentarios() {
    return this.http.get('http://192.168.0.3:3000/api/comentarios')
  }

  postComentario(comentario) {
    return this.http.post('http://192.168.0.3:3000/api/comentarios', comentario, httpOptions)
  }

  putComentario(comentario, id) {
    return this.http.put('http://192.168.0.3:3000/api/comentarios/' + id, comentario, httpOptions)
  }

  deleteComentario(id) {
    return this.http.delete('http://192.168.0.3:3000/api/comentarios/' + id, httpOptions)
  }
  //carritos
  getCarritos() {
    return this.http.get('http://192.168.0.3:3000/api/carritos')
  }

  postCarrito(carrito) {
    return this.http.post('http://192.168.0.3:3000/api/carritos', carrito, httpOptions)
  }

  putCarrito(carrito, id) {
    return this.http.put('http://192.168.0.3:3000/api/carritos/' + id, carrito, httpOptions)
  }

  deleteCarrito(id) {
    return this.http.delete('http://192.168.0.3:3000/api/carritos/' + id, httpOptions)
  }
  //detalle entre carritos y productos
  getDetallesCP() {
    return this.http.get('http://192.168.0.3:3000/api/detallecarritos')
  }

  postDetalleCP(detalle) {
    return this.http.post('http://192.168.0.3:3000/api/detallecarritos', detalle, httpOptions)
  }

  deleteDetalleCP(id) {
    return this.http.delete('http://192.168.0.3:3000/api/detallecarritos/' + id, httpOptions)
  }

  updateDetalleCP(id) {
    return this.http.put('http://192.168.0.3:3000/api/detallecarritos/' + id, httpOptions)
  }
  //reportes
  getReportes(context, id) {
    return this.http.put('http://192.168.0.3:3000/api/reportes/' + id, context, httpOptions)
  }
  //bitacora
  getBitacora() {
    return this.http.get('http://192.168.0.3:3000/api/bitacora')
  }

  postBitacora(bitacora) {
    return this.http.post('http://192.168.0.3:3000/api/bitacora', bitacora, httpOptions)
  }
  //chats
  getChats() {
    return this.http.get('http://192.168.0.3:3000/api/chats')
  }

  postChat(chat) {
    return this.http.post('http://192.168.0.3:3000/api/chats', chat, httpOptions)
  }

  updateChat(chat, id){
    return this.http.put('http://192.168.0.3:3000/api/chats/' + id, chat, httpOptions)
  }
  //mensajes
  getMensajes() {
    return this.http.get('http://192.168.0.3:3000/api/mensajes')
  }

  postMensaje(mensaje) {
    return this.http.post('http://192.168.0.3:3000/api/mensajes', mensaje, httpOptions)
  }
}
