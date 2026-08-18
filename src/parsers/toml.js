import { parse as parseToml } from 'smol-toml';

export function parse(raw) {
	return parseToml(raw);
}
