import { fdir } from 'fdir';
import { join } from 'path';
import { buildUrl } from '../util/url-builder.js';
import { parseFile } from '../parsers/parser.js';

export async function generateCollections(collectionsConfig = {}) {
	return await Object.keys(collectionsConfig).reduce(async (memo, key) => {
		const collection = await readCollection(collectionsConfig[key], key);
		return { ...(await memo), [key]: collection };
	}, {});
}

function getCollectionItemUrl(sourcePath, collectionConfig, data) {
	return (typeof collectionConfig.url === 'function')
		? collectionConfig.url(sourcePath, data)
		: buildUrl(data, collectionConfig.url);
}

async function readCollectionItem(filePath, collectionConfig, key) {
	const data = await parseFile(filePath, collectionConfig.parser);

	return {
		...data,
		path: filePath,
		collection: key,
		url: getCollectionItemUrl(filePath, collectionConfig, data)
	};
}

async function readCollection(collectionConfig, key) {
	const filePaths = await new fdir()
		.withBasePath()
		.filter((filePath, isDirectory) => !isDirectory && !filePath.includes('/_defaults.'))
		.crawl(join('.', collectionConfig.path))
		.withPromise();

	return await Promise.all(filePaths.map(async (filePath) => {
		return await readCollectionItem(filePath, collectionConfig, key);
	}));
}
