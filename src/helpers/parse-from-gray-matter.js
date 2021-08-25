import matter from 'gray-matter';
import { readFile } from 'fs/promises';
import * as toml from 'toml';
import { extname } from 'path';

export async function parseFromGrayMatter(filePath) {
	const fileContents = await readFile(filePath, 'utf8');
	const fileExt = extname(filePath);
	let options;

	if (fileExt === '.toml') {
		options = { engines: { toml: toml.parse.bind(toml) } };
	}

	return matter(fileContents, options).data;
}
