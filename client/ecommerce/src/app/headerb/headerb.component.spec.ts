import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderbComponent } from './headerb.component';

describe('HeaderbComponent', () => {
  let component: HeaderbComponent;
  let fixture: ComponentFixture<HeaderbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
