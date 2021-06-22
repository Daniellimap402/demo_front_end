import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from './../../dominio/pessoa';
@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  ROTA = 'http://localhost:8080/api/auth/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, senha: string }): Observable<any> {
    return this.http.post(this.ROTA + 'entrar', {
      username: credentials.email,
      password: credentials.senha
    }, this.httpOptions);
  }

  register(user: Pessoa): Observable<any> {
    return this.http.post(this.ROTA + 'registrar', user, this.httpOptions);
  }

}