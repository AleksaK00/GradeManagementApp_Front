import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SifrarnikStavka } from '../../models/sifrarnik-stavka';
import { RazredService } from '../../services/razred.service';
import { OdeljenjeService } from '../../services/odeljenje.service';
import { OdeljenjeResponse, RazredResponse, SifrarnikStavkaResponse, StavkaSifrarnikaResponse } from '../../models/apiresponse';
import { Razred } from '../../models/razred';
import { Odeljenje } from '../../models/odeljenje';
import { PrikazBrojUcenikaComponent } from "../../shared/prikaz-broj-ucenika/prikaz-broj-ucenika.component";

@Component({
  selector: 'app-dodaj-odeljenje',
  imports: [ReactiveFormsModule, PrikazBrojUcenikaComponent],
  templateUrl: './dodaj-odeljenje.component.html',
  styleUrl: './dodaj-odeljenje.component.css'
})
export class DodajOdeljenjeComponent implements OnInit{

    routeID: string | null = null;
    razredID: string | null = null;
    route = inject(ActivatedRoute);
    skolskeGodine: SifrarnikStavka[] = [];
    razredi: SifrarnikStavka[] = [];
    nastavniJezici: SifrarnikStavka[] = []; 
    razred: Razred | undefined;
    odeljenje: Odeljenje | undefined;
    razredService = inject(RazredService);
    odeljenjeService = inject(OdeljenjeService);
    vrsteOdeljenja: SifrarnikStavka[] = [];

    //Reaktivna forma za unos novog odeljenja
    dodajOdeljenjeForma: FormGroup = new FormGroup({
        id: new FormControl<number | null>(null),
        razredId: new FormControl<number | null>(null),
        skolskaGodina: new FormControl<number>(0),
        razred: new FormControl<number>(0, Validators.required),
        nazivOdeljenja: new FormControl<string>("", Validators.required),
        vrstaOdeljenja: new FormControl<number>(0, Validators.required),
        program: new FormControl<string>("", Validators.required),
        kombinovanoOdeljenje: new FormControl<boolean>(false, Validators.required),
        celodnevnaNastava: new FormControl<boolean>(false, Validators.required),
        izdvojenoOdeljenje: new FormControl<boolean>(false, Validators.required),
        nazivIzdvojeneSkole: new FormControl<string | null>(null),
        odeljenskiStaresina: new FormControl<string>("", Validators.required),
        smena: new FormControl<string>("prva", Validators.required),
        nastavniJezik:  new FormControl<number>(0, Validators.required),
        dvoJezicnoOdeljenje: new FormControl<boolean>(false, Validators.required),
        prviStraniJezik:  new FormControl<number>(0),
        ukupnoUcenika: new FormControl<number>(0, Validators.required),
        brojUcenika: new FormControl<number>(0, Validators.required),
        brojUcenica: new FormControl<number>(0, Validators.required)
    });

    //OnInit popunjava select elemente i proverava da li je postoji id u ruti, sto znaci da se forma koristi za editovanje
    ngOnInit(): void {

        this.routeID = this.route.snapshot.paramMap.get("id");
        this.razredID = this.route.snapshot.paramMap.get("razredID");

        if (this.routeID != null) {
            this.popuniFormuIzmena();
            this.dodajOdeljenjeForma.get('id')?.setValue(this.routeID);
        }
        else if(this.razredID != null) {
            this.popuniFormuDodavanje();
            this.dodajOdeljenjeForma.get('razredId')?.setValue(this.razredID);
        }

        this.popuniNastavniJeziciSelect();
        this.popuniVrsteOdeljenjaSelect();

        this.poveziInputSaCheckboxom('izdvojenoOdeljenje', 'nazivIzdvojeneSkole');
        this.poveziInputSaCheckboxom('dvoJezicnoOdeljenje', 'prviStraniJezik');
    }

    //Metoda za popunjavanje forme informacijama potrebnim za dodavanje
    popuniFormuDodavanje() {
        this.dodajOdeljenjeForma.get('razredId')?.disable();

        //Privremeno koristi dummyjson sa svim razredima, promeniti u odgovarajuci API call koji hvata samo jedan razred!!!!!!!!!!!!!!!!!!
        // this.razredService.getAllRazredi().subscribe((rezultat: RazredResponse) => {
        //     this.razred = rezultat.data.find(r => r.id.toString() == this.razredID)

        //     this.dodajOdeljenjeForma.get('razred')?.setValue(this.razred?.razred);
        //     this.dodajOdeljenjeForma.get('skolskaGodina')?.setValue(this.razred?.skolskaGodina);
        //     this.dodajOdeljenjeForma.get('program')?.setValue(this.razred?.program);

        //     this.dodajOdeljenjeForma.get('razred')?.disable();
        //     this.dodajOdeljenjeForma.get('skolskaGodina')?.disable();
        //     this.dodajOdeljenjeForma.get('program')?.disable();
        // })   
    }

    //Metoda za popunjavanje forme informacijama potrebnim za izmenu
    popuniFormuIzmena() {
        this.dodajOdeljenjeForma.get('id')?.disable();

        //Privremeno koristi dummyjson sa svim odeljenjima, promeniti u odgovarajuci API call koji hvata samo jedan razred!!!!!!!!!!!!!!!!!!
        this.odeljenjeService.getAllOdeljenja().subscribe((rezultat: Odeljenje[]) => {
            this.odeljenje = rezultat.find(o => o.id.toString() == this.routeID)

            this.dodajOdeljenjeForma.get('razred')?.setValue(this.odeljenje?.naziv);
            this.dodajOdeljenjeForma.get('skolskaGodina')?.setValue(this.odeljenje?.vrstaOdeljenja.naziv);
            this.dodajOdeljenjeForma.get('program')?.setValue(this.odeljenje?.izdvojenoOdeljenje);

            this.dodajOdeljenjeForma.get('razred')?.disable();
            this.dodajOdeljenjeForma.get('skolskaGodina')?.disable();
            this.dodajOdeljenjeForma.get('program')?.disable();
        })
    }

    //Metoda koja radi submit forme
    dodajOdeljenje() {
        this.odeljenjeService.addOdeljenje(this.dodajOdeljenjeForma).subscribe({
            next: (rezultat) => alert(rezultat.message),
            error: (greska) => alert(greska.error?.message)
        })
    }

    //Metoda vrsi povezivanje opcionih inputa sa checboxom
    poveziInputSaCheckboxom(checkbox: string, input: string) {
        this.dodajOdeljenjeForma.get(input)?.disable();

        this.dodajOdeljenjeForma.get(checkbox)?.valueChanges.subscribe(omogucen => {
            if (omogucen) {
                this.dodajOdeljenjeForma.get(input)?.enable();
            }
            else {
                this.dodajOdeljenjeForma.get(input)?.disable();
            }
        });
    }

    popuniNastavniJeziciSelect() {
        this.odeljenjeService.getAllNastavniJezici().subscribe((rezultat: StavkaSifrarnikaResponse) => {
            this.nastavniJezici = rezultat.data;
            this.dodajOdeljenjeForma.get('nastavniJezik')?.setValue(this.nastavniJezici[0].id);
        })
    }

    popuniVrsteOdeljenjaSelect() {
        this.odeljenjeService.getVrsteOdeljenja().subscribe((rezultat: StavkaSifrarnikaResponse) => {
            this.vrsteOdeljenja = rezultat.data;
            this.dodajOdeljenjeForma.get('vrstaOdeljenja')?.setValue(this.vrsteOdeljenja[0].id);
        })
    }
}
