import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TtNotificationsComponent } from './tt-notifications.component';

describe('TtNotificationsComponent', () => {
  let component: TtNotificationsComponent;
  let fixture: ComponentFixture<TtNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TtNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TtNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
