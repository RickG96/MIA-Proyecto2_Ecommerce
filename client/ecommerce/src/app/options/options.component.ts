import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  actualizar = false;

  ngOnInit() {
  } 

  updateUser(mostrar?: boolean) {
    this.actualizar = mostrar;
    console.log("acutaliza")
  }

  update(mostrar?: boolean) {
    this.actualizar = mostrar;
    console.log("ok")
  }
}
