import { IConfig } from './config.interface';

export interface IInfo extends IConfig {
	time: string;
	cloudcannon: ICloudCannon;
	pages?: Array<IPage>;
	'static-pages'?: Array<IPage>;
	collections: ICollections;
}

export interface IPage {
	path: string;
	url: string;
	[key: string]: unknown;
}

export interface ICollectionItem extends IPage {
	collection: string;
}

export interface ICollections {
	[key: string]: Array[ICollectionItem]
}

interface ICloudCannon {
	name: string;
	version: string;
}
