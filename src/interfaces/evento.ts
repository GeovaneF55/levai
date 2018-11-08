export interface Evento {
    id: string,
    nome: string,
    local: string,
    data: Date,
    contato: string,
    observacoes: string,
    idParticipantes: Array<string>,
    idItens: Array<string>
}