import { IPaths } from './paths.interface';
import { IGenerator } from './generator.interface';
import { IOptions } from './options.interface';
import { IEditor } from './editor.interface';
import { ISourceEditor } from './source-editor.interface';

export interface IConfig {
	'collections-config': Record<string, ICollectionConfig>;
	timezone?: string;
	source?: string;
	'base-url'?: string;
	generator?: IGenerator;
	data?: Record<string, unknown>;
	_comments?: Record<string, string>;
	_options?: IOptions;
	_editor?: IEditor;
	_source_editor?: ISourceEditor;
	_instance_values?: Record<string, string>;
	_array_structures?: Record<string, unknown>;
	_collection_groups?: Array<ICollectionGroup>;
	_select_data?: Record<string, unknown>;
	paths?: IPaths;
	loader?: string;
}

export interface ICollectionConfig {
	path: string;
	url?: string | function;
	output?: boolean;
	loader?: string;
	[key: string]: unknown;
}

export interface ICollectionGroup {
	heading: string;
	collections: Array<string>;
}
