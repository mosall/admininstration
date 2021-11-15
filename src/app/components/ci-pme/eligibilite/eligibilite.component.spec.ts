import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EligibiliteComponent } from './eligibilite.component';

describe('EligibiliteComponent', () => {
  let component: EligibiliteComponent;
  let fixture: ComponentFixture<EligibiliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EligibiliteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EligibiliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
