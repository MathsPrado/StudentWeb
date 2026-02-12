import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = '/api/auth';
    private tokenKey = 'authToken';
    private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

    isLoggedIn$ = this.isLoggedInSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) { }

    login(request: LoginRequest): Observable<any> {
        // Converting to PascalCase to match C# model explicitly
        const payload = {
            Username: request.username,
            Password: request.password
        };
        return this.http.post(`${this.apiUrl}/login`, payload, { responseType: 'text' }).pipe(
            tap(token => {
                console.log('Login Token:', token); // Debugging
                if (token) {
                    localStorage.setItem(this.tokenKey, token);
                    this.isLoggedInSubject.next(true);
                }
            })
        );
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
        this.isLoggedInSubject.next(false);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    private hasToken(): boolean {
        return !!localStorage.getItem(this.tokenKey);
    }
}
