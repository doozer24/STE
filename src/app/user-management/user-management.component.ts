///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit } from '@angular/core';
import { TimeCardService } from '../services/time-card.service';
import { Router } from '@angular/router';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';
import * as _ from 'lodash';
import { TimeCard } from '../models/time-card';
import { User } from '../models/user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  allUsers: {};
  user: User;
  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    const that = this;
    this.user = JSON.parse(localStorage.getItem('timeAndAdminUser'));
    this.allUsers = this.userService.getAllUsers();
    /*
    this.timeCardService.getActiveTimeCardsForUser(this.user.loginId).then(function(timeCards) {
      that.userTimeCards = timeCards.data;
      that.setDateRanges();
    });
     */
  }

  async onSubmit(): Promise<any> {
    const that = this;
    /*
    if (!this.selectedDateRange) { return null; }
    this.timeCardService.createTimeCard(this.selectedDateRange.startDate,
      this.selectedDateRange.endDate, this.user.loginId).then(function(timeCard) {
      that.router.navigate(['time-card/' + timeCard.data.id]).catch();
    });
    */
  }

}
