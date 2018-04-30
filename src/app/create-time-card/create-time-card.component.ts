import { Component, OnInit } from '@angular/core';
import { TimeCardService } from '../services/time-card.service';
import { Router } from '@angular/router';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';
import * as _ from 'lodash';
import { TimeCard } from '../models/time-card';
import { User } from '../models/user';

@Component({
  selector: 'app-create-time-card',
  templateUrl: './create-time-card.component.html',
  styleUrls: ['./create-time-card.component.css']
})
export class CreateTimeCardComponent implements OnInit {
  dateRanges;
  selectedDateRange;
  userTimeCards;
  user: User;
  constructor(private timeCardService: TimeCardService,
      private projectService: ProjectService,
     private router: Router) { }

  ngOnInit() {
    const that = this;
    this.user = JSON.parse(localStorage.getItem('timeAndAdminUser'));
    this.timeCardService.getActiveTimeCardsForUser(this.user.loginId).then(function(timeCards) {
      that.userTimeCards = timeCards.data;
      that.setDateRanges();
    });
  }

  async onSubmit(): Promise<any> {
    const that = this;
    if (!this.selectedDateRange) { return null; }
    this.timeCardService.createTimeCard(this.selectedDateRange.startDate,
      this.selectedDateRange.endDate, this.user.loginId).then(function(timeCard) {
        that.router.navigate(['time-card/' + timeCard.data.id]).catch();
      });
  }

  setDateRanges() {
    const that = this;
    const firstMonday = this.getFirstMonday();
    this.dateRanges = [
      {startDate: new Date(firstMonday), endDate: new Date(new Date(firstMonday).setDate(new Date(firstMonday).getDate() + 6))},
      {startDate: new Date(new Date(firstMonday).setDate(new Date(firstMonday).getDate() + 7)),
        endDate: new Date(new Date(firstMonday).setDate(new Date(firstMonday).getDate() + 13))},
      {startDate: new Date(new Date(firstMonday).setDate(new Date(firstMonday).getDate() + 14)),
        endDate: new Date(new Date(firstMonday).setDate(new Date(firstMonday).getDate() + 20))}
    ];
    _.remove(this.dateRanges, function(range) {
      return !!_.find(that.userTimeCards, function(timeCard) {
        return timeCard.startDate.getTime() === range.startDate.getTime();
      });
    });
  }

  getFirstMonday() {
      const date = new Date();
      const day = date.getDay();
      let firstMonday;
      if (date.getDay() === 0) {
          firstMonday = new Date().setDate(date.getDate() - 13);
      } else {
          firstMonday = new Date().setDate(date.getDate() - day - 13);
      }
      return new Date(firstMonday).setHours(0, 0, 0, 0);
  }

  getFormattedDate(date) {
    return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
  }

  getDateRange(dateRange) {
    return this.getFormattedDate(dateRange.startDate) + ' - ' + this.getFormattedDate(dateRange.endDate);
  }

}
