import assert from 'node:assert';
import { test } from 'node:test';
import { parse } from '../../src/parsers/front-matter.js';

test('Parse front matter for MD', () => {
	const raw = '---\ntitle: Nice!\n---\n# Heading\n\nContent here\n';
	assert.deepStrictEqual(parse(raw), { title: 'Nice!' });
});

test('Parse front matter for HTML', () => {
	const raw = '---\ntitle: Nice!\n---\n<h1>Heading</h1>\n<p>Content here</p>\n';
	assert.deepStrictEqual(parse(raw), { title: 'Nice!' });
});

test('Parse YAML front matter', () => {
	const raw = '---\ntitle: Nice!\n---';
	assert.deepStrictEqual(parse(raw), { title: 'Nice!' });
});

test('Parse JSON front matter', () => {
	const raw = '---json\n{\n  "title": "Nice!"\n}\n---';
	assert.deepStrictEqual(parse(raw), { title: 'Nice!' });
});

test('Parse TOML front matter', () => {
	const raw = '---toml\ntitle = "Nice!"\n---';
	assert.deepEqual(parse(raw), { title: 'Nice!' });
});

test('Error for invalid front matter', () => {
	const raw = '---\ntitle: ",\n---';
	assert.throws(() => parse(raw));
});
