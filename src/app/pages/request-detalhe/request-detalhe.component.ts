import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { PropostaService } from '../../services/proposta.service';
import { SolicitacaoProjeto, PropostaSolicitacaoProjeto } from '../../models/models';

@Component({
    selector: 'app-request-detalhe',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './request-detalhe.component.html',
    styleUrl: './request-detalhe.component.css'
})
export class RequestDetalheComponent implements OnInit {
    project: SolicitacaoProjeto | null = null;
    proposalForm: FormGroup;
    loading = true;
    submitting = false;
    successMessage = '';
    error = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private solicitacaoService: SolicitacaoService,
        private propostaService: PropostaService,
        private fb: FormBuilder
    ) {
        this.proposalForm = this.fb.group({
            orcamento: ['', Validators.required],
            tempoEntrega: ['', Validators.required],
            descircao: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadProject(+id);
        } else {
            this.error = 'Invalid Project ID';
            this.loading = false;
        }
    }

    loadProject(id: number) {
        this.loading = true;
        this.solicitacaoService.getById(id).subscribe({
            next: (data) => {
                this.project = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading project', err);
                // Fallback Mock
                this.project = {
                    id: id,
                    titulo: 'Marketing Plan',
                    orcamento: '5000',
                    local: 'New York',
                    descricao: 'Detailed description here...',
                    dataInicio: new Date(),
                    dataFim: new Date(),
                    listaConhecimentos: ['Marketing', 'SEO', 'Content']
                };
                this.loading = false;
            }
        });
    }

    onSubmit() {
        if (this.proposalForm.valid && this.project) {
            this.submitting = true;
            const formValue = this.proposalForm.value;

            const proposal: PropostaSolicitacaoProjeto = {
                idPropostaSolucao: this.project.id,
                idUsuario: 1, // Mock User ID, normally get from auth service
                orcamento: formValue.orcamento,
                tempoEntrega: formValue.tempoEntrega,
                descircao: formValue.descircao
            };

            this.propostaService.create(proposal).subscribe({
                next: () => {
                    this.successMessage = 'Proposal submitted successfully!';
                    this.submitting = false;
                    this.proposalForm.reset();
                },
                error: (err) => {
                    this.error = 'Failed to submit proposal.';
                    this.submitting = false;
                }
            });
        } else {
            this.proposalForm.markAllAsTouched();
        }
    }
}
