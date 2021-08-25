import { readdir } from 'fs/promises';
import * as path from 'path';
import { IConfig, ICollectionConfig } from './interfaces/config.interface';
import { IInfo, ICollections, ICollectionItem } from './interfaces/info.interface'
import { IFrontMatter } from './interfaces/front-matter.interface'
import { parseFromGrayMatter } from './helper/parse-from-gray-matter'; 
import { buildUrl } from './helper/url-builder';
import { getLoader } from './helper/loader';

// Populates module.exports.name and module.exports.version
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('pkginfo')(module, 'version', 'name');

export async function generateInfo(config: IConfig): Promise<IInfo> {
	const collections = await getCollections(config);

	return {
		...config,
		time: new Date().toISOString(),
		cloudcannon: {
			name: module.exports.name,
			version: module.exports.version
		},
		collections: collections
	};
}

async function getCollections(config: IConfig): Promise<ICollections> {
	const { 'collections-config': collectionsConfig } = config;
	const keys = Object.keys(collectionsConfig);
	const collections: ICollections = {};

	for (const key of keys) {
		const loaderKey = collectionsConfig[key].loader;
		collections[key] = await getCollection(collectionsConfig[key], key, loaderKey);
	}

	return collections;
}

async function getCollection(collectionConfig: ICollectionConfig, key: string, loaderKey?: string): Promise<Array<ICollectionItem>> {
	const files = await readdir(path.join('.', collectionConfig.path));
	const parsedItems = await Promise.all(files.map(async (file) => {
		const fileWithoutExtention = file.replace(/\.[^/.]+$/, '');

		if (collectionConfig.default && collectionConfig.default === fileWithoutExtention) {
			return;
		}

		const filePath = path.join('.', collectionConfig.path, file);
		const fileType = path.extname(filePath);
		const loaderType = getLoader(fileType, loaderKey);
		const frontMatter = await parseFrontMatter(loaderType, filePath);

		const url = (typeof collectionConfig.url === 'function')
			? collectionConfig.url(filePath, frontMatter)
			: buildUrl(frontMatter, collectionConfig.url);

		return {
			...frontMatter,
			path: filePath,
			collection: key,
			url: url
		};
	}));

	return parsedItems?.filter((a) => !!a);
}

async function parseFrontMatter(loaderType: string, filePath: string): Promise<IFrontMatter> {
	switch (loaderType) {
	case 'gray-matter':
		return await parseFromGrayMatter(filePath);
	default:
		throw new Error(`Unsupported loader: ${loaderType}`);
	}
}

