import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ParticipantesProvider } from '../../providers/participantes/participantes';

@Component({
  selector: 'page-participante',
  templateUrl: 'participante.html',
})
export class ParticipantePage {

  idParticipante: number;
  nomeParticipante: string;
  contatoParticipante: string;

  novo: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public participantesProvider: ParticipantesProvider) {
      
      this.idParticipante = navParams.get('id');
      this.novo = navParams.get('novo');

      if (!this.novo) {
        let participantes = participantesProvider.getParticipantes();
        for (let i=0; i<participantes.length; i++) {
          if (participantes[i].id == this.idParticipante) {
            this.nomeParticipante = participantes[i].nome;
            this.contatoParticipante = participantes[i].contato;
          }
        }
      } else {
        this.nomeParticipante = "";
        this.contatoParticipante = "";
      }
  }

  incluir() {

    this.participantesProvider.adicionaParticipante(
      this.nomeParticipante,
      this.contatoParticipante
    );
    this.navCtrl.pop();
  }

  alterar() {

    this.participantesProvider.editaParticipante(
      this.idParticipante,
      this.nomeParticipante,
      this.contatoParticipante
    );
    this.navCtrl.pop();
  }

}
