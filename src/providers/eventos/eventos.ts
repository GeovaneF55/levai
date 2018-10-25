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

  getEventos(){
    return this.eventos;
  }

}