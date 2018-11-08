import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Evento } from '../../interfaces/evento';
import firebase from 'firebase';

@Injectable()
export class EventosProvider {

  constructor(public http: Http) {
    console.log('Hello EventosProvider Provider');
  }

  getEventos(): Promise<Evento[]> {
    return new Promise(resolve => {
      const db = firebase.database();
      db.ref('eventos/').once('value').then(function(snapshot) {
        const resp = snapshot.val() ? snapshot.val() : undefined;
        let eventos : Array<Evento> = []
        
        if (resp){
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
          });
        }

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

}