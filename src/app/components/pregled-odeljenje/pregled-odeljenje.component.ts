import { Component, inject, OnInit } from '@angular/core';
import { Odeljenje } from '../../models/odeljenje';
import { OdeljenjeService } from '../../services/odeljenje.service';
import { Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-pregled-odeljenje',
  imports: [RouterLink],
  templateUrl: './pregled-odeljenje.component.html',
  styleUrl: './pregled-odeljenje.component.css'
})
export class PregledOdeljenjeComponent implements OnInit{

    odeljenja: Odeljenje[] = [];
    odeljenjeService = inject(OdeljenjeService);
    router = inject(Router);

    //Hvatanje svih odeljenja iz baze prilikom inicijalizacije komponente
    ngOnInit(): void {
        this.odeljenjeService.getAllOdeljenja().subscribe({
            next: (rezultat) => this.odeljenja = rezultat,
            error: (greska) => alert(greska.error?.message)
        })
    }

    //Metoda za brisanje odeljenja
    obrisiOdeljenje(id: number) {
        if (confirm("Da li ste sigurni da želite da obrišete odeljenje?")) {
            this.odeljenjeService.deleteOdeljenje(id).subscribe({
            next: () => {
                alert("Odeljenje je uspešno obrisano.");
                window.location.reload();
            },
            error: (greska) => alert(greska.error?.message)
        });
        }
        else {
            return;
        }
 
    }
}
