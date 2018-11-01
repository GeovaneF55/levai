import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding } from 'ionic-angular';

import { EventosProvider } from '../../providers/eventos/eventos';
import { ItensProvider } from '../../providers/itens/itens';

import { ItemPage } from '../item/item';

import { Item } from '../../interfaces/item';
import { Evento } from '../../interfaces/evento';

@Component({
  selector: 'page-itens',
  templateUrl: 'itens.html',
})
export class ItensPage {

  evento: Evento;
  itens: Array<Item>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public itensProvider: ItensProvider,
    public eventosProvider: EventosProvider)
  {
    let idEvento = this.navParams.get("id");
    this.evento = this.eventosProvider.getEvento(idEvento);

    let itens: Array<Item> = this.itensProvider.getItens();
    this.itens = itens.filter(
      item => !(this.evento.idItens.includes(item.id))
    );
  }

  ionViewDidEnter() {
    let itens: Array<Item> = this.itensProvider.getItens();
    this.itens = itens.filter(
      item => !(this.evento.idItens.includes(item.id))
    );
  }

  selecionarItem(codigo) {
    let cod: number = parseInt(codigo);
    
    let idItens: Array<number> = this.evento.idItens;
    idItens.push(cod);

    this.eventosProvider.editaEvento(this.evento.id, this.evento.nome,
      this.evento.local, this.evento.data, this.evento.contato,
      this.evento.observacoes, this.evento.idParticipantes, idItens
    );
    this.navCtrl.pop();
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
