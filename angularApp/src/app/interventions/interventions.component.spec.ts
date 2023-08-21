import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionsComponent } from './interventions.component';

describe('InterventionsComponent', () => {
  let component: InterventionsComponent;
  let fixture: ComponentFixture<InterventionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterventionsComponent]
    });
    fixture = TestBed.createComponent(InterventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
