import { parse as parseYaml } from 'yaml';

export function parse(raw) {
	// `core` matches js-yaml's default schema (YAML 1.2 booleans/numbers),
	// and the `timestamp` tag restores js-yaml's implicit date parsing.
	return parseYaml(raw, { schema: 'core', customTags: ['timestamp'] });
}
