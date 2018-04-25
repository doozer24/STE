import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTimeCardComponent } from './create-time-card.component';

describe('CreateTimeCardComponent', () => {
  let component: CreateTimeCardComponent;
  let fixture: ComponentFixture<CreateTimeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTimeCardComponent ]
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
