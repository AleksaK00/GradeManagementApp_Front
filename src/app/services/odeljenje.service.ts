import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OdeljenjeResponse } from '../models/apiresponse';

@Injectable({
  providedIn: 'root'
})
export class OdeljenjeService {

    private httpClient = inject(HttpClient);
    constructor() { }

    getAllOdeljenja() : Observable<OdeljenjeResponse> {
        return this.httpClient.get<OdeljenjeResponse>("https://dummyjson.com/c/2c8d-c2f6-41d7-92c3");
    }
}
