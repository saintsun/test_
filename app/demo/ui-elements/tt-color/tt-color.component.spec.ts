import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TtColorComponent } from './tt-color.component';

describe('TtColorComponent', () => {
  let component: TtColorComponent;
  let fixture: ComponentFixture<TtColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TtColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TtColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
