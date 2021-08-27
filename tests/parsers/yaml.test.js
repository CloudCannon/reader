import test from 'ava';
import { parse } from '../../src/parsers/yaml.js';

test('Parse YAML', (t) => {
	t.deepEqual(parse('hi: there'), { hi: 'there' });
});
