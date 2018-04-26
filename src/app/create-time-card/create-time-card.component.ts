import { Component, OnInit } from '@angular/core';
import { TimeCardService } from '../services/time-card.service';
import { Router } from '@angular/router';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-create-time-card',
  templateUrl: './create-time-card.component.html',
  styleUrls: ['./create-time-card.component.css']
})
export class CreateTimeCardComponent implements OnInit {
  dateRanges;
  selectedDateRange;
  userTimeCards;
  constructor(private timeCardService: TimeCardService,
      private projectService: ProjectService,
     private router: Router) { }

  ngOnInit() {
    this.userTimeCards = this.timeCardService.getActiveTimeCardsForUser("userId");
    this.setDateRanges();
  }

  async onSubmit() {
    const timeCard = await this.timeCardService.createTimeCard(this.selectedDateRange.startDate,
      this.selectedDateRange.endDate);
    this.router.navigate(['time-card/' + timeCard.id]);
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
