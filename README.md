# SSG Reader

Parses config, files and folder structures to create a JSON file with information about
sites made with any static site generator.

[Usage](#usage) &bull; [Documentation](#documentation) &bull; [Development](#development)

***

## Usage

Generates a JSON file at `./_cloudcannon/info.json`:

```bash
ssg-reader
```

### Configuration

SSG Reader supports a number of different configuration formats.
Configuration files should be in the root of your repository.

Formats include:

- `cloudcannon.config.js` or `cloudcannon.config.cjs`
- `cloudcannonconfig` property in `package.json`
- `.cloudcannon.json`
- `.cloudcannon.yml` or `.cloudcannon.yaml`
- `.cloudcannon.js` or `.cloudcannon.cjs`
- `cloudcannonrc` as JSON or YAML

Example content for `cloudcannon.config.js`:

```javascript
module.exports = {
  TODO: 'add other keys in here',

  // Reads from ./src instead of default .
  source: 'src',

  // Writes to ./output/_cloudcannon/info.json instead of default ./_cloudcannon/info.json
  destination: 'output',

  'data-config': {
    authors: {
      // Reads the contents of this file
      path: 'data/authors.csv'
    },
    offices: {
      // Reads the contents of each file in this directory
      path: 'data/offices'
      parser: 'json'
    }
  },

  'collections-config': {
    people: {
      path: 'content/people',
      url: '/people/[slug]'
    },
    posts: { // Collection name as key
      // Path to collection folder relative to source
      path: '_posts',

      // (Optional) - The parser used to parse the files in this collection
      // If unset, defaults to the parser associated with file extention.
      parser: 'front-matter',

      // The URL pattern for items in this collection (i.e. permalink in many SSGs). Either a string or function.
      //
      // The string supports front matter placeholders (e.g. '/post/{title}' where '{title}' is defined in front matter for each file).
      //
      // Functions are supported with `.js` or `.cjs` configs files to dynamically set URLs.
      // The function is passed `filePath` and `frontMatter` and should return a slash-prefixed URL string.
      url: (filePath, frontMatter) => `/posts/${frontMatter.title.toLowerCase()}`
      // url: '/posts/{title|lowercase}' // Same result as above
    }
  }
};
```

***

## Documentation

The `./_cloudcannon/info.json` file is initially populated with the contents
of your configuration. SSG Reader then generates values for `collections`,
`data`, `time`, and `cloudcannon`.

TODO list config options here, move comments from above to here:

### URL

The `url` in each collection config is used to build the `url` field for items in the collection.
Can be a string or a function.

Functions are given file path and front matter as arguments. The return value should be the URL.

Strings are used as a template to build the URL.
There are two types of placeholders available, file and data.
Placeholders resulting in empty values are supported. Sequential slashes in URLs are condensed to one.

File placeholders are always available, and provided by SSG Reader:

- `[path]` is the full path of the file, relative to `source`.
- `[slug]` is the filename, excluding extension.
- `[ext]` is the last extension, including `.`.

Data placeholders are populated from front matter or data values in the file, and support a number of filters:

- `{title}` is the `title` from inside the file.
- `{id}` is the `id` from inside the file.
- `{title|lowercase}` is `title` from inside the file, lower cased.
- `{category|slugify}` is `category` from inside the file, slugified.
- `{tag|slugify|uppercase}` is `tag` from inside the file, slugified, then upper cased.

### Parsers

Parsers define how SSG Reader processes your collection files into the JSON
object listed in `info.json`. You can set the parser per collection under
`collection-config`, if the default is not what you need.

These are the available parsers and default file extensions covered:

- `csv` (`.csv`)
- `front-matter` (`.md`, `.mkd`, `.markdown`, `.html`, `.htm`)
- `json` (`.json`)
- `properties` (`.properties`)
- `toml` (`.toml`)
- `yaml` (`.yaml`, `.yml`)

***

## Development

Install dependencies in for `ssg-reader`:

```bash
npm i
```

You can link this package locally to test it on a site folder.

```bash
npm link
```

Run it within your site folder:

```bash
ssg-reader
```
