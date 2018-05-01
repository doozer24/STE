import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import * as _ from 'lodash';
@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  allUsers = [];
  user: User;
  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    const that = this;
    this.user = JSON.parse(localStorage.getItem('timeAndAdminUser'));
    this.userService.getAllUsers().then(function(response) {
      that.allUsers = response.data;
    });
  }

  updateStatus(user, status) {
    const that = this;
    this.userService.updateUserStatus(user, status).then(function(response) {
      if (response.data) {
        that.updateCurrentUsersWithUser(response.data);
      }
    });
  }

  updateCurrentUsersWithUser(userData) {
    _.each(this.allUsers, function(user) {
      if (user.loginId === userData.loginId) {
        user.isActive = userData.isActive;
      }
    });
  }

}
