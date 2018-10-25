import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  editaItem(codigo) {
    let cod = parseInt(codigo);
    this.navCtrl.push(ItemPage, { id: cod, novo: false });
  }

  deletaItem(codigo) {
    let cod = parseInt(codigo);
  }

  novoItem() {
    this.navCtrl.push(ItemPage, { id: 0, novo: true });
  }

}
