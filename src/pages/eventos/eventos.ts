import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding } from 'ionic-angular';

import { EventosProvider } from '../../providers/eventos/eventos';
import { EventoPage } from '../evento/evento';
import { Evento } from '../../interfaces/evento';

import { ConsultarEventoPage } from '../consultar-evento/consultar-evento';

@Component({
  selector: 'page-eventos',
  templateUrl: 'eventos.html',
})
export class EventosPage {

  eventos: Array<Evento>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public eventosProvider: EventosProvider)
  {
    this.atualizaEventos();
  }

  ionViewDidEnter() {
    this.atualizaEventos();
  }

  atualizaEventos() {
    this.eventosProvider.getEventos().then(dados => {
      this.eventos = dados;
    });
  }

  selecionaEvento(codigo) {
    this.navCtrl.push(ConsultarEventoPage, { id: codigo });
  }

  editaEvento(codigo, slidingItem: ItemSliding) {
    slidingItem.close();
    this.navCtrl.push(EventoPage, { id: codigo, novo: false });
  }

  deletaEvento(codigo) {
    this.eventosProvider.deletaEvento(codigo).then(response => {
      this.atualizaEventos();
    });
  }

  novoEvento() {
    this.navCtrl.push(EventoPage, { id: '-1', novo: true });
  }

}
