import assert from 'node:assert';
import { test } from 'node:test';
import { parse } from '../../src/parsers/json.js';

test('Parse JSON', () => {
	assert.deepStrictEqual(parse('{ "hi": "there" }'), { hi: 'there' });
});
