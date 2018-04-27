import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CreateTimeCardComponent } from './create-time-card.component';
import { TimeCardService } from '../services/time-card.service';
import { ProjectService } from '../services/project.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

describe('CreateTimeCardComponent', () => {
  let component: CreateTimeCardComponent;
  let fixture: ComponentFixture<CreateTimeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpModule],
      declarations: [ CreateTimeCardComponent ],
      providers: [TimeCardService, ProjectService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTimeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
