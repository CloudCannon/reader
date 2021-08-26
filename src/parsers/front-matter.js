import matter from 'gray-matter';
import { parse as parseToml } from 'toml';

export function parse(raw) {
	return matter(raw, {
		engines: {
			toml: parseToml
		}
	}).data;
}
