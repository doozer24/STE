import { Injectable } from '@angular/core';
import { Project, Task } from '../models/project';

@Injectable()
export class ProjectService {

  constructor() { }

  getUsersProjects(userId) {
    const projects = [new Project('Project 1', new Date(2018, 1, 1), 'Type 1', 1, [
      new Task('Task 1', 'Charge Code 1', 'Category 1', 10),
      new Task('Task 2', 'Charge Code 1', 'Category 1', 20)
    ])];
    projects[0].id = 1;
    return projects;
  }

}
