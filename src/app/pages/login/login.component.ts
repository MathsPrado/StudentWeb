import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    loginForm: FormGroup;
    error: string = '';
    loading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.loading = true;
            this.error = '';

            const { username, password } = this.loginForm.value;
            this.authService.login({ username, password }).subscribe({
                next: () => {
                    this.router.navigate(['/feed']); // Navigate to feed after login
                },
                error: (err) => {
                    this.loading = false;
                    this.error = 'Invalid credentials or server error. Check console for details.';
                    console.error('Login error details:', err);
                    if (err.error) {
                        console.error('Backend returned:', err.error);
                    }
                }
            });
        } else {
            this.loginForm.markAllAsTouched();
        }
    }
}
