import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TimeCardService } from '../services/time-card.service';
import { HttpModule } from '@angular/http';
import { UserService } from '../services/user.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [ TimeCardService, UserService ],
      imports: [HttpModule, RouterTestingModule]
    })
    .compileComponents();
    localStorage.setItem('timeAndAdminUser', JSON.stringify({loginId: 'dummy'}));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
