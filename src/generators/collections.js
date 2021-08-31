import { fdir } from 'fdir';
import { join } from 'path';
import { buildUrl, filters } from '../util/url-builder.js';
import { parseFile } from '../parsers/parser.js';

export async function generateCollections(collectionsConfig = {}, options) {
	const source = join('.', options?.source || '');

	return await Object.keys(collectionsConfig).reduce(async (memo, key) => {
		const collection = await readCollection(collectionsConfig[key], key, source);
		return { ...(await memo), [key]: collection };
	}, {});
}

function getCollectionItemUrl(itemPath, collectionConfig, data) {
	return (typeof collectionConfig.url === 'function')
		? collectionConfig.url(itemPath, data, filters)
		: buildUrl(itemPath, data, collectionConfig.url);
}

async function readCollectionItem(filePath, collectionConfig, key, source) {
	const data = await parseFile(filePath, collectionConfig.parser);
	const itemPath = source && filePath.startsWith(source)
		? filePath.slice(source.length + 1) // +1 for slash after source
		: filePath;

	return {
		...data,
		path: itemPath,
		collection: key,
		url: getCollectionItemUrl(itemPath, collectionConfig, data)
	};
}

async function readCollection(collectionConfig, key, source) {
	const filePaths = await new fdir()
		.withBasePath()
		.filter((filePath, isDirectory) => !isDirectory && !filePath.includes('/_defaults.'))
		.crawl(join(source, collectionConfig.path))
		.withPromise();

	return await Promise.all(filePaths.map(async (filePath) => {
		return await readCollectionItem(filePath, collectionConfig, key, source);
	}));
}
