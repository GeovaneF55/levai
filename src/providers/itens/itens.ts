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
  ultimoCodigo = 3;

  constructor(public http: Http) {
    console.log('Hello ItensProvider Provider');
  }

  getItens() {
    return this.itens;
  }

}
