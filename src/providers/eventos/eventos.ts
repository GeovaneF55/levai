import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Evento } from '../../interfaces/evento';
import firebase from 'firebase';

@Injectable()
export class EventosProvider {

  /*
  eventos: Array<Evento> = [
    { 
      id: 1, nome: 'Festa da Xuxa',
      local: 'Rua Vera Cruz, 559 - Contagem',
      data: new Date(2018, 9, 24),
      contato: '(31)91237-1092',
      observacoes: 'Evento dedicado a nossa rainha xuxa. Vamos amá-la sempre!! s2',
      idParticipantes: [1, 2],
      idItens: [1,3]
    },
    {
      id: 2, nome: 'Pokemon Lendário',
      local: 'Rua Castigliano, 478 - Belo Horizonte',
      data: new Date(2018, 10, 20),
      contato: '(41)91273-1289',
      observacoes: 'Evento dedicado para pegar o pokemon Lendário Mew Two. Troco Lapras, chamar inbox.',
      idParticipantes: [2, 4],
      idItens: [1,2]
    },
    {
      id: 3, nome: 'Amigo Oculto',
      local: 'Rua Tenente Coronel, 338 - Betim',
      data: new Date(2018, 11, 19),
      contato: '(51)91273-1231',
      observacoes: 'Esse evento é secreto, se não foi chamado é pq niguém gosta de você',
      idParticipantes: [3, 5],
      idItens: [2,3]
    } 
  ];
  ultimoId=3;
  */

  constructor(public http: Http) {
    console.log('Hello EventosProvider Provider');
  }

  getEventos(): Promise<Evento[]> {
    return new Promise(resolve => {
      const db = firebase.database();
      db.ref('eventos/').once('value').then(function(snapshot) {
        const resp = snapshot.val() ? snapshot.val() : undefined;
        let eventos : Array<Evento> = []
        
        const eventoKeys = Object.keys(resp);

        eventoKeys.forEach(key => {
          const evento: Evento = resp[key]
          eventos.push({
            id: key,
            nome: evento.nome,
            local: evento.local,
            data: evento.data,
            contato: evento.contato,
            observacoes: evento.observacoes,
            idParticipantes: evento.idParticipantes,
            idItens: evento.idItens
          });
        })

        resolve(eventos);
      });
    });
  }

  getEvento(cod: string): Promise<Evento> {
    return new Promise(resolve => {
      const db = firebase.database();
      db.ref('eventos/' + cod).once('value').then(function(snapshot) {
        const resp = snapshot.val() ? snapshot.val() : undefined;
        let evento: Evento;
        if(resp) {
           evento = {
            id: resp.id,
            nome: resp.nome,
            local: resp.local,
            data: resp.data,
            contato: resp.contato,
            observacoes: resp.observacoes,
            idParticipantes: resp.idParticipantes,
            idItens: resp.idItens
          }
        }
        resolve(evento);
      });
    });
  }

  editaEvento(id: string, nome: string, local: string, data: Date,
    contato: string, observacoes: string, idParticipantes: Array<string>,
    idItens: Array<string>): Promise <any> {
    let evento = {
      nome: nome,
      local: local,
      data: data,
      contato: contato,
      observacoes: observacoes,
      idParticipantes: idParticipantes,
      idItens: idItens
    };

    return new Promise(resolve => {
      const db = firebase.database();
      db.ref('eventos/' + id).set(evento);

      resolve(evento);
    });
  }

  deletaEvento(id: string): Promise <any> {
    return new Promise( resolve => {
      const db = firebase.database();
      db.ref('eventos/' + id).remove();
      resolve(id);
    });
  }

  adicionaEvento(nome: string, local: string, data: Date,
    contato: string, observacoes: string, idParticipantes: Array<string>,
    idItens: Array<string>): Promise <any> {
    let evento = {
      nome: nome,
      local: local,
      data: data,
      contato: contato,
      observacoes: observacoes,
      idParticipantes: idParticipantes,
      idItens: idItens
    };

    return new Promise(resolve => {
      const db = firebase.database();
      db.ref('eventos/').push(evento);
      resolve(evento)
    });
  }

  /*
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
  */

}