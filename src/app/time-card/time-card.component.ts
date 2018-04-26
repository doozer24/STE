import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimeCardService } from '../services/time-card.service';
import { TimeCard } from '../models/time-card';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-time-card',
  templateUrl: './time-card.component.html',
  styleUrls: ['./time-card.component.css']
})
export class TimeCardComponent implements OnInit {
  timeCardId: number;
  timeCard: TimeCard;
  usersProjects: Array<Project>;
  timeCardDates: Array<Date>;
  constructor(private route: ActivatedRoute,
    private timeCardService: TimeCardService,
    private projectService: ProjectService) { }

  async ngOnInit() {
    this.timeCardId = this.route.snapshot.params.id;
    this.timeCard = await this.timeCardService.getTimeCard(this.timeCardId);
    this.timeCardDates = this.getDates(this.timeCard.startDate, this.timeCard.endDate);
    this.usersProjects = await this.projectService.getUsersProjects('userId');
  }

  getDates(startDate, stopDate) {
    const dateArray = new Array();
    let currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate));
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }
    return dateArray;
  }

  getDateShort(date) {
    return (date.getMonth() + 1) + '/' + date.getDate();
  }

  getDateLong(date) {
    return this.getDateShort(date) + '/' + date.getFullYear();
  }

  getActiveProjects() {
    if (!this.timeCard) { return null; }
    const projectIds = _.uniq(_.map(this.timeCard.times, 'projectId'));
    return _.filter(this.usersProjects, function(project) {
      return projectIds.includes(project.id);
    });
  }

  getTotalProjectHours(projectId: number) {
    if (!this.timeCard) { return 0; }
    let totalHours = 0;
    _.each(this.timeCard.times, function(time) {
      if (time.projectId === projectId) {
        totalHours += time.hours;
      }
    });
    return totalHours;
  }

  getTimeForProjectAndDate(projectId: number, date: Date) {
    if (!this.timeCard) { return null; }
    return _.find(this.timeCard.times, function(time) {
      return time.projectId === projectId && time.date.getTime() === date.getTime();
    });
  }

  getHoursForProjectAndDate(projectId: number, date: Date) {
    const tfpd =  this.getTimeForProjectAndDate(projectId, date);
    return tfpd ? tfpd.hours : 0;
  }

  getTotalHoursForDate(date) {
    let totalHours = 0;
    _.each(this.timeCard.times, function(time) {
      if (time.date.getTime() === date.getTime()) {
        totalHours += time.hours;
      }
    });
    return totalHours;
  }

  getUserProjectsWithoutTime() {
    const activeProjects = this.getActiveProjects();
    return _.filter(this.usersProjects, function(project) {
      return !activeProjects.includes(project);
    });
  }

  save() {

  }

}
