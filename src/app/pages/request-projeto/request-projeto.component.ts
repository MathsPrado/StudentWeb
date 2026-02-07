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

    onSubmit() {
        if (this.projectForm.value.titulo === '' ||
            this.projectForm.value.orcamento === '' ||
            this.projectForm.value.local === '' ||
            this.projectForm.value.descricao === '') {
            this.errorMessage = 'Preencher todos os campos';
            return;
        }

        this.loading = true;
        this.errorMessage = '';
        this.successMessage = '';

        const solicitacao: SolicitacaoProjeto = {
            ...this.projectForm.value,
            // Map form string dates to Date objects if needed, but passing as string might fail if backend expects strict Date.
            // However, C# DateTime usually accepts ISO strings.
            // The interface says Date, but form returns string.
            // Let's assume standard binding.
            semDataInicio: false,
            semDataFim: false,
            listaConhecimentos: []
        };

        this.solicitacaoService.create(solicitacao).subscribe({
            next: (response) => {
                this.loading = false;
                if (response === 'OK') {
                    this.successMessage = 'Salvo com sucesso!';
                    this.resetForm();
                    // location.reload() equivalent or router navigate
                    // The blazor code forced a reload. We can just reset.
                } else {
                    this.errorMessage = 'Erro: ' + response;
                }
            },
            error: (err) => {
                this.loading = false;
                this.errorMessage = 'Ocorreu um erro ao salvar.';
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
