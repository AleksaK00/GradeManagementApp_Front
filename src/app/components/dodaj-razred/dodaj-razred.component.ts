import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RazredService } from '../../services/razred.service';
import { SifrarnikStavka } from '../../models/sifrarnik-stavka';
import { BrojUcenikaResponse, SifrarnikStavkaResponse } from '../../models/apiresponse';
import { ActivatedRoute } from '@angular/router';
import { PrikazBrojUcenikaComponent } from "../../shared/prikaz-broj-ucenika/prikaz-broj-ucenika.component";
import { BrojUcenika } from '../../models/broj-ucenika';

@Component({
  selector: 'app-dodaj-razred',
  imports: [ReactiveFormsModule, PrikazBrojUcenikaComponent],
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
    brojUcenika: BrojUcenika | undefined;

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

        //Subscribe na promenu select-a skolske godine, sto menja prikaz broja ucenika
        this.azurirajBrojUcenika(1);
        this.dodajRazredForma.get('skolskaGodina')?.valueChanges.subscribe(skolskaGodina => {
            this.azurirajBrojUcenika(skolskaGodina);
            console.log(skolskaGodina);
            console.log(this.brojUcenika);
        })
    }

    //Metoda koja poziva API da doda prosledjeni razred u bazu podataka
    dodajRazredSubmit() {
        const formValue = this.dodajRazredForma.value;
        
        if (this.dodajRazredForma.get('id')?.value == null) {
            console.log(this.dodajRazredForma.value);
            //dodaj novi razred
        }
        else {
            console.log(this.dodajRazredForma.value);
            //Azuriraj postojeci razred sa datim id-om
        }
    }

    //Metoda za popunjavanje select elemenata informacijama iz sifrarnika i postavljanje default vrednosti select-a
    popuniSelectForme() {

        this.razredService.getAllSkolskeGodine().subscribe((rezultat: SifrarnikStavka[]) => {
            this.skolskeGodine = rezultat;
            this.dodajRazredForma.get('skolskaGodina')?.setValue(rezultat[0].id);
        });

        this.razredService.getAllProgrami().subscribe((rezultat: SifrarnikStavka[]) => {
            this.programi = rezultat;
            this.dodajRazredForma.get('program')?.setValue(rezultat[0].id);
        });

        this.razredService.getAllSifrarnikRazredi().subscribe((rezultat: SifrarnikStavka[]) => {
            this.razredi = rezultat;
            this.dodajRazredForma.get('razred')?.setValue(rezultat[0].id);
        });
    }

    //Metoda azurira prikaz ukupnog broja ucenika na izabranu skolsku godinu
    azurirajBrojUcenika(skolskaGodinaId: number) {
        this.razredService.getBrojUcenika().subscribe((rezultat: BrojUcenikaResponse) => {
            this.brojUcenika = rezultat.data.find(godiste => godiste.skolskaGodinaId == skolskaGodinaId);
            console.log(rezultat);
        })
    }
}
