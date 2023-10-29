import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetFixtureListComponent } from './bet-fixture-list.component';

describe('BetFixtureListComponent', () => {
  let component: BetFixtureListComponent;
  let fixture: ComponentFixture<BetFixtureListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BetFixtureListComponent]
    });
    fixture = TestBed.createComponent(BetFixtureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
