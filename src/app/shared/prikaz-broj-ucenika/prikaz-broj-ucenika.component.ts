import { Component, computed, Input } from '@angular/core';

@Component({
  selector: 'app-prikaz-broj-ucenika',
  imports: [],
  templateUrl: './prikaz-broj-ucenika.component.html',
  styleUrl: './prikaz-broj-ucenika.component.css'
})
export class PrikazBrojUcenikaComponent {

    @Input() brojUcenika: number = 0;
    @Input() brojUcenica: number = 0;
    ukupnoUcenika = computed(() => this.brojUcenica + this.brojUcenika);
}
