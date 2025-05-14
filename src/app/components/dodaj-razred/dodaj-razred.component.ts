import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RazredService } from '../../services/razred.service';
import { SifrarnikStavka } from '../../models/sifrarnik-stavka';
import { SifrarnikStavkaResponse } from '../../models/apiresponse';

@Component({
  selector: 'app-dodaj-razred',
  imports: [ReactiveFormsModule],
  templateUrl: './dodaj-razred.component.html',
  styleUrl: './dodaj-razred.component.css'
})
export class DodajRazredComponent implements OnInit{

    razredService = inject(RazredService);
    skolskeGodine: SifrarnikStavka[] = [];
    razredi: SifrarnikStavka[] = [];
    programi: SifrarnikStavka[] = [];

    //Reactive form za unos novog razreda
    dodajRazredForma: FormGroup = new FormGroup({
        id: new FormControl<number | null>(null),
        skolskaGodina: new FormControl<number>(0, Validators.required),
        razred: new FormControl<number>(0, Validators.required),
        program: new FormControl<number>(0, Validators.required)
    });

    //OnInit za hvatanje informacija za popunjavanje select elemenata i postavljanje dafult vrednosti u formi
    ngOnInit(): void {
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

    //Metoda koja poziva API da doda prosledjeni razred u bazu podataka
    dodajRazredSubmit() {
        const formValue = this.dodajRazredForma.value;
        console.log(formValue);
        console.log(this.razredi[0]);
    }

}
