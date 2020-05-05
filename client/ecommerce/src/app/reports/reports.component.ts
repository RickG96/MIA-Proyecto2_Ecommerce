import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { Router } from '@angular/router';
import jsPDF  from 'jspdf';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  login: any;
  usuario: any;
  REPORTE1: any = [];
  REPORTE2: any = [];
  REPORTE3: any = [];
  REPORTE4: any = [];
  REPORTE5: any = [];
  REPORTE6: any = [];
  REPORTE7: any = [];
  REPORTE8: any = [];
  REPORTE9: any = [];
  REPORTE10: any = [];
  txtanio1 = "";
  txtanio2 = "";
  rep1: any = {
    anio: 0
  }
  rep4: any =  {
    estrellas: 0
  }
  rep8: any = {
    fecha: ""
  }
  rep9: any = {
    cantidad: ""
  }

  constructor(private servicio: ServiciosService, private router: Router) { }

  ngOnInit() {
    this.usuario = this.servicio.getLog();
    this.login = this.servicio.getLog();
    if(this.login == false || this.usuario.tipo_usuario != 1) {
      this.router.navigateByUrl('/denied');
    }
    this.reporteTres();
    this.reporteCinco();
    this.reporteSeis();
    this.reporteSiete();
    this.reporteDiez();
  }

  public descargar(array) {
    const doc = new jsPDF();

    let texto = JSON.stringify(array, null, 4);

    doc.text(texto, 10, 10);

    doc.save('tuarchivo.pdf')
  }

  joinArrayObjs(ar) {
    var str = '';
    for (var i = 0, len = ar.length; i < len; i++) {
        str += ar[i].name + ' is ' + ar[i].age + '. ';
    }
    return str;
  }

  public reporteUno() {
    this.rep1.anio = "01-01-" + this.txtanio1;
    console.log(this.rep1.anio)
    this.servicio.getReportes(this.rep1, 1)
      .subscribe(data => {
        this.REPORTE1 = data;
      });
  }

  public reporteDos() {
    this.rep1.anio = "01-01-" + this.txtanio2
    console.log(this.rep1.anio)
    this.servicio.getReportes(this.rep1, 2)
      .subscribe(data => {
        this.REPORTE2 = data;
      })
  }

  public reporteTres() {
    this.servicio.getReportes({}, 3)
      .subscribe(data => {
        this.REPORTE3 = data;
      })
  }

  public reporteCuatro() {
    this.servicio.getReportes(this.rep4, 4)
      .subscribe(data => {
        this.REPORTE4 = data;
      })
  }

  public reporteCinco() {
    this.servicio.getReportes({}, 5)
      .subscribe(data => {
        this.REPORTE5 = data;
      })
  }

  public reporteSeis() {
    this.servicio.getReportes({}, 6)
      .subscribe(data => {
        this.REPORTE6 = data;
        //console.log(this.REPORTE6)
      })
  }

  public reporteSiete() {
    this.servicio.getReportes({}, 7)
    .subscribe(data => {
      this.REPORTE7 = data;
      //console.log(this.REPORTE7)
    })  
  }

  public reporteOcho() {
    this.servicio.getReportes(this.rep8,8)
      .subscribe(data => {
        this.REPORTE8 = data;
      })
  }

  public reporteNueve() {
    this.servicio.getReportes(this.rep9,9)
      .subscribe(data => {
        this.REPORTE9 = data;
      })
  }

  public reporteDiez() {
    this.servicio.getReportes({},10)
      .subscribe(data => {
        this.REPORTE10 = data;
      })
  }

}
