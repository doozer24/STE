import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../models/user';

@Injectable()
export class UserService {
  //port = 'http://localhost:8080';
  port = 'http://a65f8c1fc4a4411e885050aed1a33dd7-1442537821.us-east-1.elb.amazonaws.com:8080';
  constructor(private http: Http) { }

  async login(username: string, password: string): Promise<any> {
    const that = this;
    const headers = new Headers();
    return new Promise(function(resolve) {
      that.http.post(that.port + '/user/login', { userName: username, password: password}, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
          localStorage.setItem('timeAndAdminUserId', data.id);
          resolve({data: data, error: null});
        },
        error => {
          resolve({data: null, error: error});
        }
      );
    });
  }

  logout() {
    localStorage.removeItem('timeAndAdminUserId');
  }

  getUser(userId) {
    return new User('John', 'Doe');
  }

}
