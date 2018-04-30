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
import { promise } from 'protractor';
import { TimeCard, Time } from '../models/time-card';

describe('TimeCardComponent', () => {
  let component: TimeCardComponent;
  let fixture: ComponentFixture<TimeCardComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeCardComponent ],
      imports: [RouterTestingModule, FormsModule, DialogModule, BrowserAnimationsModule, HttpModule],
      providers: [{provide: TimeCardService, useClass: MockTimeCardService}, ProjectService]
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

  it('get dates gets right amount of dates from array', () => {
    fixture = TestBed.createComponent(TimeCardComponent);
    component = fixture.componentInstance;
    const datesArray = component.getDates(new Date(2018, 1, 1), new Date(2018, 1, 7));
    expect(datesArray.length).toEqual(7);
  });

  it('correctly identifies unique project tasks', () => {
    fixture = TestBed.createComponent(TimeCardComponent);
    component = fixture.componentInstance;
    component.timeCard = new TimeCard(0, 0, new Date(), new Date(), '', [
      new Time(new Date(), 0, 1, 1),
      new Time(new Date(), 0, 1, 2),
      new Time(new Date(), 0, 1, 2),
      new Time(new Date(), 0, 2, 1),
      new Time(new Date(), 0, 2, 1),
    ]);
    const uniqueProjectAndTask = component.getUniqueProjectAndTask();
    expect(uniqueProjectAndTask.length).toEqual(3);
  });
});

export class MockTimeCardService {
  saveTimeCard() {
    return new Promise(function(resolve) {
      resolve(true);
    });
  }

  deleteTimeCard() {
    return true;
  }

  getTimeCard() {
    return new Promise(function(resolve) {
      return new TimeCard(1, 1, new Date(2017, 1, 1), new Date(2017, 1, 7), 'IN PROGRESS');
    });
  }
}
