import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding } from 'ionic-angular';

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
    public participantesProvider: ParticipantesProvider)
  {
    this.atualizaParticipantes();
  }

  ionViewDidEnter() {
    this.atualizaParticipantes();
  }

  atualizaParticipantes() {
    this.participantes = this.participantesProvider.getParticipantes();
  }

  editaParticipante(codigo, slidingItem: ItemSliding) {
    slidingItem.close();
    let cod = parseInt(codigo);
    this.navCtrl.push(ParticipantePage, { id: cod, novo: false });
  }

  deletaParticipante(codigo) {
    let cod = parseInt(codigo);
    this.participantesProvider.deletaParticipante(cod);

    this.atualizaParticipantes();
  }

  novoParticipante() {
    this.navCtrl.push(ParticipantePage, { id: -1, novo: true });
  }

}
