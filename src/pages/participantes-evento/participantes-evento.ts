import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ParticipantesProvider } from '../../providers/participantes/participantes';
import { EventosProvider } from '../../providers/eventos/eventos';

import { ParticipanteEventoPage } from '../participante-evento/participante-evento';

import { Participante } from '../../interfaces/participante';
import { Evento } from '../../interfaces/evento';

@Component({
  selector: 'page-participantes-evento',
  templateUrl: 'participantes-evento.html',
})
export class ParticipantesEventoPage {

  idEvento: number;
  evento: Evento;
  participantesEvento: Array<Participante>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public participantesProvider: ParticipantesProvider,
    public eventosProvider: EventosProvider) {

    this.idEvento = navParams.get('id');

    this.getDados();
  }

  ionViewDidEnter() {
    this.getDados();
  }

  getDados() {
    this.evento = this.eventosProvider.getEvento(this.idEvento);
    let participantes: Array<Participante> = this.participantesProvider.getParticipantes();

    this.participantesEvento = participantes.filter(
      participante => this.evento.idParticipantes.includes(participante.id)
    );
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
      this.evento.observacoes, idParticipantes
    );

    this.getDados();
  }

}
