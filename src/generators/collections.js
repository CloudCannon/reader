import chalk from 'chalk';
import { fdir } from 'fdir';
import { join } from 'path';
import { buildUrl } from '../util/url-builder.js';
import log from '../util/logger.js';
import { parseFile } from '../parsers/parser.js';

export async function generateCollections(collectionsConfig = {}, options) {
	collectionsConfig = collectionsConfig ?? {};
	const source = join('.', options?.source || '');

	return await Object.keys(collectionsConfig).reduce(async (memo, key) => {
		const collection = await readCollection(collectionsConfig[key], key, source);
		return { ...(await memo), [key]: collection };
	}, {});
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

async function readCollection(collectionConfig, key, source) {
	const crawler = new fdir()
		.withBasePath()
		.filter((filePath, isDirectory) => !isDirectory && !filePath.includes('/_defaults.'));

	const glob = typeof collectionConfig.glob === 'string'
		? [collectionConfig.glob]
		: collectionConfig.glob;

	if (collectionConfig.glob) {
		crawler.glob(glob);
	}

	const filePaths = await crawler
		.crawl(join(source, collectionConfig.path))
		.withPromise();

	return await filePaths.reduce(async (memo, filePath) => {
		const collectionItem = await readCollectionItem(filePath, collectionConfig, key, source);
		return collectionItem
			? [...(await memo), collectionItem]
			: await memo;
	}, []);
}
