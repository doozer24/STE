import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TimeCardComponent } from './time-card.component';
import { TimeCardService } from '../services/time-card.service';
import { ProjectService } from '../services/project.service';

describe('TimeCardComponent', () => {
  let component: TimeCardComponent;
  let fixture: ComponentFixture<TimeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeCardComponent ],
      imports: [RouterTestingModule],
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
});
