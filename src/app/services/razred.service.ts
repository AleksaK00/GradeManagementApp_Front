import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SifrarnikStavkaResponse } from '../models/apiresponse';

@Injectable({
  providedIn: 'root'
})
export class RazredService {

    private httpClient = inject(HttpClient);
    constructor() { }

    getRazredFormaInformacije() : Observable<SifrarnikStavkaResponse> {
        return this.httpClient.get<SifrarnikStavkaResponse>("https://dummyjson.com/c/c908-74bf-4e7b-b0ef");
    }
}
