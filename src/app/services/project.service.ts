import { Injectable } from '@angular/core';
import { Project, Task } from '../models/project';
import { Http } from '@angular/http';
import * as _ from 'lodash';

@Injectable()
export class ProjectService {
  port = 'http://localhost:8090';
  // port = 'sevis-challenge-back-project:8080';

  constructor(private http: Http) { }

  async getUsersProjects(userId) {
    return await this.getAllProjects();
  }

  async getAllProjects(): Promise<any> {
    const that = this;
    return new Promise(function(resolve) {
      that.http.get(that.port + '/project')
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
      that.http.post(that.port + '/project/create', project)
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
