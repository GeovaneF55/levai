import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Evento } from '../../interfaces/evento';

@Injectable()
export class EventosProvider {

  eventos: Array<Evento> = [
    { 
      id: 1, nome: 'Festa da Xuxa',
      local: 'Rua Vera Cruz, 559 - Contagem',
      data: new Date(2018, 9, 24),
      contato: '(31)91237-1092',
      observacoes: ''
    },
    {
      id: 2, nome: 'Pokemon Lendário',
      local: 'Rua Castigliano, 478 - Belo Horizonte',
      data: new Date(2018, 10, 20),
      contato: '(41)91273-1289',
      observacoes: ''
    },
    {
      id: 3, nome: 'Amigo Oculto',
      local: 'Rua Tenente Coronel, 338 - Betim',
      data: new Date(2018, 11, 19),
      contato: '(51)91273-1231',
      observacoes: ''
    } 
  ];
  ultimoId=3; 

  constructor(public http: Http) {
    console.log('Hello EventosProvider Provider');
  }

  getEventos() {
    return this.eventos;
  }

  editaEvento(id: number, nome: string, local: string, data: Date,
    cont: string, obs: string) {
    for(let i=0; i<this.eventos.length; i++) {
      if(this.eventos[i].id == id) {
        this.eventos[i].nome = nome;
        this.eventos[i].local = local;
        this.eventos[i].data = data;
        this.eventos[i].contato = cont;
        this.eventos[i].observacoes = obs;
        break;
      }
    }
  }

  deletaEvento(id: number) {
    for(let i=0; i<this.eventos.length; i++) {
      if(this.eventos[i].id == id) {
        this.eventos.splice(i,1);
        break;
      }
    }
  }

  adicionaEvento(nome: string, local: string, data: Date,
    cont: string, obs: string) {
    this.ultimoId++;
    this.eventos.push({
      id: this.ultimoId,
      nome: nome,
      local: local,
      data: data,
      contato: cont,
      observacoes: obs
    });
  }

}