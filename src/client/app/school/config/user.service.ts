import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Teacher } from 'supplyworks';

@Injectable()
export class UserService {
  
  private APIUrl: string = '/api/school/users'

  constructor(private http: Http) { }

  getTeachers(): Promise<Teacher[]> {
    return this.http.get(this.APIUrl + '/staff')
      .toPromise()
      .then(resp => resp.json().data as Teacher[])
      .catch(err => this.errorHandler(err));
  }

  createUser(newuser: Teacher): Promise<Teacher> {
    return this.http.post(this.APIUrl + '/staff', newuser)
      .toPromise()
      .then(resp => resp.json().data as Teacher)
      .catch(err => this.errorHandler(err))
  }

  private errorHandler(err: any): Promise<any> {
    console.error('Error in UserService: ', err);
    return Promise.reject(err.message || err);
  }
}
