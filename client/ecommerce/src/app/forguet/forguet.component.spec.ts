import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForguetComponent } from './forguet.component';

describe('ForguetComponent', () => {
  let component: ForguetComponent;
  let fixture: ComponentFixture<ForguetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForguetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForguetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
