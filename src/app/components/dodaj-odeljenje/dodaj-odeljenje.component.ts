import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SifrarnikStavka } from '../../models/sifrarnik-stavka';
import { RazredService } from '../../services/razred.service';
import { OdeljenjeService } from '../../services/odeljenje.service';
import { BrojUcenika, Razred } from '../../models/razred';
import { Odeljenje, OdeljenjePuno } from '../../models/odeljenje';
import { PrikazBrojUcenikaComponent } from "../../shared/prikaz-broj-ucenika/prikaz-broj-ucenika.component";

@Component({
  selector: 'app-dodaj-odeljenje',
  imports: [ReactiveFormsModule, PrikazBrojUcenikaComponent],
  templateUrl: './dodaj-odeljenje.component.html',
  styleUrl: './dodaj-odeljenje.component.css'
})
export class DodajOdeljenjeComponent implements OnInit{

    //inicijalizacija varijabli i dependacy injection
    routeID: string | null = null;
    razredID: string | null = null;
    route = inject(ActivatedRoute);
    skolskeGodine: SifrarnikStavka[] = [];
    razredi: SifrarnikStavka[] = [];
    nastavniJezici: SifrarnikStavka[] = []; 
    straniJezici: SifrarnikStavka[] = [];
    brojUcenika: BrojUcenika | null = null;
    razred: Razred | undefined;
    odeljenje: OdeljenjePuno | undefined;
    router = inject(Router);
    razredService = inject(RazredService);
    odeljenjeService = inject(OdeljenjeService);
    vrsteOdeljenja: SifrarnikStavka[] = [];

