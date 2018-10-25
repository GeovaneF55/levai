import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EventosProvider } from '../../providers/eventos/eventos';
import { EventoPage } from '../evento/evento';
import { Evento } from '../../interfaces/evento';
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';

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

  editaEvento(codigo) {
    let cod = parseInt(codigo);
    this.navCtrl.push(EventoPage, { id: cod, novo: false });
  }

  deletaEvento(codigo) {
    let cod = parseInt(codigo);
  }

  novoEvento() {
    this.navCtrl.push(EventoPage, { id: 0, novo: true });
  }

}
