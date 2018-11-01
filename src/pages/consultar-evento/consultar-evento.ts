import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding } from 'ionic-angular';

import { ParticipantesProvider } from '../../providers/participantes/participantes';
import { EventosProvider } from '../../providers/eventos/eventos';
import { ItensProvider } from '../../providers/itens/itens';

import { ParticipanteEventoPage } from '../participante-evento/participante-evento';
import { ItensPage } from '../itens/itens';
import { ItemPage } from '../item/item';

import { Participante } from '../../interfaces/participante';
import { Evento } from '../../interfaces/evento';
import { Item } from '../../interfaces/item';

@Component({
  selector: 'page-consultar-evento',
  templateUrl: 'consultar-evento.html',
})
export class ConsultarEventoPage {

  idEvento: number;
  evento: Evento;
  participantesEvento: Array<Participante>;
  itensEvento: Array<Item>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public participantesProvider: ParticipantesProvider,
    public eventosProvider: EventosProvider,
    public itensProvider: ItensProvider) {

    this.idEvento = navParams.get('id');

    this.getDados();
  }

  ionViewDidEnter() {
    this.getDados();
  }

  getDados() {
    this.evento = this.eventosProvider.getEvento(this.idEvento);
    let participantes: Array<Participante> = this.participantesProvider.getParticipantes();
    let itens: Array<Item> = this.itensProvider.getItens();

    this.participantesEvento = participantes.filter(
      participante => this.evento.idParticipantes.includes(participante.id)
    );

    this.itensEvento = itens.filter(
      item => this.evento.idItens.includes(item.id)
    );
  }

  novoItem() {
    this.navCtrl.push(ItensPage, { id: this.idEvento });
  }

  editaItem(codigo, slidingItem: ItemSliding) {
    slidingItem.close();
    let cod = parseInt(codigo);
    this.navCtrl.push(ItemPage, { id: cod });
  }

  deletaItem(codigo) {
    let cod: number = parseInt(codigo);

    let idItens: Array<number> = this.evento.idItens;
    let index = idItens.indexOf(cod);

    idItens.splice(index, 1);

    this.eventosProvider.editaEvento(this.evento.id, this.evento.nome,
      this.evento.local, this.evento.data, this.evento.contato,
      this.evento.observacoes, this.evento.idParticipantes, idItens
    );

    this.getDados();
  }

  novoParticipante() {
    this.navCtrl.push(ParticipanteEventoPage, { id: this.idEvento });
  }

  deletaParticipante(codigo) {
    let cod: number = parseInt(codigo);

    let idParticipantes: Array<number> = this.evento.idParticipantes;
    let index = idParticipantes.indexOf(cod);

    idParticipantes.splice(index, 1);

    this.eventosProvider.editaEvento(this.evento.id, this.evento.nome,
      this.evento.local, this.evento.data, this.evento.contato,
      this.evento.observacoes, idParticipantes, this.evento.idItens
    );

    this.getDados();
  }

}
