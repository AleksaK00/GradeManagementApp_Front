import { Component, inject, OnInit } from '@angular/core';
import { Razred, RazredTabela } from '../../models/razred';
import { RazredService } from '../../services/razred.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SifrarnikStavka } from '../../models/sifrarnik-stavka';

@Component({
  selector: 'app-pregled-razred',
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './pregled-razred.component.html',
  styleUrl: './pregled-razred.component.css'
})
export class PregledRazredComponent implements OnInit{

    razredi: RazredTabela[] = [];
    razredService = inject(RazredService);
    filterValue: string = "";
    filterSelect: FormControl = new FormControl("");
    skolskeGodine: SifrarnikStavka[] = []

    ngOnInit(): void {
        this.UcitajRazrede();
        this.UcitajSkolskeGodine();
    }

    UcitajRazrede() {
        this.razredService.getAllRazredi().subscribe((rezultat: RazredTabela[]) => {
            this.razredi = rezultat;
        });
    }

    UcitajSkolskeGodine() {
        this.razredService.getAllSkolskeGodine().subscribe((rezultat: SifrarnikStavka[]) => {
            this.skolskeGodine = rezultat;
        });
    }

    obrisiRazred(id: number) {
        confirm('Potvrdi brisanje razreda');
        alert('BOOM');
    }

}
