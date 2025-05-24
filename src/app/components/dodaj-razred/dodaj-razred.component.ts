import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RazredService } from '../../services/razred.service';
import { SifrarnikStavka } from '../../models/sifrarnik-stavka';
import { PostResponse } from '../../models/apiresponse';
import { ActivatedRoute, Router } from '@angular/router';
import { PrikazBrojUcenikaComponent } from "../../shared/prikaz-broj-ucenika/prikaz-broj-ucenika.component";
import { BrojUcenika, Razred } from '../../models/razred';

@Component({
  selector: 'app-dodaj-razred',
  imports: [ReactiveFormsModule, PrikazBrojUcenikaComponent],
  templateUrl: './dodaj-razred.component.html',
  styleUrl: './dodaj-razred.component.css'
})
export class DodajRazredComponent implements OnInit{

    //inicijalizacija varijabli i dependacy injection
    razredService = inject(RazredService);
    route = inject(ActivatedRoute);
    router = inject(Router);
    skolskeGodine: SifrarnikStavka[] = [];
    razredi: SifrarnikStavka[] = [];
    razred: Razred | null = null;
    programi: SifrarnikStavka[] = [];
    routeID: string | null = null;
    brojUcenika: BrojUcenika | null = null;

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
            this.inicijalizujEditFormu(Number(this.routeID))
        }

        //Subscribe na promenu select-a skolske godine, sto menja prikaz broja ucenika
        this.azurirajBrojUcenika(1);
        this.dodajRazredForma.get('skolskaGodina')?.valueChanges.subscribe(skolskaGodina => {
            this.azurirajBrojUcenika(skolskaGodina);
            console.log(skolskaGodina);
            console.log(this.brojUcenika);
        })
    }

    //Metoda koja poziva API za dodavanje ili editovanje razreda
    dodajRazredSubmit() {
        if (this.dodajRazredForma.get('id')?.value == null) {
            this.razredService.addRazred(this.dodajRazredForma).subscribe({
                next: (rezultat) => alert(rezultat.message),
                error: (greska) => alert(greska.error?.message || "Unexpected error")  
            });
        }
        else {
            this.razredService.editRazred(this.dodajRazredForma).subscribe({
                next: (rezultat) => {
                    alert(rezultat.message);
                    this.router.navigateByUrl('/razredi');
                },
                error: (greska) => alert(greska.error?.message  || "Unexpected error")
            })   
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
        this.razredService.getBrojUcenikaUSkolskoj(skolskaGodinaId).subscribe((rezultat: BrojUcenika) => {
            this.brojUcenika = rezultat;
        })
    }

    //Metoda postavlja select forme na podatke sa razreda ako je edit forma
    inicijalizujEditFormu(id: number) {
        this.razredService.getRazred(id).subscribe({
            next: (rezultat: Razred) => {
                this.razred = rezultat;

                this.dodajRazredForma.get('skolskaGodina')?.setValue(rezultat.skolskaGodina.id);
                this.dodajRazredForma.get('razred')?.setValue(rezultat.razredSifrarnik.id);
                this.dodajRazredForma.get('program')?.setValue(rezultat.program.id);
            },
            error: (greska) => {
                alert(greska.error?.message)
                this.router.navigateByUrl('/');
            }
        });
    }
}
