import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDataComponent } from './my-data.component';

describe('MyDataComponent', () => {
  let component: MyDataComponent;
  let fixture: ComponentFixture<MyDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyDataComponent]
    });
    fixture = TestBed.createComponent(MyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
