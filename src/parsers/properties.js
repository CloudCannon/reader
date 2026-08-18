import { parse as parseProperties } from 'dot-properties';

export function parse(raw) {
	return parseProperties(raw);
}
