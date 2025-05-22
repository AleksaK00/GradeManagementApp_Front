import { Component, inject, OnInit } from '@angular/core';
import { Odeljenje } from '../../models/odeljenje';
import { OdeljenjeService } from '../../services/odeljenje.service';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-pregled-odeljenje',
  imports: [RouterLink],
  templateUrl: './pregled-odeljenje.component.html',
  styleUrl: './pregled-odeljenje.component.css'
})
export class PregledOdeljenjeComponent implements OnInit{

    odeljenja: Odeljenje[] = [];
    odeljenjeService = inject(OdeljenjeService);

    ngOnInit(): void {
        this.odeljenjeService.getAllOdeljenja().subscribe({
            next: (rezultat) => this.odeljenja = rezultat,
            error: (greska) => alert(greska.error?.message)
        })
    }
}
