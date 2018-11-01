import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Item } from '../../interfaces/item';

@Injectable()
export class ItensProvider {

  itens: Array<Item> = [
    { 
      id: 1, nome: "Salgado", vmin: 10, 
      vmax: 20, qtmin: 3, qtmax: 10,
      opcoes: [
        ["Coxinha", true],
        ["Pastel", false],
        ["Kibe", true],
      ]
    },
    { 
      id: 2, nome: "Refrigerante", vmin: 15, 
      vmax: 25, qtmin: 5, qtmax: 6,
      opcoes: [
        ["Coca-Cola", true],
        ["Guaraná", true],
        ["Fanta", true],
      ]
    },
    { 
      id: 3, nome: "Doce", vmin: 20, 
      vmax: 30, qtmin: 7, qtmax: 15,
      opcoes: [
        ["Brigadeiro", true],
        ["Beijinho", false],
        ["Cajuzinho", false],
      ]
    }
  ];
  ultimoId = 3;

  constructor(public http: Http) {
    console.log('Hello ItensProvider Provider');
  }

  getItens() {
    return this.itens;
  }

  getItem(id: number) {
    let index = this.itens.findIndex(item => item.id == id);
    return this.itens[index];
  }

  editaItem(id: number, nome: string, vmin: number, vmax: number,
    qtmin: number, qtmax: number, opcoes: Array<[string, boolean]>) {
    let index = this.itens.findIndex(item => item.id == id);

    this.itens[index].nome = nome;
    this.itens[index].vmin = vmin;
    this.itens[index].vmax = vmax;
    this.itens[index].qtmin = qtmin;
    this.itens[index].qtmax = qtmax;
    this.itens[index].opcoes = opcoes;
  }

  deletaItem(id: number) {
    let index = this.itens.findIndex(item => item.id == id);
    this.itens.splice(index,1);
  }

  adicionaItem(nome: string, vmin: number, vmax: number,
    qtmin: number, qtmax: number, opcoes: Array<[string, boolean]>) {
    this.ultimoId++;
    this.itens.push({
      id: this.ultimoId,
      nome: nome,
      vmin: vmin,
      vmax: vmax,
      qtmin: qtmin,
      qtmax: qtmax,
      opcoes: opcoes
    });
  }

}
