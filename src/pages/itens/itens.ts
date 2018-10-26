import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding } from 'ionic-angular';

import { ItensProvider } from '../../providers/itens/itens';
import { ItemPage } from '../item/item';
import { Item } from '../../interfaces/item';

@Component({
  selector: 'page-itens',
  templateUrl: 'itens.html',
})
export class ItensPage {

  itens: Array<Item>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public itensProvider: ItensProvider) {
    this.itens = itensProvider.getItens();
  }

  ionViewDidEnter() {
    this.itens = this.itensProvider.getItens();
  }

  editaItem(codigo, slidingItem: ItemSliding) {
    slidingItem.close();
    let cod = parseInt(codigo);
    this.navCtrl.push(ItemPage, { id: cod, novo: false });
  }

  deletaItem(codigo) {
    let cod = parseInt(codigo);
    this.itensProvider.deletaItem(cod);
  }

  novoItem() {
    this.navCtrl.push(ItemPage, { id: -1, novo: true });
  }

}
