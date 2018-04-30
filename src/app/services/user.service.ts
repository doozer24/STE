import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  constructor(private http: Http) { }

  async login(username: string, password: string): Promise<any> {
    const that = this;
    const headers = new Headers();
    return new Promise(function(resolve) {
      that.http.post(environment.userRoute + '/login', { userName: username, password: password}, {headers: headers})
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
