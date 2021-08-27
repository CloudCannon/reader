import test from 'ava';
import { parse } from '../../src/parsers/front-matter.js';

test('Parse front matter for MD', (t) => {
	const raw = '---\ntitle: Nice!\n---\n# Heading\n\nContent here\n';
	t.deepEqual(parse(raw), { title: 'Nice!' });
})

test('Parse front matter for HTML', (t) => {
	const raw = '---\ntitle: Nice!\n---\n<h1>Heading</h1>\n<p>Content here</p>\n';
	t.deepEqual(parse(raw), { title: 'Nice!' });
});

test('Parse YAML front matter', (t) => {
	const raw = '---\ntitle: Nice!\n---';
	t.deepEqual(parse(raw), { title: 'Nice!' });
});

test('Parse JSON front matter', (t) => {
	const raw = '---json\n{\n  "title": "Nice!"\n}\n---';
	t.deepEqual(parse(raw), { title: 'Nice!' });
})

test('Parse TOML front matter', (t) => {
	const raw = '---toml\ntitle = "Nice!"\n---';
	t.deepEqual(parse(raw), { title: 'Nice!' });
});

test('Error for invalid front matter', (t) => {
	const raw = '---\ntitle: ",\n---';
	t.throws(() => parse(raw));
});
