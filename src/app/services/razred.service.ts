import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RazredResponse, SifrarnikStavkaResponse } from '../models/apiresponse';

@Injectable({
  providedIn: 'root'
})
export class RazredService {

    private httpClient = inject(HttpClient);
    constructor() { }

    getRazredFormaInformacije() : Observable<SifrarnikStavkaResponse> {
        return this.httpClient.get<SifrarnikStavkaResponse>("https://dummyjson.com/c/c908-74bf-4e7b-b0ef");
    }

    getAllRazredi(): Observable<RazredResponse> {
        return this.httpClient.get<RazredResponse>("https://dummyjson.com/c/9cfd-8c5d-43ea-8bb4");
    }
}
