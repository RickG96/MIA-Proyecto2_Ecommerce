import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {

  BITACORA: any = [];

  constructor(private servicio: ServiciosService) { }

  ngOnInit() {
    this.getBitacora();
  }

  getBitacora() {
    this.servicio.getBitacora()
      .subscribe(data => {
        this.BITACORA = data;
      })
  }

}
