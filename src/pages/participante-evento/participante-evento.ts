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

    this.evento = this.eventosProvider.getEvento(idEvento);

    let participantes: Array<Participante> = participantesProvider.getParticipantes();
    this.participantesEvento = participantes.filter(
      participante => !(this.evento.idParticipantes.includes(participante.id))
    );
  }

  selecionarParticipante(codigo) {
    let cod: number = parseInt(codigo);
    
    let idParticipantes: Array<number> = this.evento.idParticipantes;
    idParticipantes.push(cod);

    this.eventosProvider.editaEvento(this.evento.id, this.evento.nome,
      this.evento.local, this.evento.data, this.evento.contato,
      this.evento.observacoes, idParticipantes
    );
    this.navCtrl.pop();
  }

}
