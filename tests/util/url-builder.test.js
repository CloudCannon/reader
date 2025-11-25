import assert from 'node:assert';
import { test } from 'node:test';
import { buildUrl } from '../../src/util/url-builder.js';

const filePath = 'content/_posts/example-post.md';
const longFilePath = 'content/_posts/in/here/example-post.md';
const collectionConfig = { path: 'content/_posts' };
const indexFilePath = 'content/pages/index.md';
const underscoreIndexFilePath = 'content/pages/_index.md';

const data = {
	id: 2,
	date: new Date('2021-01-09T09:39:05.237Z'),
	title: 'My TiTle!',
	description: 'This is a longer than usual field',
};

test('Return an empty string given no URL template', () => {
	assert.strictEqual(buildUrl(filePath, data), '');
});

test('Return URL argument when URL template has no placeholders', () => {
	assert.strictEqual(buildUrl(filePath, data, '/url'), '/url');
});

test('Replace file placeholders in URL template', () => {
	assert.strictEqual(
		buildUrl(filePath, data, '/url/[path]'),
		'/url/content/_posts/example-post.md'
	);
	assert.strictEqual(buildUrl(filePath, data, '/url/[slug]'), '/url/example-post');
	assert.strictEqual(buildUrl(filePath, data, '/url/[ext]'), '/url/.md');
	assert.strictEqual(buildUrl(filePath, data, '/url/[filename]'), '/url/example-post.md');

	assert.strictEqual(
		buildUrl(filePath, data, '/[relative_path]'),
		'/content/_posts/example-post.md'
	);
	assert.strictEqual(buildUrl(filePath, data, '/[base_path]'), '/content/_posts');
	assert.strictEqual(buildUrl(filePath, data, '/[relative_base_path]'), '/content/_posts');
	assert.strictEqual(buildUrl(filePath, data, '/[full_slug]'), '/content/_posts/example-post');

	assert.strictEqual(
		buildUrl(longFilePath, data, { url: '[base_path]', ...collectionConfig }),
		'content/_posts/in/here'
	);
	assert.strictEqual(
		buildUrl(longFilePath, data, {
			url: '[relative_base_path]',
			...collectionConfig,
		}),
		'in/here'
	);
	assert.strictEqual(
		buildUrl(longFilePath, data, {
			url: '[relative_path]',
			...collectionConfig,
		}),
		'in/here/example-post.md'
	);
	assert.strictEqual(
		buildUrl(longFilePath, data, { url: '[full_slug]', ...collectionConfig }),
		'in/here/example-post'
	);
});

test('Replace index for file placeholders in URL template', () => {
	assert.strictEqual(buildUrl(indexFilePath, data, '/[slug]'), '/');
	assert.strictEqual(buildUrl(indexFilePath, data, '/nested/[slug]'), '/nested/');
});

test('Replace underscore index for file placeholders in URL template', () => {
	assert.strictEqual(buildUrl(underscoreIndexFilePath, data, '/[slug]'), '/');
	assert.strictEqual(buildUrl(underscoreIndexFilePath, data, '/nested/[slug]'), '/nested/');
});

test('Replace data placeholders in URL template', () => {
	assert.strictEqual(buildUrl(filePath, data, '/url/{title}'), '/url/My TiTle!');
	assert.strictEqual(buildUrl(filePath, data, '/url/{title}{id}'), '/url/My TiTle!2');
});

test('Replace data placeholders with filters in URL template', () => {
	assert.strictEqual(buildUrl(filePath, data, '/url/{title|uppercase}/'), '/url/MY TITLE!/');
	assert.strictEqual(buildUrl(filePath, data, '/url/{title|lowercase}/'), '/url/my title!/');
	assert.strictEqual(buildUrl(filePath, data, '/url/{title|slugify}/'), '/url/my-title/');
	assert.strictEqual(buildUrl(filePath, data, '/url/{title|slugify|uppercase}/'), '/url/MY-TITLE/');
});

test('Replace data placeholders with date filters in URL template', () => {
	assert.strictEqual(buildUrl(filePath, data, '/url/{date|year}/'), '/url/2021/');
	assert.strictEqual(buildUrl(filePath, data, '/url/{date|month}/'), '/url/01/');
	assert.strictEqual(buildUrl(filePath, data, '/url/{date|day}/'), '/url/09/');
});

test('Collapses placeholders with no value', () => {
	assert.strictEqual(buildUrl(filePath, data, '/url/{nothing}/about.html'), '/url/about.html');
});

test('Builds URL with function template', async () => {
	let passedFilters = {};

	const url = buildUrl('abc', { hi: 'there' }, (filePath, parsed, { filters }) => {
		passedFilters = filters;
		return `/${parsed.hi}/${filters.uppercase(filePath)}`;
	});

	assert.strictEqual(url, '/there/ABC');
	assert.deepStrictEqual(Object.keys(passedFilters), [
		'uppercase',
		'lowercase',
		'slugify',
		'year',
		'month',
		'day',
	]);
});

test('Builds URL with function template buildUrl fallback', async () => {
	const url = buildUrl('abc', { hi: 'there' }, (filePath, content, { buildUrl }) => {
		return buildUrl(filePath, content, '/{hi|uppercase}.hello');
	});

	assert.strictEqual(url, '/THERE.hello');
});
