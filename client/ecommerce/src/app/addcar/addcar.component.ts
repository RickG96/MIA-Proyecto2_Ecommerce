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

  constructor(private servicio: ServiciosService, private router: Router) { }

  ngOnInit() {
    this.producto = this.servicio.getProductoVer();
  }

  reseniaProducto() {
    this.router.navigateByUrl('/product');
  }

}
