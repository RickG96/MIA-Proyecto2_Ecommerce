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
  usr: any;
  MI_CARRITO: any = [];
  USUARIOS: any = [];
  detalle: any = {
    id_producto: 0,
    id_carrito: 0
  }

  constructor(private servicio: ServiciosService, private router: Router) { }

  ngOnInit() {
    this.producto = this.servicio.getProductoVer();
    this.carrito = this.servicio.getCarrito();
    this.usr = this.servicio.getLog();
    this.getDetalleCarrito();
    this.getUsuarios();
  }

  reseniaProducto() {
    this.router.navigateByUrl('/product');
  }

  public getUsuarios() {
    this.servicio.getUsuarios()
      .subscribe(data => {
        this.USUARIOS = data;
        this.USUARIOS = this.USUARIOS.filter(usuario => usuario.estatus === 1);
      })
  }

  public getDetalleCarrito() {
    this.servicio.getDetallesCP()
      .subscribe(data => {
        this.MI_CARRITO = data;
        this.MI_CARRITO = this.MI_CARRITO.filter(detalle => detalle.estado === 1)
        this.MI_CARRITO = this.MI_CARRITO.filter(detalle => detalle.id_carrito === this.carrito.id_carrito)
        //console.log(this.MI_CARRITO);
      })
  }

  public enviarDetalle() {
    //console.log(this.detalle)
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

  public async comprarCarrito() {
    let lista = this.groupBy(this.MI_CARRITO, 'id_usuario');
    let correoVenta = [];
    //console.log(lista);
    for(const element in lista) {
      //console.log(typeof element);
      let hola = this.USUARIOS.filter(usuario => usuario.id_usuario == +element)
      let correo = {
        email: hola[0].correo,
        productos: lista[element]
      }
      //console.log(hola)
      correoVenta.push(correo);
    }
    this.servicio.correoVenta(correoVenta)
      .subscribe(() => console.log('ok'));
    let correoCompra = {
      correo: this.usr.correo,
      listado: this.MI_CARRITO,
      total: this.carrito.total
    }
    this.servicio.correoCompra(correoCompra)
      .subscribe((data) => {
        console.log('ok')
      })
    await this.MI_CARRITO.forEach(element => {
      this.borrarDetalle(element.id_detalle);
    });
    this.getDetalleCarrito();
    this.usr.credito -= this.carrito.total;
    this.carrito.total = 0;
    this.servicio.setCarrito(this.carrito);
    this.servicio.putCarrito(this.carrito, this.carrito.id_carrito)
      .subscribe(() => console.log('ok'))
    this.servicio.putUsuario(this.usr, this.usr.id_usuario)
      .subscribe(() => {
        this.servicio.setLog(this.usr)
      })
    console.log(typeof (this.usr.credito + ""));
  }

  public borrarDetalle2(id: number) {
    this.servicio.deleteDetalleCP(id)
  }

  public groupBy = function (xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

}
