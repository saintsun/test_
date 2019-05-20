import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TtButtonsComponent } from './tt-buttons.component';

describe('TtButtonsComponent', () => {
  let component: TtButtonsComponent;
  let fixture: ComponentFixture<TtButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TtButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TtButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
