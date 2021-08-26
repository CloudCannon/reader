import { parse as parseToml } from 'toml';

export function parse(raw) {
	return parseToml(raw);
}
