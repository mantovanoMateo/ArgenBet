import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefautlMenuComponent } from './defautl-menu.component';

describe('DefautlMenuComponent', () => {
  let component: DefautlMenuComponent;
  let fixture: ComponentFixture<DefautlMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefautlMenuComponent]
    });
    fixture = TestBed.createComponent(DefautlMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
