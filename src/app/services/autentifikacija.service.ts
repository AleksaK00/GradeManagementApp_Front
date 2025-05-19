import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutentifikacijaService {

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
}
