import test from 'ava';
import { buildUrl } from '../../src/util/url-builder.js';

const filePath = 'content/_posts/example-post.md';

const data = {
	id: 2,
	title: 'My Title!',
	description: 'This is a longer than usual field'
};

test('Return an empty string given no URL template', (t) => {
	t.is(buildUrl(filePath, data), '');
});

test('Return URL argument when URL template has no placeholders', (t) => {
	t.is(buildUrl(filePath, data, '/url'), '/url');
});

test('Replace file placeholders in URL template', (t) => {
	t.is(buildUrl(filePath, data, '/url/[path]'), '/url/content/_posts/example-post.md');
	t.is(buildUrl(filePath, data, '/url/[filename]'), '/url/example-post');
	t.is(buildUrl(filePath, data, '/url/[slug]'), '/url/example-post');
	t.is(buildUrl(filePath, data, '/url/[ext]'), '/url/.md');
});

test('Replace data placeholders in URL template', (t) => {
	t.is(buildUrl(filePath, data, '/url/{title}'), '/url/My Title!');
	t.is(buildUrl(filePath, data, '/url/{title}{id}'), '/url/My Title!2');
});

test('Replace data placeholders with filters in URL template', (t) => {
	t.is(buildUrl(filePath, data, '/url/{title|uppercase}/'), '/url/MY TITLE!/');
	t.is(buildUrl(filePath, data, '/url/{title|lowercase}/'), '/url/my title!/');
	t.is(buildUrl(filePath, data, '/url/{title|slugify}/'), '/url/my-title/');
	t.is(buildUrl(filePath, data, '/url/{title|slugify|uppercase}/'), '/url/MY-TITLE/');
});

test('Collapses placeholders with no value', (t) => {
	t.is(buildUrl(filePath, data, '/url/{nothing}/about.html'), '/url/about.html');
});
