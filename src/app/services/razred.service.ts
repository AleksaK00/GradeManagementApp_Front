import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrojUcenikaResponse, RazredResponse, SifrarnikStavkaResponse } from '../models/apiresponse';
import { Razred, RazredTabela } from '../models/razred';

@Injectable({
  providedIn: 'root'
})
export class RazredService {

    private httpClient = inject(HttpClient);
    constructor() { }

    getRazredFormaInformacije() : Observable<SifrarnikStavkaResponse> {
        return this.httpClient.get<SifrarnikStavkaResponse>("https://dummyjson.com/c/c908-74bf-4e7b-b0ef");
    }

    getAllRazredi(): Observable<RazredTabela[]> {
        return this.httpClient.get<RazredTabela[]>("https://localhost:7141/api/razred");
    }

    getBrojUcenika(): Observable<BrojUcenikaResponse> {
        return this.httpClient.get<BrojUcenikaResponse>("https://dummyjson.com/c/8b8c-9fce-41b0-ac0a");
    }

    //za programe https://dummyjson.com/c/209c-0ef3-4ed8-aaee
}
