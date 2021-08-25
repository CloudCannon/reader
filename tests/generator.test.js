import test from 'ava';
import { readFile } from 'fs/promises';
import MockDate from 'mockdate';
import { generateInfo } from '../src/generator.js';

test.before((t) => {
	MockDate.set('2000-11-22');
});

test.after((t) => {
	MockDate.reset();
});

test('should generate JSON info', async (t) => {
	const config = {
		'collections-config': {
			posts: {
				default: '_defaults',
				path: 'tests/generator-site/_posts',
				loader: 'md',
				url: 'hello/:title'
			}
		},
		_comments: {},
		_options: {},
		_array_structures: {},
		_select_data: {},
		generator: {},
		_source_editor: {},
		paths: {
			uploads: 'Key'
		},
		'base-url': ''
	};

	const expectedUrl = new URL('./generator-site/_cloudcannon/info.json', import.meta.url);
	const expectedFile = await readFile(expectedUrl.pathname);
	const expectedObject = JSON.parse(expectedFile.toString());
	const expected = JSON.stringify(expectedObject, null, 2);

	const info = await generateInfo(config);
	const result = JSON.stringify(info, null, 2);

	t.is(result, expected);
});
