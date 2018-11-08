import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Item } from '../../interfaces/item';
import firebase from 'firebase';

@Injectable()
export class ItensProvider {

  constructor(public http: Http) {
    console.log('Hello ItensProvider Provider');
  }

  getItens(): Promise<Item[]> {
    return new Promise(resolve => {
      const db = firebase.database();
      db.ref('itens/').once('value').then(function(snapshot) {
        const resp = snapshot.val() ? snapshot.val() : undefined;
        let itens : Array<Item> = []
        
        if (resp){
          const itemKeys = Object.keys(resp);
  
          itemKeys.forEach(key => {
            const item: Item = resp[key]
            itens.push({
              id: key,
              nome: item.nome,
              vmax: item.vmax,
              qtmin: item.qtmin
            });
          });
        }

        resolve(itens);
      });
    });
  }

  getItem(codigo: string): Promise<Item> {
    return new Promise(resolve => {
      const db = firebase.database();
      db.ref('itens/' + codigo).once('value').then(function(snapshot) {
        const resp = snapshot.val() ? snapshot.val() : undefined;
        let item: Item;
        if(resp) {
           item = {
            id: codigo,
            nome: resp.nome,
            vmax: resp.vmax,
            qtmin: resp.qtmin
          }
        }
        resolve(item);
      });
    });
  }

  editaItem(id: string, nome: string, vmax: number, qtmin: number): Promise <any> {
    let item = {
      nome: nome,
      vmax: vmax,
      qtmin: qtmin
    };

    return new Promise(resolve => {
      const db = firebase.database();
      db.ref('itens/' + id).set(item);

      resolve(item);
    });
  }

  deletaItem(id: string): Promise <any> {
    return new Promise( resolve => {
      const db = firebase.database();
      db.ref('itens/' + id).remove();
      resolve(id);
    });
  }

  adicionaItem(nome: string, vmax: number, qtmin: number): Promise <any> {
    let item = {
      nome: nome,
      vmax: vmax,
      qtmin: qtmin
    };

    return new Promise(resolve => {
      const db = firebase.database();
      db.ref('itens/').push(item);
      resolve(item)
    });
  }

}
