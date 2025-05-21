import { SifrarnikStavka } from "./sifrarnik-stavka";
import { Razred } from "./razred";
import { Odeljenje } from "./odeljenje";
import { BrojUcenika } from "./broj-ucenika";

export interface APIresponse {
    response: string,
    message: string,
}

export interface PostResponse {
    message: string
}

export interface SifrarnikStavkaResponse extends APIresponse {
    skolskaGodina: SifrarnikStavka[],
    razred: SifrarnikStavka[],
    program: SifrarnikStavka[]
}

export interface RazredResponse extends APIresponse {
    data: Razred[]
}

export interface OdeljenjeResponse extends APIresponse {
    data: Odeljenje[]
}

export interface StavkaSifrarnikaResponse extends APIresponse {
    data: SifrarnikStavka[]
}

export interface BrojUcenikaResponse extends APIresponse {
    data: BrojUcenika[]
}
