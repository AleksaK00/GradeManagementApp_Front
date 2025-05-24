import { Component, computed, input } from '@angular/core';
import { BrojUcenika } from '../../models/razred';

@Component({
  selector: 'app-prikaz-broj-ucenika',
  imports: [],
  templateUrl: './prikaz-broj-ucenika.component.html',
  styleUrl: './prikaz-broj-ucenika.component.css'
})
export class PrikazBrojUcenikaComponent {

    brojUcenika = input<BrojUcenika | null>(null);
    ukupnoUcenika = computed(() => this.brojUcenika()?.brojUcenika! + this.brojUcenika()?.brojUcenica!);
}
