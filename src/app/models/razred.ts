import { SifrarnikStavka } from "./sifrarnik-stavka";

export interface Razred {
    id: number,
    skolskaGodina: SifrarnikStavka,
    razredSifrarnik: SifrarnikStavka,
    program: SifrarnikStavka,
}

export interface RazredTabela {
    razred: Razred,
    ukupnoUcenika: number,
    brojOdeljenja: number
}
