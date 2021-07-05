import { IPaths } from './paths.interface'
import { Parsers } from '../enum/parser.enum'
import { IGenerator } from './generator.interface'
import { IOptions } from './options.interface'
import { IEditor } from './editor.interface'
import { ISourceEditor } from './source-editor.interface'

export interface IUserInfo {
    'collections-config': any;
    timezone?: String;
    source?: String;
    'base-url'?: String;
    generator?: IGenerator;
    // TODO: this plugin to be supported in future
    // data?: any;
    _comments?: Object;
    _options?: IOptions;
    _editor?: IEditor;
    _source_editor?: ISourceEditor;
    _array_structures?: Object;
    _collection_groups?: Array<ICollectionGroup>
    _select_data?: any;
    paths?: IPaths;
    loader?: Parsers;
}

export interface ILoader {
    [key: string]: Parsers
}

export interface ICollectionGroup {
    heading: string;
    collections: Array<string>
}