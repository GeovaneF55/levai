import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EventosProvider } from '../../providers/eventos/eventos';

@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html',
})
export class EventoPage {

  idEvento: number;
  nomeEvento: string;
  localEvento: string;
  dataEvento: string;
  contatoEvento: string;
  observacoesEvento: string;
  participantesEvento: Array<number>;

  novo: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public eventosProvider: EventosProvider) {
    
    this.idEvento = navParams.get('id');
    this.novo = navParams.get('novo');

    if (!this.novo) {
      let eventos = eventosProvider.getEventos();
      for (let i=0; i<eventos.length; i++) {
        if (eventos[i].id == this.idEvento) {
          this.nomeEvento = eventos[i].nome;
          this.localEvento = eventos[i].local;
          let d = eventos[i].data;
          this.dataEvento = d.getFullYear() + "-" +
                      ("0" + (d.getMonth()+1)).substr(-2,2) + "-" +
                      ("0" + d.getDate()).substr(-2,2);
          this.contatoEvento = eventos[i].contato;
          this.observacoesEvento = eventos[i].observacoes;
          this.participantesEvento = eventos[i].idParticipantes;
          break;
        }
      }
    } else {
      this.nomeEvento = "";
      this.localEvento = "";
      let d = new Date();
      this.dataEvento = d.getFullYear() + "-" +
                  ("0" + (d.getMonth()+1)).substr(-2,2) + "-" +
                  ("0" + d.getDate()).substr(-2,2);
      this.contatoEvento = "";
      this.observacoesEvento = "";
      this.participantesEvento = [];
    }
  }

  incluir() {
    let d = new Date(
      parseInt(this.dataEvento.substr(0,4)),
      parseInt(this.dataEvento.substr(5,2))-1,
      parseInt(this.dataEvento.substr(8,2)));

    this.eventosProvider.adicionaEvento(
      this.nomeEvento,
      this.localEvento,
      d,
      this.contatoEvento,
      this.observacoesEvento,
      this.participantesEvento
    );
    this.navCtrl.pop();
  }

  alterar() {
    let d = new Date(
      parseInt(this.dataEvento.substr(0,4)),
      parseInt(this.dataEvento.substr(5,2))-1,
      parseInt(this.dataEvento.substr(8,2)));

    this.eventosProvider.editaEvento(
      this.idEvento,
      this.nomeEvento,
      this.localEvento,
      d,
      this.contatoEvento,
      this.observacoesEvento,
      this.participantesEvento
    );
    this.navCtrl.pop();
  }
}
