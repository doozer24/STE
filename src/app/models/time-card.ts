import * as _ from 'lodash';

export class TimeCard {
  id: number;
  employee: number;
  startDate: Date;
  endDate: Date;
  status: string;
  time: Array<Time>;

  constructor(id, employee: number, startDate: Date, endDate: Date, status: string = null, time: Array<Time> = []) {
    this.id = id;
    this.employee = employee;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.time = time;
  }

  getTotalHours() {
    let totalHours = 0;
    _.each(this.time, function(time) {
      totalHours += time.hours;
    });
    return totalHours;
  }

  getDateShort(date) {
    return (date.getMonth() + 1) + '/' + date.getDate();
  }

  getDateLong(date) {
    return this.getDateShort(date) + '/' + date.getFullYear();
  }

  getDateRange() {
    return this.getDateLong(this.startDate) + ' - ' + this.getDateLong(this.endDate);
  }
}

export class Time {
  date: Date;
  hours: number;
  taskId: number;
  projectId: number;

  constructor(date: Date, hours: number, taskId: number, projectId: number) {
    this.date = date;
    this.hours = hours;
    this.taskId = taskId;
    this.projectId = projectId;
  }
}
