import test from 'ava';
import { parse } from '../../src/parsers/csv.js';

test('Should parse CSV', (t) => {
	const raw = 'hi,name\ngreetings,jim\nhello,pam';

	t.deepEqual(parse(raw), [
		{ hi: 'greetings', name: 'jim' },
		{ hi: 'hello', name: 'pam' }
	]);
});
