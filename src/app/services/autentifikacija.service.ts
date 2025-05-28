import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { PostResponse } from '../models/apiresponse';

@Injectable({
  providedIn: 'root'
})
export class AutentifikacijaService {

    httpClient = inject(HttpClient);
    ulogovan = signal(false);
    constructor() {
        this.ulogovan.set(localStorage.getItem('korisnik') != null);
    }

    setUlogovan(istinitost: boolean) {
        this.ulogovan.set(istinitost);
    }

    getUlogovan() {
        return this.ulogovan;
    }

    getUlogovanEmail(): string | null {
        return localStorage.getItem('korisnik');
    }


    login(korisnik: FormGroup ): Observable<PostResponse> {
        return this.httpClient.post<PostResponse>(environment.API_URL + "login", korisnik.value);
    }
}
