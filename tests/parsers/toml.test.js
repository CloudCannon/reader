import assert from 'node:assert';
import { test } from 'node:test';
import { parse } from '../../src/parsers/toml.js';

test('Parse TOML', () => {
	assert.deepEqual(parse('hi = "there"'), { hi: 'there' });
});
