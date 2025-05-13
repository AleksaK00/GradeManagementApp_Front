import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajOdeljenjeComponent } from './dodaj-odeljenje.component';

describe('DodajOdeljenjeComponent', () => {
  let component: DodajOdeljenjeComponent;
  let fixture: ComponentFixture<DodajOdeljenjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DodajOdeljenjeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DodajOdeljenjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
