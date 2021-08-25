import test from 'ava';
import { parseFromGrayMatter } from '../src/helpers/parse-from-gray-matter.js';

test('should return correct data from md', async (t) => {
	const filePath = new URL('fixture/input-collection-item.md', import.meta.url);
	const result = await parseFromGrayMatter(filePath.pathname);
	const expected = { title: 'Nice!' };

	t.deepEqual(result, expected);
	t.is(typeof result, 'object');
	t.falsy(Array.isArray(result));
})

test('should return correct data from html', async (t) => {
	const filePath = new URL('fixture/input-collection-item.html', import.meta.url);
	const result = await parseFromGrayMatter(filePath.pathname);
	const expected = { title: 'Nice!' };

	t.deepEqual(result, expected);
	t.is(typeof result, 'object');
	t.falsy(Array.isArray(result));
});

test('should return correct data from json', async (t) => {
	const filePath = new URL('fixture/input-collection-item.json', import.meta.url);
	const result = await parseFromGrayMatter(filePath.pathname);
	const expected = { title: 'Nice!' };

	t.deepEqual(result, expected);
	t.is(typeof result, 'object');
	t.falsy(Array.isArray(result));
})

test('should return correct data from yaml', async (t) => {
	const filePath = new URL('fixture/input-collection-item.yaml', import.meta.url);
	const result = await parseFromGrayMatter(filePath.pathname);
	const expected = { title: 'Nice!' };

	t.deepEqual(result, expected);
	t.is(typeof result, 'object');
	t.falsy(Array.isArray(result));
});

test('should return correct data from toml', async (t) => {
	const filePath = new URL('fixture/input-collection-item.toml', import.meta.url);
	const result = await parseFromGrayMatter(filePath.pathname);
	const expected = { title: 'Nice!' };

	t.deepEqual(result, expected);
	t.is(typeof result, 'object');
	t.falsy(Array.isArray(result));
});

test('should not throw is filePath is correct', async (t) => {
	const filePath = new URL('fixture/input-collection-item.md', import.meta.url);
	await t.notThrowsAsync(async (t) => await parseFromGrayMatter(filePath.pathname));
});

test('should throw if invalid fileType', async (t) => {
	const filePath = new URL('fixture/incorrect-input-collection-item.md', import.meta.url);
	await t.throwsAsync(async (t) => await parseFromGrayMatter(filePath.pathname));
});

test('should throw if file does not exist', async (t) => {
	const filePath = new URL('fake.md', import.meta.url);
	await t.throwsAsync(async (t) => await parseFromGrayMatter(filePath.pathname));
});
