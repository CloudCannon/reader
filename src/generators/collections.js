import { readdir } from 'fs/promises';
import { join, basename, extname } from 'path';
import { buildUrl } from '../util/url-builder.js';
import { parseFile } from '../parsers/parser.js';

export async function generateCollections(collectionsConfig = {}) {
	const collectionKeys = Object.keys(collectionsConfig);

	return await collectionKeys.reduce(async (memo, key) => {
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
	const sourcePath = join('.', collectionConfig.path, filePath);
	const data = await parseFile(sourcePath, collectionConfig.parser);

	return {
		...data,
		path: sourcePath,
		collection: key,
		url: getCollectionItemUrl(sourcePath, collectionConfig, data)
	};
}

async function readCollection(collectionConfig, key) {
	let filePaths = await readdir(join('.', collectionConfig.path)); // TODO: support nested folders?

	if (collectionConfig.default) {
		// Remove collection defaults file
		filePaths = filePaths.filter((filePath) => {
			const filenameWithoutExtension = basename(filePath, extname(filePath));
			return collectionConfig.default !== filenameWithoutExtension;
		});
	}

	return await Promise.all(filePaths.map(async (filePath) => {
		return await readCollectionItem(filePath, collectionConfig, key);
	}));
}
