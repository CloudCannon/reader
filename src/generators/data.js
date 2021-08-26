import { fdir } from 'fdir';
import { stat } from 'fs/promises';
import { join } from 'path';
import { parseFile } from '../parsers/parser.js';

export async function generateData(dataConfig = {}) {
	return await Object.keys(dataConfig).reduce(async (memo, key) => {
		const datumConfig = dataConfig[key];
		const datumPath = join('.', datumConfig.path);
		const stats = await stat(datumPath);
		const data = stats.isDirectory()
			? await readDataFiles(datumConfig)
			: await readDataFile(join('.', datumPath), datumConfig);

		return { ...(await memo), [key]: data };
	}, {});
}

async function readDataFile(filePath, datumConfig) {
	return await parseFile(filePath, datumConfig.parser);
}

async function readDataFiles(datumConfig) {
	const filePaths = await new fdir()
		.withBasePath()
		.filter((filePath, isDirectory) => !isDirectory && !filePath.includes('/_defaults.'))
		.crawl(join('.', datumConfig.path))
		.withPromise();

	return await Promise.all(filePaths.map(async (filePath) => {
		return await readDataFile(filePath, datumConfig);
	}));
}
