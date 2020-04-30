import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  producto: any;

  constructor(private servicio: ServiciosService) { }

  ngOnInit() {
    this.producto = this.servicio.getProductoVer();
  }

}
