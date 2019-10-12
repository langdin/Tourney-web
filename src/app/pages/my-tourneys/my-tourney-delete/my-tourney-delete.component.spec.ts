import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTourneyDeleteComponent } from './my-tourney-delete.component';

describe('MyTourneyDeleteComponent', () => {
  let component: MyTourneyDeleteComponent;
  let fixture: ComponentFixture<MyTourneyDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTourneyDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTourneyDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
