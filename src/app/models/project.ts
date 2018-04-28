export class Project {
  id: number;
  name: string;
  startDate: Date;
  type: string;
  managerId: number;
  tasks: Array<Task>;

  constructor(name: string, startDate: Date, type: string, managerId: number, tasks: Array<Task>){
    this.name = name;
    this.startDate = startDate;
    this.type = type;
    this.managerId = managerId;
    this.tasks = tasks;
  }
}

export class Task {
  id: number;
  name: string;
  chargeCode: string;
  category: string;
  rate: number;

  constructor(name: string, chargeCode: string, category: string, rate: number, id: number = null) {
    this.name = name;
    this.chargeCode = chargeCode;
    this.category = category;
    this.rate = rate;
    this.id = id;
  }
}


