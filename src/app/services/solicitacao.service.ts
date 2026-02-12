import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SolicitacaoProjeto } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class SolicitacaoService {
    private apiUrl = '/api/SolicitacaoProjeto';

    constructor(private http: HttpClient) { }

    create(solicitacao: SolicitacaoProjeto): Observable<any> {
        // The C# backend seems to return a string "OK" or error message.
        // Angular HttpClient expects JSON by default. If it returns plain text, we need responseType: 'text'
        return this.http.post(this.apiUrl, solicitacao, { responseType: 'text' });
    }

    getAll(): Observable<SolicitacaoProjeto[]> {
        return this.http.get<any[]>(this.apiUrl).pipe(
            map(data => {
                console.log('Raw API Data:', data);
                return data.map(item => ({
                    id: item.id,
                    titulo: item.titulo || 'Untitled Project',
                    dataInicio: item.dataInicio,
                    dataFim: item.dataFim,
                    semDataInicio: item.semDataInicio,
                    semDataFim: item.semDataFim,
                    orcamento: item['orçamento'] || item['orcamento'] || '0',
                    local: item.local || 'Unknown Location',
                    listaConhecimentos: item.listaConhecimentos || [],
                    descricao: item.descricao || 'No description provided.',
                    status: item.status
                }));
            })
        );
    }

    getById(id: number): Observable<SolicitacaoProjeto> {
        return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
            map(item => ({
                id: item.id,
                titulo: item.titulo || 'Untitled Project',
                dataInicio: item.dataInicio,
                dataFim: item.dataFim,
                semDataInicio: item.semDataInicio,
                semDataFim: item.semDataFim,
                orcamento: item['orçamento'] || item['orcamento'] || '0',
                local: item.local || 'Unknown Location',
                listaConhecimentos: item.listaConhecimentos || [],
                descricao: item.descricao || 'No description provided.',
                status: item.status
            }))
        );
    }
}
