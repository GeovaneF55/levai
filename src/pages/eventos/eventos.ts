import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding } from 'ionic-angular';

import { EventosProvider } from '../../providers/eventos/eventos';
import { EventoPage } from '../evento/evento';
import { Evento } from '../../interfaces/evento';

@Component({
  selector: 'page-eventos',
  templateUrl: 'eventos.html',
})
export class EventosPage {

  eventos: Array<Evento>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public eventosProvider: EventosProvider) {
      this.eventos = eventosProvider.getEventos();
  }

  ionViewDidEnter() {
    this.eventos = this.eventosProvider.getEventos();
  }

  editaEvento(codigo, slidingItem: ItemSliding) {
    slidingItem.close();
    let cod = parseInt(codigo);
    this.navCtrl.push(EventoPage, { id: cod, novo: false });
  }

  deletaEvento(codigo) {
    let cod = parseInt(codigo);
    this.eventosProvider.deletaEvento(cod);
  }

  novoEvento() {
    this.navCtrl.push(EventoPage, { id: -1, novo: true });
  }

}
