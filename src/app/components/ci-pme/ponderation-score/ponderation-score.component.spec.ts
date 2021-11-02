import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PonderationScoreComponent } from './ponderation-score.component';

describe('PonderationScoreComponent', () => {
  let component: PonderationScoreComponent;
  let fixture: ComponentFixture<PonderationScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PonderationScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PonderationScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
