import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  login: any;
  usuario: any;

  constructor(private servicio: ServiciosService, private router: Router) { }

  ngOnInit() {
    this.usuario = this.servicio.getLog();
    this.login = this.servicio.getLog();
    if(this.login == false || this.usuario.tipo_usuario != 1) {
      this.router.navigateByUrl('/denied');
    }
  }

}
