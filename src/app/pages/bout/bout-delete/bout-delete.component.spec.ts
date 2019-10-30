import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutDeleteComponent } from './bout-delete.component';

describe('BoutDeleteComponent', () => {
  let component: BoutDeleteComponent;
  let fixture: ComponentFixture<BoutDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoutDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoutDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
