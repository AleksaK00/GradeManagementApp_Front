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
