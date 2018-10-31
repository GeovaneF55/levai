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
    return this.itens[id];
  }

  editaItem(id: number, nome: string, vmin: number, vmax: number,
    qtmin: number, qtmax: number, opcoes: Array<[string, boolean]>) {
    for(let i=0; i<this.itens.length; i++) {
      if(this.itens[i].id == id) {
        this.itens[i].nome = nome;
        this.itens[i].vmin = vmin;
        this.itens[i].vmax = vmax;
        this.itens[i].qtmin = qtmin;
        this.itens[i].qtmax = qtmax;
        this.itens[i].opcoes = opcoes;
        break;
      }
    }
  }

  deletaItem(id: number) {
    for(let i=0; i<this.itens.length; i++) {
      if(this.itens[i].id == id) {
        this.itens.splice(i,1);
        break;
      }
    }
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
