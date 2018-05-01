import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewContainerRef } from '@angular/core';
import { MainComponent } from './main.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent, MockRouterOutletComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should properly identify admin user as admin', () => {
    localStorage.setItem('timeAndAdminUser', JSON.stringify({loginId: 'admin'}));
    expect(component.currentUserIsAdmin()).toBeTruthy();
  });

  it('should properly identify a random user as not admin', () => {
    localStorage.setItem('timeAndAdminUser', JSON.stringify({loginId: 'random'}));
    expect(component.currentUserIsAdmin()).toBeFalsy();
  });

@Component({
  selector: 'router-outlet',
  template: ''
})
class MockRouterOutletComponent {
}
});
