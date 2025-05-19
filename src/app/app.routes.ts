import { Routes } from '@angular/router';
import { PocetnaComponent } from './components/pocetna/pocetna.component';
import { PregledOdeljenjeComponent } from './components/pregled-odeljenje/pregled-odeljenje.component';
import { DodajOdeljenjeComponent } from './components/dodaj-odeljenje/dodaj-odeljenje.component';
import { PregledRazredComponent } from './components/pregled-razred/pregled-razred.component';
import { DodajRazredComponent } from './components/dodaj-razred/dodaj-razred.component';
import { LoginComponent } from './components/login/login.component';
import { autorizacijaGuard } from './guard/autorizacija.guard';

export const routes: Routes = [ {
        path: '',
        component: PocetnaComponent
    }, {
        path: 'login',
        component: LoginComponent
    },{
        path: 'odeljenja',
        component: PregledOdeljenjeComponent,
        canActivate: [autorizacijaGuard]
    }, {
        path: 'razredi',
        component: PregledRazredComponent,
        canActivate: [autorizacijaGuard]
    }, {
        path: 'dodajRazred',
        component: DodajRazredComponent,
        canActivate: [autorizacijaGuard]
    }, {
        path: 'izmeniRazred/:id',
        component: DodajRazredComponent,
        canActivate: [autorizacijaGuard]
    }, {
        path: 'izmeniOdeljenje/:id',
        component: DodajOdeljenjeComponent,
        canActivate: [autorizacijaGuard]
    }, {
        path: 'dodajOdeljenje/:razredID',
        component: DodajOdeljenjeComponent,
        canActivate: [autorizacijaGuard]
    }
];