import test from 'ava';
import { buildUrl } from '../../src/util/url-builder.js';

test('Return an empty string given no URL template', (t) => {
	const frontMatter = { string: 'string' };
	const expected = '';
	const result = buildUrl(frontMatter);

	t.is(result, expected);
});

test('Return URL argument when URL template has no placeholders', (t) => {
	const frontMatter = { thing: '/thing/' }
	const url = '/url';
	const result = buildUrl(frontMatter, url);

	t.is(result, url);
});

test('Replace a placeholder in URL template', (t) => {
	const expected = '/url/my-title';
	const frontMatter = { title: 'my-title' };
	const result = buildUrl(frontMatter, '/url/:title')

	t.is(result, expected);
});

test('Error if placeholder has no matching data', (t) => {
	const frontMatter = { notTitle: 'my-title' };
	const error = t.throws(() => buildUrl(frontMatter, '/url/:title'), { instanceOf: Error });

	t.is(error.message, ':title does not exist in config');
});
