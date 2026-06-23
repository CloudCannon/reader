import { load } from 'js-yaml';

export function parse(raw) {
	return load(raw);
}
