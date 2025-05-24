import { Razred } from "./razred";
import { SifrarnikStavka } from "./sifrarnik-stavka";

export interface Odeljenje {
    id: number,
    naziv: string,
    odeljenskiStaresina: string,
    ukupanBrojUcenika: number,
    izdvojenoOdeljenje: boolean,
    jezikNastave: SifrarnikStavka,
    vrstaOdeljenja: SifrarnikStavka
}

export interface OdeljenjePuno {
    id: number;
    naziv: string;
    kombinovanoOdeljenje: boolean;
    celodnevnaNastava: boolean;
    izdvojenoOdeljenje: boolean;
    nazivIzdvojeneSkole: string | null;
    odeljenskiStaresina: string;
    smena: string;
    dvojezicnoOdeljenje: boolean;
    ukupanBrojUcenika: number;
    brojUcenika: number;
    brojUcenica: number;
    grade: Razred;
    jezikNastave: SifrarnikStavka;
    prviStraniJezik: SifrarnikStavka | null;
    vrstaOdeljenja: SifrarnikStavka;
}
