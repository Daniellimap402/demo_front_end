import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/dominio/login';

@Injectable({
    providedIn: 'root'
})
export class PessoaService {

    ROTA = 'http://localhost:8080/api/pessoas/';
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    confirmar(email: String): Observable<any> {
        return this.http.patch(this.ROTA + 'confirmar/' + email, this.httpOptions);
    }

    recuperar(email: String): Observable<any> {
        return this.http.patch(this.ROTA + 'recuperar/' + email, this.httpOptions);
    }

    alterarSenha(novasCredenciais: Login): Observable<any> {
        return this.http.patch(this.ROTA + 'alterar-senha',{
            username: novasCredenciais.email,
            password: novasCredenciais.senha
          }, this.httpOptions);
    }
}