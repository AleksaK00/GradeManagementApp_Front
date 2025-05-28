import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostResponse } from '../models/apiresponse';
import { Odeljenje, OdeljenjePuno } from '../models/odeljenje';
import { environment } from '../../environments/environment.development';
import { FormGroup } from '@angular/forms';
import { SifrarnikStavka } from '../models/sifrarnik-stavka';

@Injectable({
  providedIn: 'root'
})
export class OdeljenjeService {

    private httpClient = inject(HttpClient);
    constructor() { }

    getAllOdeljenja() : Observable<Odeljenje[]> {
        return this.httpClient.get<Odeljenje[]>(environment.API_URL + "odeljenje");
    }

    getOdeljenjeById(id: number): Observable<OdeljenjePuno> {
        return this.httpClient.get<OdeljenjePuno>(environment.API_URL + "odeljenje/" + id);
    }

    addOdeljenje(novoOdeljenje: FormGroup): Observable<PostResponse> {
        return this.httpClient.post<PostResponse>(environment.API_URL + "odeljenje/dodaj", novoOdeljenje.getRawValue());
    }

    updateOdeljenje(izmenjenoOdeljenje: FormGroup, id: number): Observable<PostResponse> {
        return this.httpClient.put<PostResponse>(environment.API_URL + "odeljenje/izmeni/" + id, izmenjenoOdeljenje.getRawValue());
    }

    deleteOdeljenje(id: number): Observable<PostResponse> {
        return this.httpClient.delete<PostResponse>(environment.API_URL + "odeljenje/obrisi/" + id);
    }

    getVrsteOdeljenja(): Observable<SifrarnikStavka[]> {
        return this.httpClient.get<SifrarnikStavka[]>(environment.API_URL + "sifrarnikstavka/Vrsta_odeljenja");
    }

    getNastavniJezici(): Observable<SifrarnikStavka[]> {
        return this.httpClient.get<SifrarnikStavka[]>(environment.API_URL + "sifrarnikstavka/Jezik_nastave");
    } 

    getStraniJezici(): Observable<SifrarnikStavka[]> {
        return this.httpClient.get<SifrarnikStavka[]>(environment.API_URL + "sifrarnikstavka/Prvi_strani_jezik");
    }

    getExcelFile(): Observable<Blob> {
        return this.httpClient.get(environment.API_URL + "odeljenje/excel", { responseType: 'blob' });
    }

}
