import { Injectable } from '@angular/core';
import { Project, Task } from '../models/project';
import { Http } from '@angular/http';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';

@Injectable()
export class ProjectService {

  constructor(private http: Http) { }

  async getUsersProjects(userId) {

    const projectOne = new Project('Project 1', new Date(2018, 1, 1), 'Type 1', 1, [
      new Task('Task 1', 'Charge Code 1', 'Category 1', 10, 1),
      new Task('Task 2', 'Charge Code 1', 'Category 1', 20, 2)
    ]);
    const projectTwo = new Project('Project 2', new Date(2018, 1, 1), 'Type 1', 1, [
      new Task('Task 3', 'Charge Code 1', 'Category 1', 10, 3),
      new Task('Task 4', 'Charge Code 1', 'Category 1', 20, 4)
    ]);
    projectOne.id = 1;
    projectTwo.id = 2;
    await this.createProject(projectOne);
    await this.createProject(projectTwo);
    return await this.getAllProjects();
  }

  async getAllProjects(): Promise<any> {
    const that = this;
    return new Promise(function(resolve) {
      that.http.get(environment.projectRoute)
      .map(res => res.json())
      .subscribe(data => {
          resolve({data: data, error: null});
        },
        error => {
          resolve({data: null, error: error});
        }
      );
    });
  }

  async createProject(project: Project) {
    const that = this;
    return new Promise(function(resolve) {
      that.http.post(environment.projectRoute + '/create', project)
      .map(res => res.json())
      .subscribe(data => {
          resolve({data: data, error: null});
        },
        error => {
          resolve({data: null, error: error});
        }
      );
    });
  }

}
