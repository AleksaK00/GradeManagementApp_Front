import { Component, inject, OnInit } from '@angular/core';
import { Odeljenje } from '../../models/odeljenje';
import { OdeljenjeService } from '../../services/odeljenje.service';
import { OdeljenjeResponse } from '../../models/apiresponse';

@Component({
  selector: 'app-pregled-odeljenje',
  imports: [],
  templateUrl: './pregled-odeljenje.component.html',
  styleUrl: './pregled-odeljenje.component.css'
})
export class PregledOdeljenjeComponent implements OnInit{

    odeljenja: Odeljenje[] = [];
    odeljenjeService = inject(OdeljenjeService);

    ngOnInit(): void {
        this.odeljenjeService.getAllOdeljenja().subscribe((rezultat: OdeljenjeResponse) => {
            this.odeljenja = rezultat.data;
        })
    }
}
