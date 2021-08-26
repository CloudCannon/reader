import test from 'ava';
import { parse } from '../../src/parsers/properties.js';

test('Should parse properties', (t) => {
	t.deepEqual(parse('hi = there'), { hi: 'there' });
});
