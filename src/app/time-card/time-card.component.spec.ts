import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TimeCardComponent } from './time-card.component';
import { TimeCardService } from '../services/time-card.service';
import { ProjectService } from '../services/project.service';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { TimeCard, Time } from '../models/time-card';
import { timeout } from 'q';

describe('TimeCardComponent', () => {
  let component: TimeCardComponent;
  let fixture: ComponentFixture<TimeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeCardComponent ],
      imports: [RouterTestingModule, FormsModule, DialogModule, BrowserAnimationsModule, HttpModule],
      providers: [TimeCardService, ProjectService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show new task row if status is IN PROGRESS', () => {
    component.timeCard = new TimeCard(0, 0, new Date(), new Date(), 'IN PROGRESS');
    expect(component.showNewTaskRow()).toBeTruthy();
  });

  it('should not show new task row if status is not IN PROGRESS', () => {
    component.timeCard = new TimeCard(0, 0, new Date(), new Date(), 'SUBMITTED');
    expect(component.showNewTaskRow()).toBeFalsy();
  });


  it('should not allow time entry to be more than 16 hours per day', () => {
    component.currentEditedTime = new Time(new Date(2018,1,1), 10, 1234, 1234);
    component.timeCard = new TimeCard(0, 0, new Date(), new Date(), 'SUBMITTED', 
    [new Time(new Date(2018,1,1), 10, 1234, 1234), new Time(new Date(2018,1,1), 10, 1236, 1236)]);
    component.onEditedTimeChange();
    expect(component.currentEditedTimeError).toEqual('This is over the limit of 16 hours per day');
  });

  it('should not allow value which is not in .25 increments', () => {
    component.currentEditedTime = new Time(new Date(2018,1,1), 4.3, 1234, 1234);
    component.timeCard = new TimeCard(0, 0, new Date(), new Date(), 'SUBMITTED', 
    [new Time(new Date(2018,1,1), 1, 1234, 1234), new Time(new Date(2018,1,1), 1, 1236, 1236)]);
    component.onEditedTimeChange();
    expect(component.currentEditedTimeError).toEqual('Only quarter hours are allowed in time entry.');
  });

  it('should not allow less than 0', () => {
    component.currentEditedTime = new Time(new Date(2018,1,1), -1, 1234, 1234);
    component.timeCard = new TimeCard(0, 0, new Date(), new Date(), 'SUBMITTED', 
    [new Time(new Date(2018,1,1), 1, 1234, 1234), new Time(new Date(2018,1,1), 1, 1236, 1236)]);
    component.onEditedTimeChange();
    expect(component.currentEditedTimeError).toEqual('Please enter a valid number of hours.');
  });

});

// @Component({
//   selector: 'p-dialog',
//   template: ''
// })
// class PDialogComponent {
// }
