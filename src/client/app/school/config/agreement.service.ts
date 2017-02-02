import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Agreement } from 'supplyworks';

@Injectable()
export class AgreementService {

  private APIUrl = '/api/school/agreements/';

  constructor( private http: Http ) { }

  getAgreements(): Promise<Agreement[]> {
    return this.http.get( this.APIUrl )
      .toPromise()
      .then( resp => { if( resp != null ) return resp.json().data as Agreement[] } )
      .catch( err => this.errorHandler(err) );
  }

  errorHandler(err: any): Promise<any> {
    console.error('Error in AgreementService:', err);
    return Promise.reject(err.message || err);
  }
}