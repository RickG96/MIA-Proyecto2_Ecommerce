import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { Router } from '@angular/router';
import { promise } from 'protractor';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent implements OnInit {

  nuevoProducto = false;
  editarProducto = false;
  ELEMENT_DATA: any = [];
  TEMPORAL: any = [];
  CATEGORIAS: any = [];
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
  nombre: string = "";
  nuevores: any = {};
  CATPRO: any = {
    id_categoria: 0,
    id_producto: 0
  }
  CATPRO2: any = {
    id_categoria: null,
    id_producto: 0
  }
  login: any;
  file: File;
  constructor(private servicio: ServiciosService, private router: Router) { }

  ngOnInit() {
    this.usuario = this.servicio.getLog();
    this.login = this.servicio.getLogued();
    if(this.login == false || this.usuario.tipo_usuario != 3) {
      this.router.navigateByUrl('/denied')
    }
    this.getProductos();
    this.getCategorias();
  }

  public addProducto(valor?: boolean) {
    this.nuevoProducto = valor;
  }

  onChanged(event) {
    this.file = event.target.files[0];
  }

  subir(file: File) {
    let lines;
    let fileReader = new FileReader();
    fileReader.onload = () => {
      lines = fileReader.result.toString().split("\n")
      this.cargaMasiva(lines)
    }
    fileReader.readAsText(file)
  }

  async cargaMasiva(lineas: any[]) {
    this.usuario = this.servicio.getLog();
    this.NEW_PRODUCT.id_usuario = this.usuario.id_usuario;
    let categoria
    let linea = "";
    for(let i = 1; i < lineas.length; i++) {
        linea = lineas[i].split(",")
        this.NEW_PRODUCT.nombre = linea[1];
        this.NEW_PRODUCT.descripcion = linea[3];
        this.NEW_PRODUCT.imagen = linea[2];
        this.NEW_PRODUCT.precio = linea[5];
        this.NEW_PRODUCT.cantidad = linea[6];
        this.NEW_PRODUCT.color = linea[7];
        categoria = linea[4].split("-");
        if(categoria.length > 1) {
          this.nombre = categoria[1];
        } else {
          this.nombre = categoria[0];
        }
        await this.servicio.postProductos(this.NEW_PRODUCT)
          .then(data => {
            this.nuevores = data;
            this.getAxuliriar();
          })
    }
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
        .then((data) => {
          this.nuevores = data;
          this.getAxuliriar();
        })
      this.servicio.uploadImage(this.NEW_PRODUCT.avatar)
        .subscribe(() => console.log('ok'));
      /*this.NEW_PRODUCT.nombre = "";
      this.NEW_PRODUCT.descripcion = "";
      this.NEW_PRODUCT.imagen = "";
      this.NEW_PRODUCT.precio = "";
      this.NEW_PRODUCT.cantidad = "";
      this.NEW_PRODUCT.color = "";
      delete this.NEW_PRODUCT.avatar;*/
  }

  public getProductos() {
    this.usuario = this.servicio.getLog();
    this.servicio.getProductos()
      .then(data => {
        this.ELEMENT_DATA = data;
        this.ELEMENT_DATA = this.ELEMENT_DATA.filter(product => product.id_usuario === this.usuario.id_usuario);
        this.ELEMENT_DATA = this.ELEMENT_DATA.filter(product => product.estatus === 1);
      })
  }

  public async getAxuliriar() {
    this.usuario = this.servicio.getLog();
    await this.servicio.getProductos()
      .then(async data => {
        this.TEMPORAL = data;
        this.TEMPORAL = this.TEMPORAL.filter(product => product.id_usuario === this.usuario.id_usuario);
        this.TEMPORAL = this.TEMPORAL.filter(product => product.estatus === 1);
        //console.log('primero',this.TEMPORAL);
        await this.TEMPORAL.forEach(item => {
          if(item.nombre == this.nuevores.nombre) {
            this.CATPRO.id_producto = item.id_producto;
            return;
          }
        });
        await this.CATEGORIAS.forEach(categoria => {
          if(categoria.nombre == this.nombre) {
            this.CATPRO.id_categoria = categoria.id_categoria;
            if(categoria.id_padre !== null) {
              this.CATPRO2.id_categoria = categoria.id_padre;
              this.CATPRO2.id_producto = this.CATPRO.id_producto;
            }
            return;
          }
        });
        //console.log(this.CATPRO);
        this.servicio.postCatPro(this.CATPRO)
          .subscribe(() => console.log('ok'));
        if(this.CATPRO2.id_categoria !== null) {
          this.servicio.postCatPro(this.CATPRO2)
            .subscribe(() => console.log('ok'));
          this.CATPRO2.id_categoria = null;
        }
        this.getProductos();
      });
      
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

  public getCategorias() {
    this.servicio.getCategorias()
      .subscribe(data => {
        this.CATEGORIAS = data;
        this.CATEGORIAS = this.CATEGORIAS.filter(categoria => categoria.estatus === 1)
      })
  }

}
