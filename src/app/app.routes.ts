import { Routes } from '@angular/router';
import { PocetnaComponent } from './components/pocetna/pocetna.component';
import { PregledOdeljenjeComponent } from './components/pregled-odeljenje/pregled-odeljenje.component';
import { DodajOdeljenjeComponent } from './components/dodaj-odeljenje/dodaj-odeljenje.component';
import { PregledRazredComponent } from './components/pregled-razred/pregled-razred.component';
import { DodajRazredComponent } from './components/dodaj-razred/dodaj-razred.component';

export const routes: Routes = [ {
        path: '',
        component: PocetnaComponent
    }, {
        path: 'odeljenja',
        component: PregledOdeljenjeComponent
    }, {
        path: 'odeljenja/dodaj',
        component: DodajOdeljenjeComponent
    }, {
        path: 'razredi',
        component: PregledRazredComponent
    }, {
        path: 'razredi/dodaj',
        component: DodajRazredComponent
    }
];