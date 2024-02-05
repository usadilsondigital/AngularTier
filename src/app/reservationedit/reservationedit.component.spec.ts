import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationeditComponent } from './reservationedit.component';

describe('ReservationeditComponent', () => {
  let component: ReservationeditComponent;
  let fixture: ComponentFixture<ReservationeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
