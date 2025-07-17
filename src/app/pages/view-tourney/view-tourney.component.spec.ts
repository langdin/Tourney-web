import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTourneyComponent } from './view-tourney.component';

describe('ViewTourneyComponent', () => {
  let component: ViewTourneyComponent;
  let fixture: ComponentFixture<ViewTourneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTourneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
