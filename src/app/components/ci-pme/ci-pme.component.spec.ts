import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiPmeComponent } from './ci-pme.component';

describe('CiPmeComponent', () => {
  let component: CiPmeComponent;
  let fixture: ComponentFixture<CiPmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiPmeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CiPmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
