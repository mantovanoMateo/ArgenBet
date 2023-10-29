import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetFixtureComponent } from './bet-fixture.component';

describe('BetFixtureComponent', () => {
  let component: BetFixtureComponent;
  let fixture: ComponentFixture<BetFixtureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BetFixtureComponent]
    });
    fixture = TestBed.createComponent(BetFixtureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
