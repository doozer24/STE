import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  user: User;

  constructor(private http: Http) { }

  async login(username: string, password: string): Promise<any> {
    const that = this;
    const headers = new Headers();
    return new Promise(function(resolve) {
      that.http.post(environment.userRoute + '/login', { userName: username, password: password}, {headers: headers})
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

  getAllUsers(): any {
    const that = this;
    return new Promise(resolve => {
      that.http.get(environment.userRoute + '/list')
        .map(res => res.json())
        .subscribe(data => {
            resolve({data: data, error: null});
          },
          error => {
            resolve({data: null, error: error});
          }
        );
    });
  }

  updateUserStatus(user, isActive): any {
    const that = this;
    user.isActive = isActive;
    return new Promise(resolve => {
      that.http.get(environment.userRoute + '/updateStatus/', user)
        .map(res => res.json())
        .subscribe(data => {
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

  isLoggedIn() {
    this.user = JSON.parse(localStorage.getItem('timeAndAdminUser'));
  }

  getUser(userId) {
    return new User('jd', 'John', 'Doe');
  }

}
