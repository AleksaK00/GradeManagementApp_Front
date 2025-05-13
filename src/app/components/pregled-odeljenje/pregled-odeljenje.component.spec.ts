import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledOdeljenjeComponent } from './pregled-odeljenje.component';

describe('PregledOdeljenjeComponent', () => {
  let component: PregledOdeljenjeComponent;
  let fixture: ComponentFixture<PregledOdeljenjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PregledOdeljenjeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledOdeljenjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
