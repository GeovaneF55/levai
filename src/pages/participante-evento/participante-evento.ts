import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ParticipantesProvider } from '../../providers/participantes/participantes';
import { EventosProvider } from '../../providers/eventos/eventos';

import { Participante } from '../../interfaces/participante';
import { Evento } from '../../interfaces/evento';

@Component({
  selector: 'page-participante-evento',
  templateUrl: 'participante-evento.html',
})
export class ParticipanteEventoPage {

  evento: Evento;
  participantesEvento: Array<Participante>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public eventosProvider: EventosProvider,
    public participantesProvider: ParticipantesProvider)
  {
    let idEvento = this.navParams.get("id");

    this.eventosProvider.getEvento(idEvento).then(dados => {
      this.evento = dados;
    });

    this.atualizaParticipantes();
  }

  ionViewDidEnter() {
    this.atualizaParticipantes();
  }

  atualizaParticipantes() {
    this.participantesProvider.getParticipantes().then(dados => {
      let participantes: Array<Participante> = dados;

      this.participantesEvento = participantes.filter(
        participante => !(this.evento.idParticipantes.includes(participante.id))
      );
    });
  }

  selecionarParticipante(codigo) {
    let idParticipantes: Array<string> = this.evento.idParticipantes;
    idParticipantes.push(codigo);

    this.eventosProvider.editaEvento(this.evento.id, this.evento.nome,
      this.evento.local, new Date(this.evento.data), this.evento.contato,
      this.evento.observacoes, idParticipantes, this.evento.idItens
    );
    this.navCtrl.pop();
  }

}
