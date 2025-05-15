import { Observable } from "rxjs";
import { SifrarnikStavka } from "./sifrarnik-stavka";
import { Razred } from "./razred";
import { Odeljenje } from "./odeljenje";

export interface APIresponse {
    response: string,
    message: string,
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
    data: Odeljenje[];
}
