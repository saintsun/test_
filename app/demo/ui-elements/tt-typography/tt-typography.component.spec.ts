import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TtTypographyComponent } from './tt-typography.component';

describe('TtTypographyComponent', () => {
  let component: TtTypographyComponent;
  let fixture: ComponentFixture<TtTypographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TtTypographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TtTypographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
