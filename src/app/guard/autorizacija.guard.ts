import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const autorizacijaGuard: CanActivateFn = (route, state) => {

    const router = inject(Router);

    if(localStorage.getItem('korisnik') != null) {
        return true;
    }
    else {
        router.navigateByUrl('/login') ;
        return false;
    }
};
