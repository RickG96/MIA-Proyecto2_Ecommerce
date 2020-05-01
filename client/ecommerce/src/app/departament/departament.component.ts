import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-departament',
  templateUrl: './departament.component.html',
  styleUrls: ['./departament.component.css']
})
export class DepartamentComponent implements OnInit {

  actualizar = false;
  nuevo = false;
  ELEMENT_DATA: any = [];
  PADRE_CAT: any = [];
  NEW_CAT: any = {
    nombre: "",
    descripcion: "",
    id_padre: null
  };
  NEW_SCAT: any = {
    nombre: "",
    descripcion: "",
    id_padre: 0
  }
  UPD_CAT: any = {
    id_categoria: 0,
    nombre: "",
    descripcion: ""
  }
  nombre: string = "";
  
  constructor(private servicio: ServiciosService) { }

  ngOnInit() {
    this.getCategorias();
  }

  public actDep(categoria, valor?: boolean) {
    this.actualizar = valor;
    this.UPD_CAT.id_categoria = categoria.id_categoria;
    this.UPD_CAT.nombre = categoria.nombre;
    this.UPD_CAT.descripcion = categoria.descripcion;
  }

  public updateDep(valor?: boolean) {
    this.actualizar = valor;
    this.servicio.putCategoria(this.UPD_CAT, this.UPD_CAT.id_categoria)
      .subscribe(() => {
        this.getCategorias();
        this.UPD_CAT.id_categoria = 0;
        this.UPD_CAT.nombre = "";
        this.UPD_CAT.descripcion = "";
      })
  }

  public getCategorias() {
    this.servicio.getCategorias()
      .subscribe(data => {
        this.ELEMENT_DATA = data;
        this.ELEMENT_DATA = this.ELEMENT_DATA.filter(categoria => categoria.estatus === 1);
        this.PADRE_CAT = this.ELEMENT_DATA.filter(categoria => categoria.id_padre === null);
      })
  }

  public agregarCat() {
    this.nuevo = true;
  }

  public insertCategoria() {
    this.nuevo = false;
    this.servicio.postCategoria(this.NEW_CAT)
      .subscribe(() => this.getCategorias());
    this.NEW_CAT.nombre = "";
    this.NEW_CAT.descripcion = "";
  }

  public insertSubCategoria() {
    this.nuevo = false;
    this.PADRE_CAT.forEach(categoria => {
      if(categoria.nombre == this.nombre) {
        this.NEW_SCAT.id_padre = categoria.id_categoria;
        return;
      }
    });
    this.servicio.postCategoria(this.NEW_SCAT)
      .subscribe(() => this.getCategorias());
    this.NEW_SCAT.nombre = "";
    this.NEW_SCAT.descripcion = "";
    this.NEW_SCAT.id_padre = 0;
  }

  public deleteCategoria(id_categoria: number) {
    this.servicio.deleteCategoria(id_categoria)
      .subscribe(() => {
        this.getCategorias();
      })
  }
} 
