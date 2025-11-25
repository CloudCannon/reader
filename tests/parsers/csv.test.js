import assert from 'node:assert';
import { test } from 'node:test';
import { parse } from '../../src/parsers/csv.js';

test('Parse CSV', () => {
	const raw = 'hi,name\ngreetings,Jim\nhello,Pam';

	assert.deepStrictEqual(parse(raw), [
		{ hi: 'greetings', name: 'Jim' },
		{ hi: 'hello', name: 'Pam' },
	]);
});
