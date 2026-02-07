import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RequestProjetoComponent } from './pages/request-projeto/request-projeto.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'request-projeto', component: RequestProjetoComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/request-projeto', pathMatch: 'full' }
];
