import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Participante } from '../../interfaces/participante';
import firebase from 'firebase';

@Injectable()
export class ParticipantesProvider {

  constructor(public http: Http) {
    console.log('Hello ParticipantesProvider Provider');
  }

  getParticipantes(): Promise<Participante[]> {
    return new Promise(resolve => {
      const db = firebase.database();
      db.ref('participantes/').once('value').then(function(snapshot) {
        const resp = snapshot.val() ? snapshot.val() : undefined;
        let participantes : Array<Participante> = [];
        
        if (resp){
          const participanteKeys = Object.keys(resp);

          participanteKeys.forEach(key => {
            const participante: Participante = resp[key]
            participantes.push({
              id: key,
              nome: participante.nome,
              contato: participante.contato
            });
          });
        }

        resolve(participantes);
      });
    });
  }

  getParticipante(codigo: string): Promise<Participante> {
    return new Promise(resolve => {
      const db = firebase.database();
      db.ref('participantes/' + codigo).once('value').then(function(snapshot) {
        const resp = snapshot.val() ? snapshot.val() : undefined;
        let participante: Participante;
        if(resp) {
           participante = {
            id: codigo,
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

}
