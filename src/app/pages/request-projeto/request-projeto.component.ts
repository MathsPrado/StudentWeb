import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { SolicitacaoProjeto } from '../../models/models';

@Component({
    selector: 'app-request-projeto',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './request-projeto.component.html',
    styleUrl: './request-projeto.component.css'
})
export class RequestProjetoComponent implements OnInit {
    projectForm: FormGroup;
    loading: boolean = false;
    successMessage: string = '';
    errorMessage: string = '';

    constructor(
        private fb: FormBuilder,
        private solicitacaoService: SolicitacaoService,
        private router: Router
    ) {
        this.projectForm = this.fb.group({
            titulo: ['', Validators.required],
            dataInicio: [this.getFutureDate(30), Validators.required],
            dataFim: [this.getFutureDate(30), Validators.required],
            orcamento: ['', Validators.required],
            local: ['', Validators.required],
            descricao: ['', Validators.required]
        });
    }

    ngOnInit(): void { }

    getFutureDate(days: number): string {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return date.toISOString().split('T')[0];
    }

    submitting: boolean = false;

    // ... (constructor remains same)

    onSubmit() {
        if (this.projectForm.invalid) {
            this.projectForm.markAllAsTouched();
            return;
        }

        this.submitting = true;
        this.errorMessage = '';
        this.successMessage = '';

        const solicitacao: SolicitacaoProjeto = {
            ...this.projectForm.value,
            id: 0, // Backend should handle ID generation
            semDataInicio: false,
            semDataFim: false,
            listaConhecimentos: [] // Mock for now
        };

        this.solicitacaoService.create(solicitacao).subscribe({
            next: (response) => {
                this.submitting = false;
                // Backend returns "OK" or error string
                if (response === 'OK' || response?.status === 200 || typeof response === 'object') {
                    this.successMessage = 'Project published successfully!';
                    this.projectForm.reset();
                    // Optional: Navigate to feed
                    // this.router.navigate(['/feed']);
                } else {
                    this.errorMessage = 'Error: ' + response;
                }
            },
            error: (err) => {
                this.submitting = false;
                this.errorMessage = 'Failed to publish project. Please try again.';
                console.error(err);
            }
        });
    }

    resetForm() {
        this.projectForm.reset({
            dataInicio: this.getFutureDate(30),
            dataFim: this.getFutureDate(30)
        });
    }
}
