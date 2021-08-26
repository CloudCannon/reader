import { parse as parseProperties } from 'properties';

export function parse(raw) {
	return parseProperties(raw);
}
