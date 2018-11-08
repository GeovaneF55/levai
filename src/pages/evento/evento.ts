import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EventosProvider } from '../../providers/eventos/eventos';
import { Evento } from '../../interfaces/evento';

@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html',
})
export class EventoPage {

  idEvento: string;
  nomeEvento: string;
  localEvento: string;
  dataEvento: string;
  contatoEvento: string;
  observacoesEvento: string;
  participantesEvento: Array<string>;
  itensEvento: Array<string>;

  novo: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public eventosProvider: EventosProvider) {
    
    this.idEvento = navParams.get('id');
    this.novo = navParams.get('novo');

    if (!this.novo) {
      this.eventosProvider.getEvento(this.idEvento).then(dados => {
        let evento: Evento = dados;

        this.nomeEvento = evento.nome;
        this.localEvento = evento.local;
        let d = evento.data;
        this.dataEvento = d.getFullYear() + "-" +
                    ("0" + (d.getMonth()+1)).substr(-2,2) + "-" +
                    ("0" + d.getDate()).substr(-2,2);
        this.contatoEvento = evento.contato;
        this.observacoesEvento = evento.observacoes;
        this.participantesEvento = evento.idParticipantes;
        this.itensEvento = evento.idItens;
      });
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
      this.itensEvento = [];
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
      this.participantesEvento,
      this.itensEvento
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
      this.participantesEvento,
      this.itensEvento
    );
    this.navCtrl.pop();
  }
}
