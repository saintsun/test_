import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TtTabsAccordionsComponent } from './tt-tabs-accordions.component';

describe('TtTabsAccordionsComponent', () => {
  let component: TtTabsAccordionsComponent;
  let fixture: ComponentFixture<TtTabsAccordionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TtTabsAccordionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TtTabsAccordionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
