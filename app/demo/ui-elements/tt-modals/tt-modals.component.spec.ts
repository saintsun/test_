import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TtModalsComponent } from './tt-modals.component';

describe('TtModalsComponent', () => {
  let component: TtModalsComponent;
  let fixture: ComponentFixture<TtModalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TtModalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TtModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
