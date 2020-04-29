import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-departament',
  templateUrl: './departament.component.html',
  styleUrls: ['./departament.component.css']
})
export class DepartamentComponent implements OnInit {

  actualizar = false;
  
  constructor() { }

  ngOnInit() {
  }

  actDep(valor?: boolean) {
    this.actualizar = valor;
  }

  updateDep(valor?: boolean) {
    this.actualizar = valor;
  }

}
