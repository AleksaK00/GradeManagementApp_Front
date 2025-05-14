import { Observable } from "rxjs";
import { SifrarnikStavka } from "./sifrarnik-stavka";

export interface APIresponse {
    response: string,
    message: string,
}

export interface SifrarnikStavkaResponse extends APIresponse {
    skolskaGodina: SifrarnikStavka[],
    razred: SifrarnikStavka[],
    program: SifrarnikStavka[]
}
