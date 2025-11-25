import assert from 'node:assert';
import { test } from 'node:test';
import { parse } from '../../src/parsers/yaml.js';

test('Parse YAML', () => {
	assert.deepStrictEqual(parse('hi: there'), { hi: 'there' });
});
