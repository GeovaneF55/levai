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
  vmaxItem: number;
  qtminItem: number;

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
          this.vmaxItem = itens[i].vmax;
          this.qtminItem = itens[i].qtmin;
          break;
        }
      }
    } else {
      this.nomeItem = "";
      this.vmaxItem = 0;
      this.qtminItem = 0;
    }
  }

  incluir() {
    this.itensProvider.adicionaItem(
      this.nomeItem,
      this.vmaxItem,
      this.qtminItem
    );
    this.navCtrl.pop();
  }

  alterar() {
    this.itensProvider.editaItem(
      this.idItem,
      this.nomeItem,
      this.vmaxItem,
      this.qtminItem
    );
    this.navCtrl.pop();
  }

}
