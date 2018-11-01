export interface Evento {
    id: number,
    nome: string,
    local: string,
    data: Date,
    contato: string,
    observacoes: string,
    idParticipantes: Array<number>,
    idItens: Array<number>
}