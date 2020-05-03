import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private servicio: ServiciosService) { }

  ngOnInit() {
    console.log(this.servicio.getLog());
    this.servicio.setLogued(false);
  }

}
