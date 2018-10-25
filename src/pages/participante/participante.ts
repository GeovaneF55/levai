import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ParticipantesProvider } from '../../providers/participantes/participantes';

@Component({
  selector: 'page-participante',
  templateUrl: 'participante.html',
})
export class ParticipantePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public participantesProvider: ParticipantesProvider) {
      
  }

}
