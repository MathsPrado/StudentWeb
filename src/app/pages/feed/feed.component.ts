import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { SolicitacaoProjeto } from '../../models/models';

@Component({
    selector: 'app-feed',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './feed.component.html',
    styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit {
    projects: SolicitacaoProjeto[] = [];
    loading = true;
    error = '';

    constructor(
        private solicitacaoService: SolicitacaoService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadProjects();
    }

    loadProjects() {
        this.loading = true;
        this.solicitacaoService.getAll().subscribe({
            next: (data) => {
                this.projects = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading projects', err);
                // Fallback mock data if API fails (for demo purposes)
                this.projects = [
                    { id: 1, titulo: 'Marketing Plan', orcamento: '5000', local: 'New York', descricao: 'Every Marketing Plan Needs...', dataInicio: new Date(), dataFim: new Date() },
                    { id: 2, titulo: 'Website Design', orcamento: '3000', local: 'Remote', descricao: 'Creating the design and layout...', dataInicio: new Date(), dataFim: new Date() },
                    { id: 3, titulo: 'UI / UX Design', orcamento: '4500', local: 'California', descricao: 'Plan and conduct user research...', dataInicio: new Date(), dataFim: new Date() }
                ];
                this.loading = false;
                // this.error = 'Failed to load projects.';
            }
        });
    }

    openDetails(id: number) {
        this.router.navigate(['/request-detalhe', id]);
    }
}
