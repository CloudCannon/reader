import test from 'ava';
import { parse } from '../../src/parsers/csv.js';

test('Parse CSV', (t) => {
	const raw = 'hi,name\ngreetings,Jim\nhello,Pam';

	t.deepEqual(parse(raw), [
		{ hi: 'greetings', name: 'Jim' },
		{ hi: 'hello', name: 'Pam' }
	]);
});
