import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.component.html',
  styleUrls: ['./addcar.component.css']
})
export class AddcarComponent implements OnInit {

  producto: any;
  carrito: any;
  MI_CARRITO: any = [];
  detalle: any = {
    id_producto: 0,
    id_carrito: 0
  }

  constructor(private servicio: ServiciosService, private router: Router) { }

  ngOnInit() {
    this.producto = this.servicio.getProductoVer();
    this.carrito = this.servicio.getCarrito();
    this.getDetalleCarrito();
  }

  reseniaProducto() {
    this.router.navigateByUrl('/product');
  }

  public getDetalleCarrito() {
    this.servicio.getDetallesCP()
      .subscribe(data => {
        this.MI_CARRITO = data;
        this.MI_CARRITO = this.MI_CARRITO.filter(detalle => detalle.estado === 1)
        this.MI_CARRITO = this.MI_CARRITO.filter(detalle => detalle.id_carrito === this.carrito.id_carrito)
        console.log(this.MI_CARRITO);
      })
  }

  public enviarDetalle() {
    console.log(this.detalle)
    this.detalle.id_carrito = this.carrito.id_carrito;
    this.detalle.id_producto = this.producto.id_producto;
    this.servicio.postDetalleCP(this.detalle)
      .subscribe(() => {
        this.getDetalleCarrito();
        this.sumarDetalle();
      });
    this.detalle.id_producto = 0;
    this.detalle.id_carrito = 0;
  }

  public borrarDetalle(id: number) {
    this.servicio.deleteDetalleCP(id)
      .subscribe(() => this.getDetalleCarrito())
  }

  public sumarDetalle() {
    let total = 0;
    this.MI_CARRITO.forEach(carrito => {
      total = total + +carrito.precio;
    });
    total = total + +this.producto.precio;
    this.carrito.total = total;
    this.servicio.setCarrito(this.carrito);
    this.servicio.putCarrito(this.carrito, this.carrito.id_carrito)
      .subscribe(() => console.log('ok'))
  }

}
