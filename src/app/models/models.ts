export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface User {
    email: string;
    password: string;
}

export interface PerfilUser {
    id: number;
    nome: string;
    sobrenome: string;
    email: string;
    telefone: string;
    biografia: string;
}

export interface SolicitacaoProjeto {
    id: number;
    titulo: string;
    dataInicio: Date;
    dataFim: Date;
    semDataInicio: boolean;
    semDataFim: boolean;
    orcamento: string; // Maps to Orçamento
    local: string;
    listaConhecimentos: string[];
    descricao: string;
}

export interface PropostaSolicitacaoProjeto {
    id: number;
    descircao: string; // Maps to Descircao (typo in backend)
    tempoEntrega: number;
    orcamento: string;
    idPropostaSolucao: number;
    idUsuario: number;
}
