import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from 'src/app/dominio/pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  rota = 'http://localhost:8080/api/pessoas/'

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<object>{
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(`${username}:${password}`)}); 
    return this.http.get(this.rota,{headers, responseType: 'text' as 'json'});
  }

  public listar(): Observable<object>{
    const username = 'TESTE';
    const password = 'TESTE';
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(`${username}:${password}`)}); 
    return this.http.get(this.rota+'listar', {headers});
  }

  public cadastrar(pessoa: Pessoa): Observable<Object>{
    console.log('entrou');
    
    const username = 'TESTE';
    const password = 'TESTE';
    const headers = new HttpHeaders({Authorization: 'Basic '+ btoa(`${username}:${password}`)}); 
    return this.http.post(this.rota, pessoa, {headers});
  }

}
