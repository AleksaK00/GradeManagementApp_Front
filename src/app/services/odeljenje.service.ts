import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OdeljenjeResponse, PostResponse, SifrarnikStavkaResponse, StavkaSifrarnikaResponse } from '../models/apiresponse';
import { Odeljenje } from '../models/odeljenje';
import { environment } from '../../environments/environment.development';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OdeljenjeService {

    private httpClient = inject(HttpClient);
    constructor() { }

    getAllOdeljenja() : Observable<Odeljenje[]> {
        return this.httpClient.get<Odeljenje[]>(environment.API_URL + "odeljenje");
    }

    addOdeljenje(novoOdeljenje: FormGroup): Observable<PostResponse> {
        return this.httpClient.post<PostResponse>(environment.API_URL + "odeljenje/dodaj", novoOdeljenje.getRawValue());
    }

    getVrsteOdeljenja(): Observable<StavkaSifrarnikaResponse> {
        return this.httpClient.get<StavkaSifrarnikaResponse>("https://dummyjson.com/c/c340-7ed4-439b-97a3");
    }

    getAllNastavniJezici(): Observable<StavkaSifrarnikaResponse> {
        return this.httpClient.get<StavkaSifrarnikaResponse>("https://dummyjson.com/c/ba61-2d84-453a-8984");
    } 

}
