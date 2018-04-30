import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeCardService } from '../services/time-card.service';
import { TimeCard, Time } from '../models/time-card';
import { Project, Task } from '../models/project';
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
  dialogDisplay = false;
  deleteDialogDisplay = false;
  currentEditedTime: Time;
  currentEditedTimeError = '';
  newRowProjectId;
  newRowTaskId;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private timeCardService: TimeCardService,
    private projectService: ProjectService) { }

  async ngOnInit() {
    const that = this;
    this.timeCardId = this.route.snapshot.params.id;
    this.timeCardService.getTimeCard(this.timeCardId).then(function(timeCard) {
      that.timeCard = timeCard.data ;
      that.timeCardDates = that.getDates(that.timeCard.startDate, that.timeCard.endDate);
      that.projectService.getAllProjects().then(function(projectResponse) {
        that.usersProjects = projectResponse.data as Array<Project>;
      });
    });
  }

  getDates(startDate, stopDate) {
    const dateArray = new Array();
    let currentDate = new Date(startDate);
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
    if (!date) { return null; }
    return this.getDateShort(date) + '/' + date.getFullYear();
  }

  getUniqueProjectAndTask() {
    if (!this.timeCard) { return null; }
    return _.uniqBy(this.timeCard.time, function(time) {
      return [time.projectId, time.taskId].join();
    });
  }

  getProjectTasksWithoutTime(projectId) {
    const that = this;
    const project = this.getProjectById(projectId);
    if (!project) { return null; }
    return _.filter(project.tasks, function(task) {
      return !_.find(that.timeCard.time, function(time) {
        return time.projectId === projectId && time.taskId === task.id;
      });
    });
  }

  getProjectById(projectId) {
    return _.find(this.usersProjects, function(project) {
      return project.id === projectId;
    });
  }

  getTask(projectId, taskId) {
    const project = this.getProjectById(projectId);
    if (!project) { return null; }
    return _.find(project.tasks, function(task) {
      return task.id === taskId;
    });
  }

  getTotalProjectHours(projectId: number, taskId: number) {
    if (!this.timeCard) { return 0; }
    let totalHours = 0;
    _.each(this.timeCard.time, function(time) {
      if (time.projectId === projectId && time.taskId === taskId) {
        totalHours += time.hours;
      }
    });
    return totalHours;
  }

  getTimeForProjectAndDate(projectId: number, taskId: number, date: Date) {
    if (!this.timeCard) { return null; }
    return _.find(this.timeCard.time, function(time) {
      return time.projectId === projectId && time.taskId === taskId && time.date.getTime() === date.getTime();
    });
  }

  getHoursForProjectTaskAndDate(projectId: number, taskId: number, date: Date) {
    const tfpd =  this.getTimeForProjectAndDate(projectId, taskId, date);
    return tfpd ? tfpd.hours : 0;
  }

  getTotalHoursForDate(date) {
    let totalHours = 0;
    _.each(this.timeCard.time, function(time) {
      if (time.date.getTime() === date.getTime()) {
        totalHours += time.hours;
      }
    });
    return totalHours;
  }


  async save() {
    const that = this;
    this.timeCardService.saveTimeCard(this.timeCard).then(function(response) {
      that.router.navigate(['/']);
    });
  }

  async submitTimeCard() {
    this.timeCard.status = 'SUBMITTED';
    await this.timeCardService.saveTimeCard(this.timeCard);
    this.router.navigate(['/']);
  }

  saveTimeEntry() {
    const that = this;
    const existingEntry = _.find(this.timeCard.time, function(t) {
      return t.projectId === that.currentEditedTime.projectId && t.taskId === that.currentEditedTime.taskId
      && t.date.getTime() === that.currentEditedTime.date.getTime();
    });
    if (!existingEntry) {
      this.timeCard.time.push(this.currentEditedTime);
    }
    if (this.currentEditedTime.projectId === this.newRowProjectId
        && this.currentEditedTime.taskId === this.newRowTaskId) {
      this.newRowProjectId = null;
      this.newRowTaskId = null;
    }
    this.currentEditedTime = null;
    this.dialogDisplay = false;
  }

  cancelTimeEntry() {
    this.currentEditedTime = null;
    this.dialogDisplay = false;
  }

  modifyTimeEntry(projectId, taskId, date) {
    this.currentEditedTime = _.find(this.timeCard.time, function(t) {
      return t.projectId === projectId &&  t.taskId === taskId && t.date.getTime() === date.getTime();
    });
    if (!this.currentEditedTime) {
      this.currentEditedTime = new Time(date, null, taskId, projectId);
    }
    this.dialogDisplay = true;
  }

  async deleteTimeCard() {
    await this.timeCardService.deleteTimeCard(this.timeCardId);
    this.router.navigate(['/']);
  }

  onProjectChange() {
    this.newRowProjectId = parseInt(this.newRowProjectId)
  }

  onTaskChange() {
    this.newRowTaskId = parseInt(this.newRowTaskId)
  }

  onEditedTimeChange() {
    if (this.currentEditedTime.hours < 0 || this.currentEditedTime.hours > 24) {
      this.currentEditedTimeError = 'Please enter a valid number of hours.';
    } else if (this.currentEditedTime.hours % 1 !== 0
                && this.currentEditedTime.hours % 1 !== .25
                && this.currentEditedTime.hours % 1 !== .5
                && this.currentEditedTime.hours % 1 !== .75) {
      this.currentEditedTimeError = 'Only quarter hours are allowed in time entry.';
    } else {
      this.currentEditedTimeError = '';
    }
  }
}
