import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AutentifikacijaService } from './services/autentifikacija.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{

    title = 'GradeManagementApp_Front';
    router = inject(Router);
    autentifikacijaServis = inject(AutentifikacijaService);
    ulogovan = this.autentifikacijaServis.getUlogovan();
    
    odjaviKorisnika() {
        localStorage.removeItem('korisnik');
        this.autentifikacijaServis.setUlogovan(false);
        this.router.navigateByUrl('/')
     }
}
