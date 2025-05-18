import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-prikaz-broj-ucenika',
  imports: [],
  templateUrl: './prikaz-broj-ucenika.component.html',
  styleUrl: './prikaz-broj-ucenika.component.css'
})
export class PrikazBrojUcenikaComponent {

    brojUcenika = input<number>(0);
    brojUcenica = input<number>(0);
    ukupnoUcenika = computed(() => this.brojUcenica() + this.brojUcenika());
}
