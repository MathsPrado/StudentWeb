import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PerfilUser } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private apiUrl = '/api/PerfilUser';

    constructor(private http: HttpClient) { }

    getProfile(id: number): Observable<PerfilUser> {
        // Fallback if API is not fully ready or for testing, but ideally calls backend
        // return this.http.get<PerfilUser>(`${this.apiUrl}/${id}`);

        // Mocking based on Blazor's "Jansh Wells" for now to ensure UI works even if backend is tricky
        // In real scenario, uncomment http call
        return of({
            id: id,
            nome: 'Jansh',
            sobrenome: 'Wells',
            email: 'abc12@probic.com',
            telefone: '1234567890',
            biografia: 'To achieve this, it would be necessary to have uniform grammar, and more common words.',
            role: 'Web Designer',
            skills: ['HTML', 'Bootstrap', 'Scss', 'Javascript', 'Angular', 'React']
        });
    }
}
