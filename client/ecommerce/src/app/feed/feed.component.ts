import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  ELEMENT_DATA: any = [];
  CATEGORIAS: any = [];
  PADRE: any = [];
  AUXILIAR: any = [];
  RELACION: any = [];
  login: any;
  usuario: any;
  filtro: any = "";
  constructor(private servicio: ServiciosService, private router: Router) { }

  ngOnInit() {
    this.getProductos();
    this.getCategorias();
    this.getRel();
    this.usuario = this.servicio.getLog();
    this.login = this.servicio.getLogued();
  }

  public getRel() {
    this.servicio.getCatPro()
      .subscribe(data => {
        this.RELACION = data;
      })
  }

  public getProductos() {
    this.servicio.getProductos()
      .then(async data => {
        this.ELEMENT_DATA = data;
        this.ELEMENT_DATA = this.ELEMENT_DATA.filter(product => product.estatus === 1);
        await this.ELEMENT_DATA.forEach(element => {
          element.imagen = element.imagen.replace("localhost", "192.168.0.3");
        });
        console.log(this.ELEMENT_DATA);
        this.AUXILIAR = this.ELEMENT_DATA;
      })
  }

  public getCategorias() {
    this.servicio.getCategorias()
      .subscribe(data => {
        this.CATEGORIAS = data;
        this.CATEGORIAS = this.CATEGORIAS.filter(categoria => categoria.estatus === 1);
        //this.AUXILIAR = this.CATEGORIAS;
        this.CATEGORIAS.forEach(categoria => {
          if(categoria.id_padre === null) {
            let padre = {
              id: categoria.id_categoria,
              nombre: categoria.nombre,
              hijos: []
            }
            this.PADRE.push(padre);
          }
        });
        this.PADRE.forEach(element => {
          this.CATEGORIAS.forEach(element2 => {
            if(element.id === element2.id_padre) {
              let hijo = {
                id: element2.id_categoria,
                nombre: element2.nombre
              }
              element.hijos.push(hijo);
            }
          });
        });
      })
  }

  public filtroCategoria(id: number) {
    //console.log(id);
    let lista = this.RELACION;
    lista = lista.filter(element => element.id_categoria === id);
    let listaPro = this.AUXILIAR;
    let listaFinal = [];
    lista.forEach(element => {
      listaPro.forEach(element2 => {
        if(element.id_producto === element2.id_producto) {
          listaFinal.push(element2)
        }
      });
    });
    this.ELEMENT_DATA = listaFinal;
  }

  public seeProduct(producto) {
    this.servicio.setProductoVer(producto);
    this.router.navigateByUrl('/add');
  }

  asc: boolean;
  des: boolean;

  public ascendente() {
    if(!this.asc) {
      this.ELEMENT_DATA = this.ELEMENT_DATA.reverse();
      this.asc = true
      this.des = false;
    }
  }

  public descendente() {
    if(!this.des) {
      this.ELEMENT_DATA = this.ELEMENT_DATA.reverse();
      this.des = true;
      this.asc = false;
    }
  }

  public porFecha() {
    this.ELEMENT_DATA = this.ELEMENT_DATA.sort((a,b) => a.fecha.localeCompare(b.fecha))
    this.asc = true;
    this.des = false;
  }

  public porPrecio() {
    this.ELEMENT_DATA = this.ELEMENT_DATA.sort((a,b) => {
      return +a.precio - +b.precio;
    })
    this.asc = true;
    this.des = false;
  }

  public todos() {
    this.ELEMENT_DATA = this.AUXILIAR;
  }

  public filtrar() {
    const regexFiltro = new RegExp(this.filtro, "g");
    console.log(regexFiltro.toString())
    this.ELEMENT_DATA = this.AUXILIAR.filter(element => {
      return Boolean(regexFiltro.test(element.nombre))
    })
  }
}
