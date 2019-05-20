import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TtIconsComponent } from './tt-icons.component';

describe('TtIconsComponent', () => {
  let component: TtIconsComponent;
  let fixture: ComponentFixture<TtIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TtIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TtIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
