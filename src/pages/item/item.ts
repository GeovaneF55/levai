import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ItensProvider } from '../../providers/itens/itens';
import { Item } from '../../interfaces/item';

@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {

  idItem: string;
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
      itensProvider.getItem(this.idItem).then(dados => {
        let item: Item = dados;

        this.nomeItem = item.nome;
        this.vmaxItem = item.vmax;
        this.qtminItem = item.qtmin;
      });
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
