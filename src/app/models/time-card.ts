import * as _ from 'lodash';

export class TimeCard {
  id: number;
  employeeId: number;
  startDate: Date;
  endDate: Date;
  status: string;
  times: Array<Time>;

  constructor(employeeId: number, startDate: Date, endDate: Date, status: string, times: Array<Time>) {
    this.employeeId = employeeId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.times = times;
  }

  getTotalHours() {
    let totalHours = 0;
    _.each(this.times, function(time) {
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
