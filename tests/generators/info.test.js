import assert from 'node:assert';
import { readFile } from 'node:fs/promises';
import { mock, test } from 'node:test';
import { generateInfo } from '../../src/generators/info.js';

mock.timers.enable();

async function readJsonFile(path) {
	const expectedFile = await readFile(new URL(path, import.meta.url));
	return JSON.parse(expectedFile.toString());
}

async function runTest(key) {
	const config = await readJsonFile(`./fixtures/${key}.json`);
	const expectedObject = await readJsonFile(`./expected/${key}.json`);
	const expectedInfo = JSON.stringify(expectedObject, null, 2);

	const infoObject = await generateInfo(config, { version: '0.0.1' });
	const info = JSON.stringify(infoObject, null, 2);

	assert.strictEqual(info, expectedInfo);
}

test('Generate JSON info', async () => runTest('standard'));
test('Generate JSON info with custom source', async () => runTest('custom-source'));
test('Generate JSON info with globs', async () => runTest('globs'));
test('Generate JSON info with a root glob', async () => runTest('root-glob'));
test('Generate JSON info with null fields', async () => runTest('null-fields'));
test('Generate JSON info with nested collections', async () => runTest('nested-collections'));
