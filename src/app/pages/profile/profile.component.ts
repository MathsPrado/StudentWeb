import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile.service';
import { PerfilUser } from '../../models/models';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
    user: PerfilUser | null = null;
    loading = true;

    constructor(private profileService: ProfileService) { }

    ngOnInit(): void {
        this.loadProfile();
    }

    loadProfile() {
        this.loading = true;
        // Mock ID 1 for now
        this.profileService.getProfile(1).subscribe({
            next: (data) => {
                this.user = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading profile', err);
                this.loading = false;
            }
        });
    }
}
