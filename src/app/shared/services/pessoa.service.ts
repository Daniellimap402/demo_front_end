import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PessoaService {

    ROTA = 'http://localhost:8080/api/pessoas/';
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    confirmar(token: String): Observable<any> {
        return this.http.get(this.ROTA + 'confirmar/' + token, this.httpOptions);
    }
}