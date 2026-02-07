import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolicitacaoProjeto } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class SolicitacaoService {
    private apiUrl = 'https://localhost:44303/api/SolicitacaoProjeto'; // Assumed endpoint based on class name

    constructor(private http: HttpClient) { }

    create(solicitacao: SolicitacaoProjeto): Observable<any> {
        // The C# backend seems to return a string "OK" or error message.
        // Angular HttpClient expects JSON by default. If it returns plain text, we need responseType: 'text'
        return this.http.post(this.apiUrl, solicitacao, { responseType: 'text' });
    }

    // Add other methods as needed based on IPropostaSolicitacaoProjetoService or ISolicitacaoProjectServer
}
