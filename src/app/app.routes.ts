import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RequestProjetoComponent } from './pages/request-projeto/request-projeto.component';
import { FeedComponent } from './pages/feed/feed.component';
import { RequestDetalheComponent } from './pages/request-detalhe/request-detalhe.component';
import { RequestDetalheInscricaoComponent } from './pages/request-detalhe-inscricao/request-detalhe-inscricao.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'feed', component: FeedComponent, canActivate: [AuthGuard] },
    { path: 'request-projeto', component: RequestProjetoComponent, canActivate: [AuthGuard] },
    { path: 'request-detalhe/:id', component: RequestDetalheComponent, canActivate: [AuthGuard] },
    { path: 'my-proposals', component: RequestDetalheInscricaoComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/feed', pathMatch: 'full' }
];
