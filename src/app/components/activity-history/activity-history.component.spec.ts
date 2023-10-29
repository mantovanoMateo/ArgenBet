import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityHistoryComponent } from './activity-history.component';

describe('ActivityHistoryComponent', () => {
  let component: ActivityHistoryComponent;
  let fixture: ComponentFixture<ActivityHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityHistoryComponent]
    });
    fixture = TestBed.createComponent(ActivityHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
