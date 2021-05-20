import { Parsers } from "../enum/parser.enum";

export interface ICollections {
    [key: string]: Array<ICollection>;
}

export interface ICollection {
    path: string;
    collection: string;
    ext: string;
    loader: Parsers;
}