import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Participante } from '../../interfaces/participante';
import firebase from 'firebase';

@Injectable()
export class ParticipantesProvider {

  /*
  participantes: Array<Participante> = [
    { id:1, nome: 'Gabriel Luciano', contato: '(31)90123-1234'},
    { id:2, nome: 'Geovane Fonseca', contato: '(31)91048-1395'},
    { id:3, nome: 'Isabelle Langkammer', contato: '(31)92748-8261'},
    { id:4, nome: 'Luigi Domenico', contato: '(31)9187-1982'},
    { id:5, nome: 'Paulo Lana', contato: '(31)91723-1463'},
  ];
  ultimoId=5;
  */

  constructor(public http: Http) {
    console.log('Hello ParticipantesProvider Provider');
  }

  getParticipantes(): Promise<Participante[]> {
    return new Promise(resolve => {
      const db = firebase.database();
      db.ref('participantes/').once('value').then(function(snapshot) {
        const resp = snapshot.val() ? snapshot.val() : undefined;
        let participantes : Array<Participante> = []
        
        const participanteKeys = Object.keys(resp);

        participanteKeys.forEach(key => {
          const participante: Participante = resp[key]
          participantes.push({
            id: key,
            nome: participante.nome,
            contato: participante.contato
          });
        })

        resolve(participantes);
      });
    });
  }

  getParticipante(cod: string): Promise<Participante> {
    return new Promise(resolve => {
      const db = firebase.database();
      db.ref('participantes/' + cod).once('value').then(function(snapshot) {
        const resp = snapshot.val() ? snapshot.val() : undefined;
        let participante: Participante;
        if(resp) {
           participante = {
            id: resp.id,
            nome: resp.nome,
            contato: resp.contato
          }
        }
        resolve(participante);
      });
    });
  }

  editaParticipante(id: string, nome: string, contato: string): Promise <any> {
    let participante = {
      nome: nome,
      contato: contato
    };

    return new Promise(resolve => {
      const db = firebase.database();
      db.ref('participantes/' + id).set(participante);

      resolve(participante);
    });
  }

  deletaParticipante(id: string): Promise <any> {
    return new Promise( resolve => {
      const db = firebase.database();
      db.ref('participantes/' + id).remove();
      resolve(id);
    });
  }

  adicionaParticipante(nome: string, contato: string): Promise <any> {
    let participante = {
      nome: nome,
      contato: contato
    };

    return new Promise(resolve => {
      const db = firebase.database();
      db.ref('participantes/').push(participante);
      resolve(participante)
    });
  }

  /*getParticipantes() {
    return this.participantes;
  }

  getParticipante(id: number) {
    let index = this.participantes.findIndex(participante => participante.id == id);
    return this.participantes[index];
  }

  editaParticipante(id: number, nome: string, cont: string) {
    let index = this.participantes.findIndex(participante => participante.id == id);

    this.participantes[index].nome = nome;
    this.participantes[index].contato = cont;
  }

  deletaParticipante(id: number) {
    let index = this.participantes.findIndex(participante => participante.id == id);

    this.participantes.splice(index,1);
  }

  adicionaParticipante(nome: string, cont: string) {
    this.ultimoId++;
    this.participantes.push({
      id: this.ultimoId,
      nome: nome,
      contato: cont
    });
  }*/

}
