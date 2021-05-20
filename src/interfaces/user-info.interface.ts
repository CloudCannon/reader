import { IPaths } from './paths.interface'
import { Parsers } from '../enum/parser.enum'

export interface IUserInfo {
    collections: {};
    timezone: String;
    source?: String;
    'base-url'?: String;
    generator?: {};
    comments?: {};
    'input-options'?: {};
    editor?: {};
    'source-editor'?: {};
    'array-structures'?: {};
    'select-data'?: {};
    paths?: IPaths;
    loader?: ILoader
}

export interface ILoader {
    [key: string]: Parsers
}