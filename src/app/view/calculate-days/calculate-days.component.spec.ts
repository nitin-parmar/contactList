import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateDaysComponent } from './calculate-days.component';

describe('CalculateDaysComponent', () => {
  let component: CalculateDaysComponent;
  let fixture: ComponentFixture<CalculateDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculateDaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
