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
import { TimeCard } from '../models/time-card';

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
});

// @Component({
//   selector: 'p-dialog',
//   template: ''
// })
// class PDialogComponent {
// }
