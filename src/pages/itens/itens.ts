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
    this.eventosProvider.getEvento(idEvento).then(dados => {
      this.evento = dados;
    });

    this.atualizaItens();
  }

  ionViewDidEnter() {
    this.atualizaItens();
  }

  atualizaItens() {
    this.itensProvider.getItens().then( dados => {
      let itens: Array<Item> = dados;
      this.itens = itens.filter(
        item => !(this.evento.idItens.includes(item.id))
      );
    });
  }

  selecionarItem(codigo) {
    
    let idItens: Array<string> = this.evento.idItens;
    idItens.push(codigo);

    this.eventosProvider.editaEvento(this.evento.id, this.evento.nome,
      this.evento.local, new Date(this.evento.data), this.evento.contato,
      this.evento.observacoes, this.evento.idParticipantes, idItens
    );
    this.navCtrl.pop();
  }

  editaItem(codigo, slidingItem: ItemSliding) {
    slidingItem.close();
    this.navCtrl.push(ItemPage, { id: codigo, novo: false });
  }

  deletaItem(codigo) {
    this.itensProvider.deletaItem(codigo).then(response => {
      this.atualizaItens();
    });
  }

  novoItem() {
    this.navCtrl.push(ItemPage, { id: '-1', novo: true });
  }

}
