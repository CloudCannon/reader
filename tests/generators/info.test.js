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

test('Generate JSON info', async (t) => {
	const config = await readJsonFile('./fixtures/standard.json');
	const expectedObject = await readJsonFile('./expected/standard.json');
	const expectedInfo = JSON.stringify(expectedObject, null, 2);

	const infoObject = await generateInfo(config);
	const info = JSON.stringify(infoObject, null, 2);

	t.is(info, expectedInfo);
});

test('Generate JSON info with custom source', async (t) => {
	const config = await readJsonFile('./fixtures/custom-source.json');
	const expectedObject = await readJsonFile('./expected/custom-source.json');
	const expectedInfo = JSON.stringify(expectedObject, null, 2);

	const infoObject = await generateInfo(config);
	const info = JSON.stringify(infoObject, null, 2);

	t.is(info, expectedInfo);
});
