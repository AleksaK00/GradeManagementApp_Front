import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazBrojUcenikaComponent } from './prikaz-broj-ucenika.component';

describe('PrikazBrojUcenikaComponent', () => {
  let component: PrikazBrojUcenikaComponent;
  let fixture: ComponentFixture<PrikazBrojUcenikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrikazBrojUcenikaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrikazBrojUcenikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
