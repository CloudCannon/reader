import test from 'ava';
import { readFile } from 'fs/promises';
import MockDate from 'mockdate';
import { generateInfo } from '../../src/generators/info.js';

test.before(() => {
	MockDate.set('2000-11-22');
});

test.after(() => {
	MockDate.reset();
});

async function readJsonFile(path) {
	const expectedFile = await readFile(new URL(path, import.meta.url));
	return JSON.parse(expectedFile.toString());
}

async function runTest(t, key) {
	const config = await readJsonFile(`./fixtures/${key}.json`);
	const expectedObject = await readJsonFile(`./expected/${key}.json`);
	const expectedInfo = JSON.stringify(expectedObject, null, 2);

	const infoObject = await generateInfo(config, { version: '0.0.1' });
	const info = JSON.stringify(infoObject, null, 2);

	t.is(info, expectedInfo);
}

test('Generate JSON info', async (t) => runTest(t, 'standard'));
test('Generate JSON info with custom source', async (t) => runTest(t, 'custom-source'));
test('Generate JSON info with globs', async (t) => runTest(t, 'globs'));
test('Generate JSON info with null fields', async (t) => runTest(t, 'null-fields'));
test('Generate JSON info with nested collections', async (t) => runTest(t, 'nested-collections'));
