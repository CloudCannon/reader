import { fdir } from 'fdir';
import { stat } from 'fs/promises';
import { join } from 'path';
import { parseFile } from '../parsers/parser.js';

export async function generateData(dataConfig, options) {
	dataConfig = dataConfig ?? {};
	const source = join('.', options?.source || '');

	return await Object.keys(dataConfig).reduce(async (memo, key) => {
		const datumConfig = dataConfig[key];
		const datumPath = join(source, datumConfig.path);
		const stats = await stat(datumPath);
		const data = stats.isDirectory()
			? await readDataFiles(datumConfig, source)
			: await readDataFile(datumPath, datumConfig);

		return { ...(await memo), [key]: data };
	}, {});
}

async function readDataFile(filePath, datumConfig) {
	const data = await parseFile(filePath, datumConfig.parser);
	return data;
}

async function readDataFiles(datumConfig, source) {
	const filePaths = await new fdir()
		.withBasePath()
		.filter((filePath, isDirectory) => !isDirectory && !filePath.includes('/_defaults.'))
		.crawl(join(source, datumConfig.path))
		.withPromise();

	return await Promise.all(filePaths.map(async (filePath) => {
		return await readDataFile(filePath, datumConfig);
	}));
}
