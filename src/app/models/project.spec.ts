import { Project } from './project.js';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';


describe('Project', () => {
  let component: Project;
  let fixture: ComponentFixture<Project>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Project ],
      imports: [],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Project);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
