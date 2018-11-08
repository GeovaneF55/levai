import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ParticipantesProvider } from '../../providers/participantes/participantes';
import { Participante } from '../../interfaces/participante';

@Component({
  selector: 'page-participante',
  templateUrl: 'participante.html',
})
export class ParticipantePage {

  idParticipante: string;
  nomeParticipante: string;
  contatoParticipante: string;

  novo: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public participantesProvider: ParticipantesProvider) {
      
      this.idParticipante = navParams.get('id');
      this.novo = navParams.get('novo');

      if (!this.novo) {
        participantesProvider.getParticipante(this.idParticipante).then(dados => {
          let participante: Participante = dados;

          this.nomeParticipante = participante.nome;
          this.contatoParticipante = participante.contato;
        });
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
