import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledRazredComponent } from './pregled-razred.component';

describe('PregledRazredComponent', () => {
  let component: PregledRazredComponent;
  let fixture: ComponentFixture<PregledRazredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PregledRazredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledRazredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
