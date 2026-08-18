import matter from '@11ty/gray-matter';
import { parse as parseToml } from 'smol-toml';
import { parse as parseYaml } from './yaml.js';

export function parse(raw) {
	return matter(raw, {
		engines: {
			toml: parseToml,
			yaml: parseYaml,
		},
	}).data;
}
