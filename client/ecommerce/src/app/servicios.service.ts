import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const httpOptions = {
  headers:new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http: HttpClient, private router: Router) { }

  getUsuarios() {
    return this.http.get('http://localhost:3000/api/usuarios');
  }

  deleteUsuario(id) {
    return this.http.delete('http://localhost:3000/api/usuarios/' + id, httpOptions)
  }
  
  putUsuario(usuario, id) {
    return this.http.put('http://localhost:3000/api/usuarios/' + id, usuario, httpOptions)
  }
}
