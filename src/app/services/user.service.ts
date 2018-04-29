import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../models/user';

@Injectable()
export class UserService {
  port = 'http://localhost:8080';
  constructor(private http: Http) { }

  async login(username: string, password: string): Promise<any> {
    const that = this;
    const headers = new Headers();
    return new Promise(function(resolve) {
      that.http.post(that.port + '/user/login', { userName: username, password: password}, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
          localStorage.setItem('timeAndAdminUser', JSON.stringify({loginId: username}));
          resolve({data: data, error: null});
        },
        error => {
          resolve({data: null, error: error});
        }
      );
    });
  }

  logout() {
    localStorage.removeItem('timeAndAdminUser');
  }

  getUser(userId) {
    return new User('John', 'Doe');
  }

}
