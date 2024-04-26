import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimeComponent } from './add-time.component';

describe('AddTimeComponent', () => {
  let component: AddTimeComponent;
  let fixture: ComponentFixture<AddTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTimeComponent]
    });
    fixture = TestBed.createComponent(AddTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
