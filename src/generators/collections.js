import chalk from 'chalk';
import { fdir } from 'fdir';
import { join } from 'path';
import { buildUrl } from '../util/url-builder.js';
import log from '../util/logger.js';
import { parseFile } from '../parsers/parser.js';

async function getCollectionFilePaths(collectionConfig, source) {
	const crawler = new fdir()
		.withBasePath()
		.filter((filePath, isDirectory) => !isDirectory && !filePath.includes('/_defaults.'));

	const crawlDirectory = join(source, collectionConfig.path);

	const glob = typeof collectionConfig.glob === 'string'
		? [collectionConfig.glob]
		: collectionConfig.glob;

	if (collectionConfig.glob) {
		crawler.glob(glob);
	}

	return crawler
		.crawl(crawlDirectory)
		.withPromise();
}

// Sort on longest path first to ensure files are assigned to most specific collection
function getSortedCollectionKeys(collectionsConfig) {
	return Object.keys(collectionsConfig).sort((a, b) => {
		const bPathLength = collectionsConfig[b].path?.length || 0;
		const aPathLength = collectionsConfig[a].path?.length || 0;
		return bPathLength - aPathLength;
	});
}

export async function generateCollections(collectionsConfig, options) {
	collectionsConfig = collectionsConfig || {};
	const source = join('.', options?.source || '');
	const sortedCollectionKeys = getSortedCollectionKeys(collectionsConfig);
	const seen = {};
	const collections = {};

	for (var i = 0; i < sortedCollectionKeys.length; i++) {
		const key = sortedCollectionKeys[i];
		collections[key] = await readCollection(collectionsConfig[key], key, source, seen);
	}

	return collections;
}

async function readCollectionItem(filePath, collectionConfig, key, source) {
	try {
		const data = await parseFile(filePath, collectionConfig.parser);
		const itemPath = source && filePath.startsWith(source)
			? filePath.slice(source.length + 1) // +1 for slash after source
			: filePath;

		return {
			...data,
			path: itemPath,
			collection: key,
			url: buildUrl(itemPath, data, collectionConfig)
		};
	} catch (e) {
		log(`   ${chalk.bold(filePath)} skipped due to ${chalk.red(e.message)}`);
	}
}

async function readCollection(collectionConfig, key, source, seen) {
	const filePaths = await getCollectionFilePaths(collectionConfig, source);

	return await filePaths.reduce(async (memo, filePath) => {
		// Ignores files that have been assigned to more specific collections
		if (seen[filePath]) {
			return await memo;
		}

		seen[filePath] = true;

		const collectionItem = await readCollectionItem(filePath, collectionConfig, key, source);
		const collectionItems = await memo;

		if (collectionItem) {
			collectionItems.push(collectionItem);
		}

		return collectionItems;
	}, []);
}
