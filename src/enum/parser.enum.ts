import { z } from "zod";

export enum Parsers {
    'md' = 'gray-matter',
    'html' = 'gray-matter',
    'toml' = 'gray-matter',
    'yaml' = 'gray-matter',
    'json' = 'gray-matter'
}

export const IParsersEnum = z.nativeEnum(Parsers)

type IParsersEnum = z.infer<typeof IParsersEnum>