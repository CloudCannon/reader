import assert from 'node:assert';
import { test } from 'node:test';
import { parseFile } from '../../src/parsers/parser.js';

const filePaths = {
	'test.md': new URL('./fixtures/test.md', import.meta.url).pathname,
	'json.txt': new URL('./fixtures/json.txt', import.meta.url).pathname,
};

test('Parse file with default parser', async () => {
	const parsed = await parseFile(filePaths['test.md']);
	assert.deepStrictEqual(parsed, { hi: 'there' });
});

test('Parse file with different parser', async () => {
	const parsed = await parseFile(filePaths['json.txt'], 'json');
	assert.deepStrictEqual(parsed, { hi: 'there', json: 'yes' });
});

test('Parse file with custom parser', async () => {
	const parsed = await parseFile(filePaths['test.md'], () => ({
		hello: 'mate',
	}));
	assert.deepStrictEqual(parsed, { hello: 'mate' });
});

test('Error for unsupported parser', async () => {
	await assert.rejects(async () => await parseFile(filePaths['test.md'], 'banana'), {
		name: 'Error',
		message: 'unsupported parser banana',
	});
});
