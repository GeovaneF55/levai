export interface Item {
    id: number,
    nome: string,
    vmin: number,
    vmax: number,
    qtmin: number,
    qtmax: number,
    opcoes: Array<[string, boolean]>
}