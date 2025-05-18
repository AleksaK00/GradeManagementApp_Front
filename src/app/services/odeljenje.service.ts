import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OdeljenjeResponse, SifrarnikStavkaResponse, StavkaSifrarnikaResponse } from '../models/apiresponse';

@Injectable({
  providedIn: 'root'
})
export class OdeljenjeService {

    private httpClient = inject(HttpClient);
    constructor() { }

    getAllOdeljenja() : Observable<OdeljenjeResponse> {
        return this.httpClient.get<OdeljenjeResponse>("https://dummyjson.com/c/2c8d-c2f6-41d7-92c3");
    }

    getVrsteOdeljenja(): Observable<StavkaSifrarnikaResponse> {
        return this.httpClient.get<StavkaSifrarnikaResponse>("https://dummyjson.com/c/c340-7ed4-439b-97a3");
    }

    getAllNastavniJezici(): Observable<StavkaSifrarnikaResponse> {
        return this.httpClient.get<StavkaSifrarnikaResponse>("https://dummyjson.com/c/ba61-2d84-453a-8984");
    } 

}
