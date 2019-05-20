import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TtCardsComponent } from './tt-cards.component';

describe('TtCardsComponent', () => {
  let component: TtCardsComponent;
  let fixture: ComponentFixture<TtCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TtCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TtCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
