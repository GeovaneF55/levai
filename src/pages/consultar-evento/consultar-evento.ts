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

  idEvento: string;
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
    this.eventosProvider.getEvento(this.idEvento).then(dados => {
      this.evento = dados;
    });
    
    this.participantesProvider.getParticipantes().then(dados => {
      let participantes: Array<Participante> = dados;

      this.participantesEvento = participantes.filter(
        participante => this.evento.idParticipantes.includes(participante.id)
      );
    });
    
    this.itensProvider.getItens().then(dados => {
      let itens: Array<Item> = dados;

      this.itensEvento = itens.filter(
        item => this.evento.idItens.includes(item.id)
      );
    });
  }

  novoItem() {
    this.navCtrl.push(ItensPage, { id: this.idEvento });
  }

  editaItem(codigo, slidingItem: ItemSliding) {
    slidingItem.close();
    this.navCtrl.push(ItemPage, { id: codigo });
  }

  deletaItem(codigo) {
    let idItens: Array<string> = this.evento.idItens;
    let index = idItens.indexOf(codigo);

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
    let idParticipantes: Array<string> = this.evento.idParticipantes;
    let index = idParticipantes.indexOf(codigo);

    idParticipantes.splice(index, 1);

    this.eventosProvider.editaEvento(this.evento.id, this.evento.nome,
      this.evento.local, this.evento.data, this.evento.contato,
      this.evento.observacoes, idParticipantes, this.evento.idItens
    );

    this.getDados();
  }

}
