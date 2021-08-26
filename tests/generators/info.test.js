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

test('Should generate JSON info', async (t) => {
	const config = {
		'data-config': {
			authors: {
				path: 'tests/generators/fixtures/data/authors.csv'
			}
		},
		'collections-config': {
			posts: {
				default: '_defaults',
				path: 'tests/generators/fixtures/_posts',
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

	const expectedFile = await readFile(new URL('./info.json', import.meta.url));
	const expectedObject = JSON.parse(expectedFile.toString());
	const expected = JSON.stringify(expectedObject, null, 2);

	const info = await generateInfo(config);
	const result = JSON.stringify(info, null, 2);

	t.is(result, expected);
});
