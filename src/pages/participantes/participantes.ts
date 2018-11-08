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
    this.participantesProvider.getParticipantes().then( dados => {
      this.participantes = dados;
    });
  }

  editaParticipante(codigo, slidingItem: ItemSliding) {
    slidingItem.close();
    this.navCtrl.push(ParticipantePage, { id: codigo, novo: false });
  }

  deletaParticipante(codigo) {
    this.participantesProvider.deletaParticipante(codigo).then(response => {
      this.atualizaParticipantes();
    });
  }

  novoParticipante() {
    this.navCtrl.push(ParticipantePage, { id: '-1', novo: true });
  }

}
