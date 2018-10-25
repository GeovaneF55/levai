import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EventosProvider {

  constructor(public http: Http) {
    console.log('Hello EventosProvider Provider');
  }

}
