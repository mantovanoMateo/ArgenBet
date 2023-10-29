import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmComponent } from './atm.component';

describe('AtmComponent', () => {
  let component: AtmComponent;
  let fixture: ComponentFixture<AtmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtmComponent]
    });
    fixture = TestBed.createComponent(AtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
