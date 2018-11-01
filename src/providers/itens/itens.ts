import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Item } from '../../interfaces/item';

@Injectable()
export class ItensProvider {

  itens: Array<Item> = [
    { 
      id: 1,
      nome: "Coxinha", 
      vmax: 30,
      qtmin: 50
    },
    { 
      id: 2,
      nome: "Coca-Cola", 
      vmax: 55,
      qtmin: 5
    },
    { 
      id: 3,
      nome: "Guaraná",
      vmax: 35,
      qtmin: 4
    },
    { 
      id: 4,
      nome: "Brigadeiro",
      vmax: 50,
      qtmin: 60
    },
    { 
      id: 5,
      nome: "Bolo",
      vmax: 90,
      qtmin: 1
    },
    { 
      id: 6,
      nome: "Bolinho",
      vmax: 50,
      qtmin: 20
    },
    { 
      id: 7,
      nome: "Cajuzinho",
      vmax: 40,
      qtmin: 40
    },
    { 
      id: 8,
      nome: "Pastel",
      vmax: 50,
      qtmin: 100
    }

  ];
  ultimoId = 8;

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

  editaItem(id: number, nome: string, vmax: number,
    qtmin: number) {
    let index = this.itens.findIndex(item => item.id == id);

    this.itens[index].nome = nome;
    this.itens[index].vmax = vmax;
    this.itens[index].qtmin = qtmin;
  }

  deletaItem(id: number) {
    let index = this.itens.findIndex(item => item.id == id);
    this.itens.splice(index,1);
  }

  adicionaItem(nome: string, vmax: number,
    qtmin: number) {
    this.ultimoId++;
    this.itens.push({
      id: this.ultimoId,
      nome: nome,
      vmax: vmax,
      qtmin: qtmin
    });
  }

}
