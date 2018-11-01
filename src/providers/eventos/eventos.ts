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
      observacoes: '',
      idParticipantes: [1, 2],
      idItens: [1,3]
    },
    {
      id: 2, nome: 'Pokemon Lendário',
      local: 'Rua Castigliano, 478 - Belo Horizonte',
      data: new Date(2018, 10, 20),
      contato: '(41)91273-1289',
      observacoes: '',
      idParticipantes: [2, 4],
      idItens: [1,2]
    },
    {
      id: 3, nome: 'Amigo Oculto',
      local: 'Rua Tenente Coronel, 338 - Betim',
      data: new Date(2018, 11, 19),
      contato: '(51)91273-1231',
      observacoes: '',
      idParticipantes: [3, 5],
      idItens: [2,3]
    } 
  ];
  ultimoId=3; 

  constructor(public http: Http) {
    console.log('Hello EventosProvider Provider');
  }

  getEventos() {
    return this.eventos;
  }

  getEvento(id: number) {
    let index = this.eventos.findIndex(evento => evento.id == id);
    return this.eventos[index];
  }

  editaEvento(id: number, nome: string, local: string, data: Date,
    cont: string, obs: string, idPar: Array<number>, idIt: Array<number>) {
    let index = this.eventos.findIndex(evento => evento.id == id);

    this.eventos[index].nome = nome;
    this.eventos[index].local = local;
    this.eventos[index].data = data;
    this.eventos[index].contato = cont;
    this.eventos[index].observacoes = obs;
    this.eventos[index].idParticipantes = idPar;
    this.eventos[index].idItens = idIt;
  }

  deletaEvento(id: number) {
    let index = this.eventos.findIndex(evento => evento.id == id);
    this.eventos.splice(index,1);
  }

  adicionaEvento(nome: string, local: string, data: Date,
    cont: string, obs: string, idPar: Array<number>, idIt: Array<number>) {
    this.ultimoId++;
    this.eventos.push({
      id: this.ultimoId,
      nome: nome,
      local: local,
      data: data,
      contato: cont,
      observacoes: obs,
      idParticipantes: idPar,
      idItens: idIt
    });
  }

}