import { z } from "zod";

export enum Parsers {
    'md' = 'gray-matter',
    'html' = 'gray-matter'
}

export const IParsersEnum = z.nativeEnum(Parsers)

type IParsersEnum = z.infer<typeof IParsersEnum>