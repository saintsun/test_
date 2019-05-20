import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyTeknikComponent } from './thyteknik.component';

describe('ThyTeknikComponent', () => {
  let component: ThyTeknikComponent;
  let fixture: ComponentFixture<ThyTeknikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyTeknikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyTeknikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
