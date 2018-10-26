import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ParticipantesProvider } from '../../providers/participantes/participantes';
import { EventosProvider } from '../../providers/eventos/eventos';
import { Participante } from '../../interfaces/participante';
import { Evento } from '../../interfaces/evento';

@Component({
  selector: 'page-participantes-evento',
  templateUrl: 'participantes-evento.html',
})
export class ParticipantesEventoPage {

  idEvento: number;
  nomeEvento: string;
  localEvento: string;
  dataEvento: string;
  idParticipantes: Array<number>;

  participantesEvento: Array<Participante>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public participantesProvider: ParticipantesProvider,
    public eventosProvider: EventosProvider) {

    this.idEvento = navParams.get('id');

    let eventos: Array<Evento> = eventosProvider.getEventos();
    let participantes: Array<Participante> = participantesProvider.getParticipantes();

    for (let i=0; i<eventos.length; i++) {
      if(eventos[i].id == this.idEvento) {
        this.nomeEvento = eventos[i].nome;
        this.localEvento = eventos[i].local;
        let d = eventos[i].data;
        this.dataEvento = d.getFullYear() + "-" +
                        ("0" + (d.getMonth()+1)).substr(-2,2) + "-" +
                        ("0" + d.getDate()).substr(-2,2);
        
        this.idParticipantes = eventos[i].idParticipantes;
        break;
      }
    }

    this.participantesEvento = [];
    for(let i=0; i<this.idParticipantes.length; i++) {
      for(let j=0; j<participantes.length; j++){
        if(participantes[j].id == this.idParticipantes[i]) {
          this.participantesEvento.push({
            id: participantes[j].id,
            nome: participantes[j].nome,
            contato: participantes[j].contato
          });
        }
      }
    }

  }

  novoParticipante() {

  }

  salvarParticipantes() {

  }

}
