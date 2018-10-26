import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ItensProvider } from '../../providers/itens/itens';

@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {

  idItem: number;
  nomeItem: string;
  vminItem: number;
  vmaxItem: number;
  qtminItem: number;
  qtmaxItem: number;
  opcoes: Array<[string, boolean]>;

  novo:boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public itensProvider: ItensProvider) {
    
    this.idItem = navParams.get('id');
    this.novo = navParams.get('novo');

    if(!this.novo){
      let itens = itensProvider.getItens();
      for(let i=0; i<itens.length; i++){
        if(itens[i].id == this.idItem){
          this.nomeItem = itens[i].nome;
          this.vminItem = itens[i].vmin;
          this.vmaxItem = itens[i].vmax;
          this.qtminItem = itens[i].qtmin;
          this.qtmaxItem = itens[i].qtmax;
          this.opcoes = itens[i].opcoes;
          break;
        }
      }
    } else {
      this.nomeItem = "";
      this.vminItem = 0;
      this.vmaxItem = 0;
      this.qtminItem = 0;
      this.qtmaxItem = 0;
      this.opcoes = [];
    }
  }

  incluir() {
    this.itensProvider.adicionaItem(
      this.nomeItem,
      this.vminItem,
      this.vmaxItem,
      this.qtminItem,
      this.qtmaxItem,
      this.opcoes
    );
    this.navCtrl.pop();
  }

  alterar() {
    this.itensProvider.editaItem(
      this.idItem,
      this.nomeItem,
      this.vminItem,
      this.vmaxItem,
      this.qtminItem,
      this.qtmaxItem,
      this.opcoes
    );
    this.navCtrl.pop();
  }

}
