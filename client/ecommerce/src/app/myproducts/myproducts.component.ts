import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent implements OnInit {

  nuevoProducto = false;
  editarProducto = false;

  constructor() { }

  ngOnInit() {
  }

  public addProducto(valor?: boolean) {
    this.nuevoProducto = valor;
  }

  public insertProducto(valor?: boolean) {
    this.nuevoProducto = valor;
  }

  public upProducto(valor?: boolean) {
    this.editarProducto = valor;
  }

  public updateProducto(valor?: boolean) {
    this.editarProducto = valor;
  }

  public deleteProducto() {
    
  }

}