    //Reaktivna forma za unos novog odeljenja
    dodajOdeljenjeForma: FormGroup = new FormGroup({
        id: new FormControl<number | null>(null),
        razredId: new FormControl<number | null>(null),
        skolskaGodina: new FormControl<string>(""),
        razred: new FormControl<string>(""),
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

    //OnInit popunjava input elemente i proverava da li je postoji ruta za izmenu ili dodavanje
    ngOnInit(): void {

        //routeID je id razreda za izmenu, razredID je id razreda u kojem se dodaje novo odeljenje
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

        //Popunjavanje nezavisnih select elemenata i povezivanje checkboxova sa zavisnim inputima
        this.popuniNastavniJeziciSelect();
        this.popuniVrsteOdeljenjaSelect();
        this.popuniStraniJeziciSelect();
        this.poveziInputSaCheckboxom('izdvojenoOdeljenje', 'nazivIzdvojeneSkole');
        this.poveziInputSaCheckboxom('dvoJezicnoOdeljenje', 'prviStraniJezik');
    }

    //Metoda za popunjavanje forme informacijama potrebnim za dodavanje
    popuniFormuDodavanje() {
        this.dodajOdeljenjeForma.get('razredId')?.disable();

        this.razredService.getRazred(Number(this.razredID)).subscribe({
            next: (rezultat: Razred) => {
                this.razred = rezultat;
                this.dodajOdeljenjeForma.get('skolskaGodina')?.setValue(this.razred.skolskaGodina.naziv);
                this.dodajOdeljenjeForma.get('razred')?.setValue(this.razred.razredSifrarnik.naziv);
                this.dodajOdeljenjeForma.get('program')?.setValue(this.razred.program.naziv);

                this.dodajOdeljenjeForma.get('skolskaGodina')?.disable();
                this.dodajOdeljenjeForma.get('razred')?.disable();
                this.dodajOdeljenjeForma.get('program')?.disable();

                this.popuniBrojacUcenika(this.razred.id);
            },
            error: (greska) => alert(greska.error?.message)
        })
    }

    //Metoda za popunjavanje forme informacijama potrebnim za izmenu
    popuniFormuIzmena() {
        this.dodajOdeljenjeForma.get('id')?.disable();

        this.odeljenjeService.getOdeljenjeById(Number(this.routeID)).subscribe({
            next: (rezultat: OdeljenjePuno) => {
                this.odeljenje = rezultat;
                this.dodajOdeljenjeForma.get('nazivOdeljenja')?.setValue(this.odeljenje.naziv);
                this.dodajOdeljenjeForma.get('kombinovanoOdeljenje')?.setValue(this.odeljenje.kombinovanoOdeljenje);
                this.dodajOdeljenjeForma.get('celodnevnaNastava')?.setValue(this.odeljenje.celodnevnaNastava);
                this.dodajOdeljenjeForma.get('izdvojenoOdeljenje')?.setValue(this.odeljenje.izdvojenoOdeljenje);
                this.dodajOdeljenjeForma.get('nazivIzdvojeneSkole')?.setValue(this.odeljenje.nazivIzdvojeneSkole);
                this.dodajOdeljenjeForma.get('odeljenskiStaresina')?.setValue(this.odeljenje.odeljenskiStaresina);
                this.dodajOdeljenjeForma.get('smena')?.setValue(this.odeljenje.smena);
                this.dodajOdeljenjeForma.get('dvoJezicnoOdeljenje')?.setValue(this.odeljenje.dvojezicnoOdeljenje);
                this.dodajOdeljenjeForma.get('ukupnoUcenika')?.setValue(this.odeljenje.ukupanBrojUcenika);
                this.dodajOdeljenjeForma.get('brojUcenika')?.setValue(this.odeljenje.brojUcenika);
                this.dodajOdeljenjeForma.get('brojUcenica')?.setValue(this.odeljenje.brojUcenica);
                this.dodajOdeljenjeForma.get('vrstaOdeljenja')?.setValue(this.odeljenje.vrstaOdeljenja.id);
                this.dodajOdeljenjeForma.get('razred')?.setValue(this.odeljenje.grade.razredSifrarnik.naziv);
                this.dodajOdeljenjeForma.get('program')?.setValue(this.odeljenje.grade.program.naziv);
                this.dodajOdeljenjeForma.get('skolskaGodina')?.setValue(this.odeljenje.grade.skolskaGodina.naziv);
                if (this.odeljenje.prviStraniJezik != null) {
                    this.dodajOdeljenjeForma.get('prviStraniJezik')?.setValue(this.odeljenje.prviStraniJezik.id);
                }

                this.dodajOdeljenjeForma.get('skolskaGodina')?.disable();
                this.dodajOdeljenjeForma.get('razred')?.disable();
                this.dodajOdeljenjeForma.get('program')?.disable();

                this.popuniBrojacUcenika(this.odeljenje.grade.id);
            },
            error: (greska) => alert(greska.error?.message)
        });
    }

    //Metoda koja radi submit forme
    odeljenjeSubmit() {
        if (this.routeID == null) {
            this.dodajOdeljenje();
        }
        else {
            this.izmeniOdeljenje(Number(this.routeID));
        }
    }

    //Metoda za slanje API call-a za dodavanje novog odeljenja
    dodajOdeljenje() {
        this.odeljenjeService.addOdeljenje(this.dodajOdeljenjeForma).subscribe({
            next: (rezultat) => alert(rezultat.message),
            error: (greska) => alert(greska.error?.message)
        })
    }

    //Metoda za slanje API call-a za izmenu odeljenja
    izmeniOdeljenje(id: number) {
        this.odeljenjeService.updateOdeljenje(this.dodajOdeljenjeForma, id).subscribe({
            next: (rezultat) => {
                alert(rezultat.message);
                this.router.navigateByUrl('/odeljenja');
            },
            error: (greska) => alert(greska.error?.message)
        });
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

    //Metode za popunjavanje nastavni jezik select elemenata sa podacima iz sifrarnika
    popuniNastavniJeziciSelect() {
        this.odeljenjeService.getNastavniJezici().subscribe({
            next: (rezultat: SifrarnikStavka[]) => {
                this.nastavniJezici = rezultat;
                this.dodajOdeljenjeForma.get('nastavniJezik')?.setValue(this.nastavniJezici[0].id);
            },
            error: (greska) => alert(greska.error?.message)
        })
    }

    //Metode za popunjavanje vrsta odeljenja select elemenata sa podacima iz sifrarnika
    popuniVrsteOdeljenjaSelect() {
        this.odeljenjeService.getVrsteOdeljenja().subscribe({
            next: (rezultat: SifrarnikStavka[]) => {
                this.vrsteOdeljenja = rezultat;
                this.dodajOdeljenjeForma.get('vrstaOdeljenja')?.setValue(this.vrsteOdeljenja[0].id);
            },
            error: (greska) => alert(greska.error?.message)
        })
    }

    //Metode za popunjavanje strani jezici select elemenata sa podacima iz sifrarnika
    popuniStraniJeziciSelect() {
        this.odeljenjeService.getStraniJezici().subscribe({
            next: (rezultat: SifrarnikStavka[]) => {
                this.straniJezici = rezultat;
            },
            error: (greska) => alert(greska.error?.message)
        })
    }

    //Metoda koja popunjava brojac-ucenika component sa brojem ucenika u razredu
    popuniBrojacUcenika(idRazreda: number) {
        this.razredService.getBrojUcenikaURazredu(idRazreda).subscribe((rezultat: BrojUcenika) => {
            this.brojUcenika = rezultat;
        });
    }      
}
