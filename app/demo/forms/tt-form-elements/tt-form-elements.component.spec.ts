import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TtFormElementsComponent } from './tt-form-elements.component';

describe('TtFormElementsComponent', () => {
  let component: TtFormElementsComponent;
  let fixture: ComponentFixture<TtFormElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TtFormElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TtFormElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
