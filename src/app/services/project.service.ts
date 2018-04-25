import { Injectable } from '@angular/core';
import { Project, Task } from '../models/project';

@Injectable()
export class ProjectService {

  constructor() { }

  getUsersProjects(userId) {
    const projects = [
      new Project('Project 1', new Date(2018, 1, 1), 'Type 1', 1, [
      new Task('Task 1', 'Charge Code 1', 'Category 1', 10),
      new Task('Task 2', 'Charge Code 1', 'Category 1', 20)
    ]),
      new Project('Project 2', new Date(2018, 1, 1), 'Type 1', 1, [
      new Task('Task 3', 'Charge Code 1', 'Category 1', 10),
      new Task('Task 4', 'Charge Code 1', 'Category 1', 20)
    ])
  ];
    projects[0].id = 1;
    projects[1].id = 2;
    return projects;
  }

}
