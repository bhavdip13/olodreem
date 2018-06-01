import { Injectable, Inject } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { User } from '../models/index';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {
    myAppUrl: string = "";
    constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.myAppUrl = baseUrl;
    }
    getUsers() {
        return this._http.get(this.myAppUrl + 'api/User', this.jwt()).map((response: Response) => response.json());
    }
   
    getUserById(id: number) {
      return this._http.get(this.myAppUrl + "api/User/?id=" + id, this.jwt()).map((response: Response) => response.json());
    }
    saveUser(user: User) {
            return this._http.post(this.myAppUrl + '/api/User', user, this.jwt()).map((response: Response) => response.json());

    }
    create(user: User) {

      return this._http.post(this.myAppUrl + '/api/User', user, this.jwt()).map((response: Response) => response.json());
    }
    //update(user: User) {
    //    return this._http.put(this.myAppUrl + '/api/Users/Update' + user.id, driverinformation, this.jwt());
    //}

    deleteUser(id) {
      return this._http.delete(this.myAppUrl + "api/User/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }
    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }

    // private helper methods

    private jwt() {

        // create authorization header with jwt token

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser && currentUser.token) {

            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
