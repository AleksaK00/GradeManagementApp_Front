import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrojUcenikaResponse, RazredResponse, SifrarnikStavkaResponse } from '../models/apiresponse';
import { RazredTabela } from '../models/razred';
import { environment } from '../../environments/environment.development';
import { SifrarnikStavka } from '../models/sifrarnik-stavka';

@Injectable({
  providedIn: 'root'
})
export class RazredService {

    private httpClient = inject(HttpClient);
    constructor() { }

    getAllSkolskeGodine() : Observable<SifrarnikStavka[]> {
        return this.httpClient.get<SifrarnikStavka[]>(environment.API_URL + "sifrarnikstavka/Školska_godina");
    }

    getAllProgrami() : Observable<SifrarnikStavka[]> {
        return this.httpClient.get<SifrarnikStavka[]>(environment.API_URL + "sifrarnikstavka/Program");
    }

    getAllSifrarnikRazredi() : Observable<SifrarnikStavka[]> {
        return this.httpClient.get<SifrarnikStavka[]>(environment.API_URL + "sifrarnikstavka/Razred");
    }

    getAllRazredi(): Observable<RazredTabela[]> {
        return this.httpClient.get<RazredTabela[]>(environment.API_URL + "razred");
    }

    getBrojUcenika(): Observable<BrojUcenikaResponse> {
        return this.httpClient.get<BrojUcenikaResponse>("https://dummyjson.com/c/8b8c-9fce-41b0-ac0a");
    }

    //za programe https://dummyjson.com/c/209c-0ef3-4ed8-aaee
}
