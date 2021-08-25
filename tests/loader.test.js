import test from 'ava';
import { getLoader } from '../src/helpers/loader.js';

test('should get loader for fileType', (t) => {
	t.is(getLoader('.md'), 'gray-matter');
});

test('should get loader for fileType and loader', (t) => {
	t.is(getLoader('.md', 'html'), 'gray-matter');
});
