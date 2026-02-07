import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-nav-menu',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './nav-menu.component.html',
    styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent {
    isExpanded = false;

    constructor(public authService: AuthService) { }

    collapseNavMenu() {
        this.isExpanded = false;
    }

    toggleNavMenu() {
        this.isExpanded = !this.isExpanded;
    }

    logout() {
        this.authService.logout();
    }
}
