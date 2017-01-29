import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User, PersistedUser } from 'supplyworks';

@Injectable()
export class UserService {
  
  private APIUrl: string = '/api/school/users/'

  constructor(private http: Http) { }

  getUsers(): Promise<User[]> {
    return this.http.get(this.APIUrl)
      .toPromise()
      .then(resp => resp.json().data as User[])
      .catch(err => this.errorHandler(err));
  }

  createUser(newuser: User): Promise<User> {
    return this.http.post(this.APIUrl, newuser)
      .toPromise()
      .then(resp => resp.json().data as User)
      .catch(err => this.errorHandler(err))
  }

  deleteUser(user: User): Promise<boolean> {
    let u = <PersistedUser>user;
    return this.http.delete( this.APIUrl + u._id )
      .toPromise()
      .then( resp => { if(resp.json().data === u._id) return true; } )
      .catch( err => this.errorHandler(err) );
  }

  editUser(user: User): Promise<User> {
    var u = <PersistedUser>user;
    return this.http.put( this.APIUrl + u._id, u )
      .toPromise()
      .then( resp => resp.json().data as User)
      .catch( err => this.errorHandler(err) );
  }

  private errorHandler(err: any): Promise<any> {
    console.error('Error in UserService: ', err);
    return Promise.reject(err.message || err);
  }
}
