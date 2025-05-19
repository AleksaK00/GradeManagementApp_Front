import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutentifikacijaService } from '../../services/autentifikacija.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    router = inject(Router);
    autentifikacijaServis = inject(AutentifikacijaService);

    loginForma: FormGroup = new FormGroup({
        email: new FormControl<string>('', [Validators.required, Validators.email]),
        sifra: new FormControl<string>('', [Validators.required, Validators.min(8)])
    })

    loginFormaSubmit() {
        if (this.loginForma.get('email')?.value == 'admin@gmail.com' && this.loginForma.get('sifra')?.value == 'Sifra123') {
            localStorage.setItem('korisnik', this.loginForma.get('email')?.value);
            this.autentifikacijaServis.setUlogovan(true);
            this.router.navigateByUrl('/');
        }
        else {
            alert('Email ili lozinka je pogrešna');
        }
    }

}
