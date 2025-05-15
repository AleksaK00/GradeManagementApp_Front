import { Component, inject, OnInit } from '@angular/core';
import { Razred } from '../../models/razred';
import { RazredService } from '../../services/razred.service';
import { RazredResponse } from '../../models/apiresponse';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pregled-razred',
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './pregled-razred.component.html',
  styleUrl: './pregled-razred.component.css'
})
export class PregledRazredComponent implements OnInit{

    razredi: Razred[] = [];
    razredService = inject(RazredService);
    filterValue: string = "";
    filterSelect: FormControl = new FormControl("");

    ngOnInit(): void {
        this.UcitajRazrede();
    }

    UcitajRazrede() {
        this.razredService.getAllRazredi().subscribe((rezultat: RazredResponse) => {
            this.razredi = rezultat.data;
        });
    }

}
