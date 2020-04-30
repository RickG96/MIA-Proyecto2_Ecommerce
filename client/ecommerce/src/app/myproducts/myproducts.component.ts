import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent implements OnInit {

  nuevoProducto = false;
  editarProducto = false;
  ELEMENT_DATA: any = [];
  NEW_PRODUCT: any = {
    nombre: "",
    descripcion: "",
    imagen: "",
    precio: "",
    cantidad: "",
    color: "",
    id_usuario: 0
  };
  usuario: any = {};

  constructor(private servicio: ServiciosService) { }

  ngOnInit() {
    this.getProductos();
  }

  public addProducto(valor?: boolean) {
    this.nuevoProducto = valor;
  }

  onFileChanged(event) {
    this.NEW_PRODUCT.avatar = event.target.files[0]
  }

  public insertProducto(valor?: boolean) {
    this.nuevoProducto = valor;
    const strImg = this.NEW_PRODUCT.imagen;
    const foto = strImg.split("\\", 4);
    this.NEW_PRODUCT.imagen = foto[2];
    this.usuario = this.servicio.getLog();
    this.NEW_PRODUCT.id_usuario = this.usuario.id_usuario;
    this.servicio.postProductos(this.NEW_PRODUCT)
      .subscribe(() => this.getProductos());
    this.servicio.uploadImage(this.NEW_PRODUCT.avatar)
      .subscribe(() => console.log('ok'));
    this.NEW_PRODUCT.nombre = "";
    this.NEW_PRODUCT.descripcion = "";
    this.NEW_PRODUCT.imagen = "";
    this.NEW_PRODUCT.precio = "";
    this.NEW_PRODUCT.cantidad = "";
    this.NEW_PRODUCT.color = "";
    delete this.NEW_PRODUCT.avatar;
  }

  public getProductos() {
    this.usuario = this.servicio.getLog();
    this.servicio.getProductos()
      .subscribe(data => {
        this.ELEMENT_DATA = data;
        this.ELEMENT_DATA = this.ELEMENT_DATA.filter(product => product.id_usuario === this.usuario.id_usuario);
        this.ELEMENT_DATA = this.ELEMENT_DATA.filter(product => product.estatus === 1);
      })
  }

  public upProducto(producto, valor?: boolean) {
    this.NEW_PRODUCT.nombre = producto.nombre;
    this.NEW_PRODUCT.descripcion = producto.descripcion;
    this.NEW_PRODUCT.precio = producto.precio;
    this.NEW_PRODUCT.cantidad = producto.cantidad;
    this.NEW_PRODUCT.color = producto.color;
    this.NEW_PRODUCT.id_producto = producto.id_producto;
    this.editarProducto = valor;
  }

  public updateProducto(valor?: boolean) {
    this.editarProducto = valor;
    this.servicio.putProductos(this.NEW_PRODUCT, this.NEW_PRODUCT.id_producto)
      .subscribe(() => {
        this.NEW_PRODUCT.nombre = "";
        this.NEW_PRODUCT.descripcion = "";
        this.NEW_PRODUCT.imagen = "";
        this.NEW_PRODUCT.precio = "";
        this.NEW_PRODUCT.cantidad = "";
        this.NEW_PRODUCT.color = "";
        this.getProductos();
      })
  }

  public deleteProducto(id_producto: number) {
    this.servicio.deleteProducto(id_producto)
      .subscribe(() => {
        console.log('ok');
        this.getProductos();
      })
  }

}
