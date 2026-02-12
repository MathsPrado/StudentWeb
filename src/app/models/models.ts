export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    // Add other properties if returned by backend, e.g., user details
}

export interface User {
    email: string;
    password: string;
}

export interface PerfilUser {
    id: number;
    nome: string;
    sobrenome?: string; // Optional as not seen in Blazor usage explicitly yet, but good practice
    email: string;
    telefone: string;
    biografia: string;
    skills?: string[]; // For "My Skill" section
    role?: string; // e.g., "Web Designer"
}

export interface SolicitacaoProjeto {
    id: number;
    titulo: string;
    dataInicio: Date | string; // Allow string for serialization
    dataFim: Date | string;
    semDataInicio?: boolean;
    semDataFim?: boolean;
    orcamento: string; // Maps to Orçamento
    local: string;
    listaConhecimentos?: string[];
    descricao: string;
    status?: string; // Pending, Completed, etc.
}

export interface PropostaSolicitacaoProjeto {
    id?: number;
    descircao: string; // Backend typo maintained
    tempoEntrega: number;
    orcamento: string;
    idPropostaSolucao: number; // Project ID
    idUsuario: number;
}
