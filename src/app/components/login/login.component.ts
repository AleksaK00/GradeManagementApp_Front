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

    //Reaktivna forma
    loginForma: FormGroup = new FormGroup({
        email: new FormControl<string>('', [Validators.required, Validators.email]),
        sifra: new FormControl<string>('', [Validators.required, Validators.min(8)])
    })

    //Metoda koja vrsi API call za validaciju log in informacija
    loginFormaSubmit() {
        if (this.loginForma.valid) {
            this.autentifikacijaServis.login(this.loginForma).subscribe({
                next: (rezultat) => {
                    localStorage.setItem('korisnik', rezultat.message);
                    this.autentifikacijaServis.setUlogovan(true);
                    this.router.navigateByUrl('/');
                },
                error: (greska) => alert(greska.error?.message)
            });
        }
        else {
            alert("Sva polja su obavezna, sifra minimum 8 slova")
        }
    }

}
