import test from 'ava';
import { parseFile } from '../../src/parsers/parser.js';

const filePaths = {
	'test.md': new URL('./fixtures/test.md', import.meta.url).pathname,
	'json.txt': new URL('./fixtures/json.txt', import.meta.url).pathname
};

test('Parse file with default parser', async (t) => {
	const parsed = await parseFile(filePaths['test.md']);
	t.deepEqual(parsed, { hi: 'there' });
});

test('Parse file with different parser', async (t) => {
	const parsed = await parseFile(filePaths['json.txt'], 'json');
	t.deepEqual(parsed, { hi: 'there', json: 'yes' });
});

test('Parse file with custom parser', async (t) => {
	const parsed = await parseFile(filePaths['test.md'], () => ({ hello: 'mate' }));
	t.deepEqual(parsed, { hello: 'mate' });
});

test('Error for unsupported parser', async (t) => {
	await t.throwsAsync(
		async () => await parseFile(filePaths['test.md'], 'banana'),
		{ instanceOf: Error, message: 'Unsupported parser: banana' }
	);
});
