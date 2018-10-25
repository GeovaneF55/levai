import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ItensProvider {

  constructor(public http: Http) {
    console.log('Hello ItensProvider Provider');
  }

}
