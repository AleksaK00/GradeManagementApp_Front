import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RazredService } from '../../services/razred.service';
import { SifrarnikStavka } from '../../models/sifrarnik-stavka';
import { SifrarnikStavkaResponse } from '../../models/apiresponse';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dodaj-razred',
  imports: [ReactiveFormsModule],
  templateUrl: './dodaj-razred.component.html',
  styleUrl: './dodaj-razred.component.css'
})
export class DodajRazredComponent implements OnInit{

    razredService = inject(RazredService);
    route = inject(ActivatedRoute);
    skolskeGodine: SifrarnikStavka[] = [];
    razredi: SifrarnikStavka[] = [];
    programi: SifrarnikStavka[] = [];
    routeID: string | null = null;

    //Reactive form za unos novog razreda
    dodajRazredForma: FormGroup = new FormGroup({
        id: new FormControl<number | null>(null),
        skolskaGodina: new FormControl<number>(0, Validators.required),
        razred: new FormControl<number>(0, Validators.required),
        program: new FormControl<number>(0, Validators.required)
    });

    //OnInit popunjava select elemente i proverava da li je postoji id u ruti, sto znaci da se forma koristi za editovanje
    ngOnInit(): void {
        this.popuniSelectForme();

        this.routeID = this.route.snapshot.paramMap.get("id");
        if (this.routeID != null) {
            this.dodajRazredForma.get('id')?.setValue(this.routeID);
            this.dodajRazredForma.get('id')?.disable();
            //pozovi API da dohvati razred sa datim id-om
        }
    }

    //Metoda koja poziva API da doda prosledjeni razred u bazu podataka
    dodajRazredSubmit() {
        const formValue = this.dodajRazredForma.value;
        
        if (this.dodajRazredForma.get('id')?.value == null) {
            //dodaj novi razred
        }
        else {
            //Azuriraj postojeci razred sa datim id-om
        }
    }

    //Metoda za popunjavanje select elemenata informacijama iz sifrarnika i postavljanje default vrednosti select-a
    popuniSelectForme() {
        this.razredService.getRazredFormaInformacije().subscribe((rezultat: SifrarnikStavkaResponse) => {
            if (rezultat.response == 'ok') {
                this.skolskeGodine = rezultat.skolskaGodina;
                this.razredi = rezultat.razred;
                this.programi = rezultat.program;

                this.dodajRazredForma.get('skolskaGodina')?.setValue(this.skolskeGodine[0].id);
                this.dodajRazredForma.get('razred')?.setValue(this.razredi[0].id);
                this.dodajRazredForma.get('program')?.setValue(this.programi[0].id);
            }
            else {
                alert("Server Error");
            }
        });
    }

}
