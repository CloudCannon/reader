import { readFile } from 'fs/promises';
import { extname } from 'path';
import { parse as parseCsv } from './csv.js';
import { parse as parseFrontMatter } from './front-matter.js';
import { parse as parseJson } from './json.js';
import { parse as parseToml } from './toml.js';
import { parse as parseYaml } from './yaml.js';
import { parse as parseProperties } from './properties.js';

const defaultParsers = {
	csv: 'csv',
	htm: 'front-matter',
	html: 'front-matter',
	json: 'json',
	markdown: 'front-matter',
	md: 'front-matter',
	mkd: 'front-matter',
	properties: 'properties',
	toml: 'toml',
	yaml: 'yaml',
	yml: 'yaml'
};

export async function parseFile(filePath, parser) {
	const raw = await readFile(filePath, 'utf8');

	if (typeof parser === 'function') {
		return parser(raw, filePath);
	}

	parser = parser || defaultParsers[extname(filePath).replace(/^\.+/, '')];

	switch (parser) {
	case 'csv':
		return parseCsv(raw);
	case 'front-matter':
		return parseFrontMatter(raw);
	case 'json':
		return parseJson(raw);
	case 'toml':
		return parseToml(raw);
	case 'yaml':
		return parseYaml(raw);
	case 'properties':
		return parseProperties(raw);
	default:
		throw new Error(`Unsupported parser: ${parser}`);
	}
}