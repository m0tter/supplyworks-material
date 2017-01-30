import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Agreement } from 'supplyworks';

@Injectable()
export class AgreementService {

  private APIUrl = '/api/school/agreement/';

  constructor( private http: Http ) { }

  getAgreements(): Promise<Agreement[]> {
    return this.http.get(this.APIUrl)
      .toPromise()
      .then(resp => resp.json().data as Agreement[])
      .catch(err => this.errorHandler(err));
  }

  errorHandler(err: any): Promise<any> {
    console.error('Error in AgreementService:', err);
    return Promise.reject(err.message || err);
  }
}