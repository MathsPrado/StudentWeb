import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PropostaSolicitacaoProjeto } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class PropostaService {
    private apiUrl = '/api/PropostaSolicitacaoProjeto';

    constructor(private http: HttpClient) { }

    create(proposta: PropostaSolicitacaoProjeto): Observable<any> {
        return this.http.post(this.apiUrl, proposta, { responseType: 'text' });
    }

    getAll(): Observable<PropostaSolicitacaoProjeto[]> {
        return this.http.get<PropostaSolicitacaoProjeto[]>(this.apiUrl);
    }

    // Assuming backend supports filter by project or user, but for now getting all and filtering in frontend or adds specific endpoint if known
    // getByProjectId(projectId: number): Observable<PropostaSolicitacaoProjeto[]> { ... }
}
