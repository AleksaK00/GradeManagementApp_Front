import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SifrarnikStavka } from '../../models/sifrarnik-stavka';
import { RazredService } from '../../services/razred.service';
import { OdeljenjeService } from '../../services/odeljenje.service';
import { RazredResponse, SifrarnikStavkaResponse, StavkaSifrarnikaResponse } from '../../models/apiresponse';
import { Razred } from '../../models/razred';

@Component({
  selector: 'app-dodaj-odeljenje',
  imports: [ReactiveFormsModule],
  templateUrl: './dodaj-odeljenje.component.html',
  styleUrl: './dodaj-odeljenje.component.css'
})
export class DodajOdeljenjeComponent implements OnInit{

    routeID: string | null = null;
    razredID: string | null = null;
    route = inject(ActivatedRoute);
    skolskeGodine: SifrarnikStavka[] = [];
    razredi: SifrarnikStavka[] = [];
    razred: Razred | undefined;
    razredService = inject(RazredService);
    odeljenjeService = inject(OdeljenjeService);
    vrsteOdeljenja: SifrarnikStavka[] = [];

    //Reaktivna forma za unos novog odeljenja
    dodajOdeljenjeForma: FormGroup = new FormGroup({
        id: new FormControl<number | null>(null),
        skolskaGodina: new FormControl<number>(0),
        razred: new FormControl<number>(0,Validators.required),
        nazivOdeljenja: new FormControl<string>("",Validators.required),
        vrstaOdeljenja: new FormControl<number>(0,Validators.required),
        program: new FormControl<string>(''),
        kombinovanoOdeljenje: new FormControl<boolean>(false,Validators.required),
        celodnevnaNastava: new FormControl<boolean>(false,Validators.required),
        izdvojenoOdeljenje: new FormControl<boolean>(false,Validators.required),
        nazivIzdvojeneSkole: new FormControl<string | null>(null),
        odeljenskiStaresina: new FormControl<string>("", Validators.required),
        smena: new FormControl<string>("", Validators.required),
        nastavniJezik:  new FormControl<number>(0,Validators.required),
        dvoJezicnoOdeljenje: new FormControl<boolean>(false,Validators.required),
        prviStraniJezik:  new FormControl<number>(0,Validators.required),
        ukupnoUcenika: new FormControl<number>(0, Validators.required),
        brojUcenika: new FormControl<number>(0,Validators.required),
        brojUcenica: new FormControl<number>(0,Validators.required)
    });

    //OnInit popunjava select elemente i proverava da li je postoji id u ruti, sto znaci da se forma koristi za editovanje
    ngOnInit(): void {

        this.routeID = this.route.snapshot.paramMap.get("id");
        this.razredID = this.route.snapshot.paramMap.get("razredID");
        if (this.routeID != null) {
            this.popuniFormuIzmena();
        }
        else if(this.razredID != null) {
            this.popuniFormuDodavanje();
        }
    }

    //Metoda za popunjavanje forme informacijama za dodavanje
    popuniFormuDodavanje() {
        this.razredService.getAllRazredi().subscribe((rezultat: RazredResponse) => {
            this.razred = rezultat.data.find(r => r.id.toString() == this.razredID)

            this.dodajOdeljenjeForma.get('razred')?.setValue(this.razred?.razred);
            this.dodajOdeljenjeForma.get('skolskaGodina')?.setValue(this.razred?.skolskaGodina);
            this.dodajOdeljenjeForma.get('program')?.setValue(this.razred?.program);

            this.dodajOdeljenjeForma.get('razred')?.disable();
            this.dodajOdeljenjeForma.get('skolskaGodina')?.disable();
            this.dodajOdeljenjeForma.get('program')?.disable();
        })   

        this.odeljenjeService.getVrsteOdeljenja().subscribe((rezultat: StavkaSifrarnikaResponse) => {
            this.vrsteOdeljenja = rezultat.data;
            this.dodajOdeljenjeForma.get('vrstaOdeljenja')?.setValue(this.vrsteOdeljenja[0].id);
        })


    }

    popuniFormuIzmena() {
        this.odeljenjeService.getVrsteOdeljenja().subscribe((rezultat: StavkaSifrarnikaResponse) => {
            this.vrsteOdeljenja = rezultat.data;
            this.dodajOdeljenjeForma.get('vrstaOdeljenja')?.setValue(this.vrsteOdeljenja[0].id);
        })
    }

    dodajOdeljenje() {
        console.log(this.dodajOdeljenjeForma);
        //Post API call
    }
}
