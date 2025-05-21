import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrojUcenikaResponse, PostResponse, RazredResponse, SifrarnikStavkaResponse } from '../models/apiresponse';
import { Razred, RazredTabela } from '../models/razred';
import { environment } from '../../environments/environment.development';
import { SifrarnikStavka } from '../models/sifrarnik-stavka';
import { FormGroup } from '@angular/forms';

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

    getRazred(id: number): Observable<Razred> {
        return this.httpClient.get<Razred>(environment.API_URL + "razred/" + id);
    }

    addRazred(noviRazred: FormGroup): Observable<PostResponse> {
        return this.httpClient.post<PostResponse>(environment.API_URL + "razred/dodaj", noviRazred.value);
    }

    editRazred(noviRazred: FormGroup): Observable<PostResponse> {
        return this.httpClient.put<PostResponse>(environment.API_URL + "razred/izmeni/" + noviRazred.get('id')?.value, noviRazred.value);
    }

    getAllRazredi(): Observable<RazredTabela[]> {
        return this.httpClient.get<RazredTabela[]>(environment.API_URL + "razred");
    }

    getBrojUcenika(): Observable<BrojUcenikaResponse> {
        return this.httpClient.get<BrojUcenikaResponse>("https://dummyjson.com/c/8b8c-9fce-41b0-ac0a");
    }

    //za programe https://dummyjson.com/c/209c-0ef3-4ed8-aaee
}
