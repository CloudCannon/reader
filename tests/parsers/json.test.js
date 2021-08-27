import test from 'ava';
import { parse } from '../../src/parsers/json.js';

test('Parse JSON', (t) => {
	t.deepEqual(parse('{ "hi": "there" }'), { hi: 'there' });
});
