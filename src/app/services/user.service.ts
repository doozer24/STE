import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  async login(username: string, password: string) {
    // return this.http.post<any>('/api/authenticate', { username: username, password: password })
    //   .map(user => {
    //       if (user && user.token) {
    //         localStorage.setItem('timeAndAdminUser', JSON.stringify(user));
    //       }
    //       return user;
    //   });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

}
