import { readdir } from 'fs/promises';
import { join, extname } from 'path';
import { parseFromGrayMatter } from './helpers/parse-from-gray-matter.js';
import { buildUrl } from './helpers/url-builder.js';
import { getLoader } from './helpers/loader.js';

export async function generateInfo(config) {
	const collections = await getCollections(config);

	return {
		...config,
		time: new Date().toISOString(),
		cloudcannon: {
			name: 'ssg-reader',
			version: '0.0.1' // TODO automate this
		},
		collections: collections
	};
}

async function getCollections(config) {
	const collectionsConfig = config['collections-config'];
	const collectionKeys = Object.keys(collectionsConfig);
	const collections = {};

	for (const key of collectionKeys) {
		const loaderKey = collectionsConfig[key].loader;
		collections[key] = await getCollection(collectionsConfig[key], key, loaderKey);
	}

	return collections;
}

async function getCollection(collectionConfig, key, loaderKey) {
	const files = await readdir(join('.', collectionConfig.path));
	const parsedItems = await Promise.all(files.map(async (file) => {
		const fileWithoutExtention = file.replace(/\.[^/.]+$/, '');

		if (collectionConfig.default && collectionConfig.default === fileWithoutExtention) {
			return;
		}

		const filePath = join('.', collectionConfig.path, file);
		const fileType = extname(filePath);
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

async function parseFrontMatter(loaderType, filePath) {
	switch (loaderType) {
	case 'gray-matter':
		return await parseFromGrayMatter(filePath);
	default:
		throw new Error(`Unsupported loader: ${loaderType}`);
	}
}

