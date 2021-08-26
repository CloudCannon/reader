import test from 'ava';
import { parse } from '../../src/parsers/front-matter.js';

test('Should parse front matter for MD', (t) => {
	const raw = '---\ntitle: Nice!\n---\n# Heading\n\nContent here\n';
	t.deepEqual(parse(raw), { title: 'Nice!' });
})

test('Should parse front matter for HTML', (t) => {
	const raw = '---\ntitle: Nice!\n---\n<h1>Heading</h1>\n<p>Content here</p>\n';
	t.deepEqual(parse(raw), { title: 'Nice!' });
});

test('Should parse YAML front matter', (t) => {
	const raw = '---\ntitle: Nice!\n---';
	t.deepEqual(parse(raw), { title: 'Nice!' });
});

test('Should parse JSON front matter', (t) => {
	const raw = '---json\n{\n  "title": "Nice!"\n}\n---';
	t.deepEqual(parse(raw), { title: 'Nice!' });
})

test('Should parse TOML front matter', (t) => {
	const raw = '---toml\ntitle = "Nice!"\n---';
	t.deepEqual(parse(raw), { title: 'Nice!' });
});

test('Should error for invalid front matter', (t) => {
	const raw = '---\ntitle: ",\n---';
	t.throws(() => parse(raw));
});
