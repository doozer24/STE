import { Project } from './project.js';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Task} from './project';


describe('Project', () => {
  it('creatable', () => {

    const projectOne = new Project('Project 1', new Date(2018, 1, 1), 'Type 1', 1, [
      new Task('Task 1', 'Charge Code 1', 'Category 1', 10, 1),
      new Task('Task 2', 'Charge Code 1', 'Category 1', 20, 2)
    ]);
    expect(projectOne.name).toEqual('Project 1');

  });
});
