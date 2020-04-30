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

  constructor(private servicio: ServiciosService, private router: Router) { }

  ngOnInit() {
    this.getProductos()
  }

  public getProductos() {
    this.servicio.getProductos()
      .subscribe(data => {
        this.ELEMENT_DATA = data;
        this.ELEMENT_DATA = this.ELEMENT_DATA.filter(product => product.estatus === 1);
        console.log(this.ELEMENT_DATA)
      })
  }

  public seeProduct(producto) {
    this.servicio.setProductoVer(producto);
    this.router.navigateByUrl('/add');
  }

}
