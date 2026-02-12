import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropostaService } from '../../services/proposta.service';
import { PropostaSolicitacaoProjeto } from '../../models/models';

@Component({
    selector: 'app-request-detalhe-inscricao',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './request-detalhe-inscricao.component.html',
    styleUrl: './request-detalhe-inscricao.component.css'
})
export class RequestDetalheInscricaoComponent implements OnInit {
    proposals: PropostaSolicitacaoProjeto[] = [];
    loading = true;

    constructor(private propostaService: PropostaService) { }

    ngOnInit(): void {
        this.loading = true;
        this.propostaService.getAll().subscribe({
            next: (data) => {
                this.proposals = data;
                this.loading = false;
            },
            error: (err) => {
                console.error(err);
                // Mock data
                this.proposals = [
                    { id: 1, idPropostaSolucao: 1, orcamento: '5000', tempoEntrega: 10, descircao: 'Expert in this field...', idUsuario: 1 },
                    { id: 2, idPropostaSolucao: 3, orcamento: '4500', tempoEntrega: 15, descircao: 'I have done similar projects...', idUsuario: 1 }
                ];
                this.loading = false;
            }
        });
    }
}
