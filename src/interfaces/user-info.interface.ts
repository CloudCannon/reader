import { IPaths } from './paths.interface'
import { Parsers } from '../enum/parser.enum'

export interface IUserInfo {
    'collections-config': any;
    timezone: String;
    source?: String;
    'base-url'?: String;
    generator?: {};
    _comments?: {};
    _options?: {};
    _editor?: {};
    _source_editor?: {};
    _array_structures?: {};
    _select_data?: {};
    paths?: IPaths;
    loader?: Parsers;
}

export interface ILoader {
    [key: string]: Parsers
}