import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TtTreeViewComponent } from './tt-tree-view.component';

describe('TtTreeViewComponent', () => {
  let component: TtTreeViewComponent;
  let fixture: ComponentFixture<TtTreeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TtTreeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TtTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
