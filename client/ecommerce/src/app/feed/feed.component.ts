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

  constructor(private servicio: ServiciosService, private router: Router) { }

  ngOnInit() {
    this.getProductos();
    this.getCategorias();
    this.getRel();
  }

  public getRel() {
    this.servicio.getCatPro()
      .subscribe(data => {
        this.RELACION = data;
      })
  }

  public getProductos() {
    this.servicio.getProductos()
      .then(data => {
        this.ELEMENT_DATA = data;
        this.ELEMENT_DATA = this.ELEMENT_DATA.filter(product => product.estatus === 1);
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

}
