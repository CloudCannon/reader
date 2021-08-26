import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { parseFile } from '../parsers/parser.js';

export async function generateData(dataConfig = {}) {
	return await Object.keys(dataConfig).reduce(async (memo, key) => {
		const datumConfig = dataConfig[key];
		const stats = await stat(datumConfig.path);
		const data = stats.isDirectory()
			? await readDataFiles(datumConfig)
			: await readDataFile(join('.', datumConfig.path), datumConfig);

		return { ...(await memo), [key]: data };
	}, {});
}

async function readDataFile(sourcePath, datumConfig) {
	return await parseFile(sourcePath, datumConfig.parser);
}

async function readDataFiles(datumConfig) {
	let filePaths = await readdir(join('.', datumConfig.path)); // TODO: support nested folders?

	return await Promise.all(filePaths.map(async (filePath) => {
		const sourcePath = join('.', datumConfig.path, filePath);
		return await readDataFile(sourcePath, datumConfig);
	}));
}
