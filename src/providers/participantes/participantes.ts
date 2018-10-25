import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ParticipantesProvider {

  constructor(public http: Http) {
    console.log('Hello ParticipantesProvider Provider');
  }

}
