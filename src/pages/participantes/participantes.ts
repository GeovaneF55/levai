import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ParticipantesProvider } from '../../providers/participantes/participantes';
import { ParticipantePage } from '../participante/participante';
import { Participante } from '../../interfaces/participante';

@Component({
  selector: 'page-participantes',
  templateUrl: 'participantes.html',
})
export class ParticipantesPage {

  participantes: Array<Participante>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public participantesProvider: ParticipantesProvider) {
    this.participantes = participantesProvider.getParticipantes();
  }

  ionViewDidEnter() {
    this.participantes = this.participantesProvider.getParticipantes();
  }

  editaParticipante(codigo) {
    let cod = parseInt(codigo);
    this.navCtrl.push(ParticipantePage, { id: cod, novo: false });
  }

  deletaParticipante(codigo) {
    let cod = parseInt(codigo);
    this.participantesProvider.deletaParticipante(cod);
  }

  novoParticipante() {
    this.navCtrl.push(ParticipantePage, { id: -1, novo: true });
  }

}
