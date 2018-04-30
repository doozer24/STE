import { Injectable } from '@angular/core';
import { Project, Task } from '../models/project';
import { Http } from '@angular/http';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';

@Injectable()
export class ProjectService {
<<<<<<< HEAD

  port = 'http://localhost:8090';
  //port = 'http://sevis-challenge-back-project:8080';
=======
>>>>>>> master

  constructor(private http: Http) { }

  async getUsersProjects(userId) {
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
