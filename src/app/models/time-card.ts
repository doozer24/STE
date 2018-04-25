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
