import test from 'ava';
import { parse } from '../../src/parsers/toml.js';

test('Parse TOML', (t) => {
	t.deepEqual(parse('hi = "there"'), { hi: 'there' });
});
