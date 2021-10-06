# Reader

Parses config, files and folder structures to create a JSON file with information about sites made with any static site generator. The JSON is structured with the [build-info-schema](https://github.com/CloudCannon/build-info-schema) for [CloudCannon](https://cloudcannon.com/) to create an editing interface.

[![npm version](https://badge.fury.io/js/@cloudcannon%2Freader.svg)](https://www.npmjs.com/package/@cloudcannon/reader)

***

- [Usage](#usage)
- [Configuration](#configuration)
- [Documentation](#documentation)
  - [Source](#source)
  - [Output](#output)
  - [Data](#data)
  - [Collections](#collections)
  - [CloudCannon](#cloudcannon)
- [Parsers](#parsers)
- [Development](#development)
- [License](#license)

***

## Usage

To generate a JSON file at `./_cloudcannon/info.json`:

```bash
$ cloudcannon-reader
```

```bash
$ cloudcannon-reader --help

Usage
  $ cloudcannon-reader [options]

Options
  --version     Print the current version
  --config, -c  Use a specific configuration file
  --output, -o  Write to a different location than .
  --quiet, -q   Disable logging

Examples
  $ cloudcannon-reader --config "cloudcannon.dev.config.json"
  $ cloudcannon-reader --output "public"
```

## Configuration

Configuration files must be in the same directory you run `cloudcannon-reader`. The first file found is used, the files supported are:

- `cloudcannon` property in `package.json`
- `cloudcannon.config.json`
- `cloudcannon.config.yaml`
- `cloudcannon.config.yml`
- `cloudcannon.config.js`
- `cloudcannon.config.cjs`

Example content for `cloudcannon.config.cjs`:

```javascript
module.exports = {
  // Global CloudCannon configuration
  _comments: {
    title: 'The title of your page.'
  },

  // Read from ./src instead of .
  source: 'src',

  // Write to ./output/_cloudcannon/info.json instead of ./_cloudcannon/info.json
  output: 'output',

  // Populates the sidebar navigation and provides metadata for the editor
  'collections-config': {
    people: {
      // Reads the contents of each file in this directory
      path: 'content/people',

      // The URL template for items in this collection
      url: '/people/{department|slugify}/[slug]/',

      // CloudCannon collection-level configuration
      name: 'Personnel',
      _enabled_editors: ['data']
    },
    posts: {
      // Reads the contents of each file in this directory
      path: '_posts',

      // How to parse the files in this collection
      parser: 'front-matter',

      // The URL function for items in this collection
      url: (filePath, parsed, { filters }) => {
        const year = new Date(parsed.date).getFullYear();
        const slug = filters.slugify(parsed.title || '');
        return `/posts/${year}/${slug}/`;
      }
    },
    data: {
      // Reads the contents of each file in this directory
      path: 'data',

      // How to parse the files in this collection
      parser: (filePath, raw, { parsers, filters }) => {
        const parsed = parsers['front-matter'].parse(raw);
        const slug = filters.slugify(parsed.title || '');
        return { ...data, slug };
      }
    }
  },

  // Generates the data for select and multiselect inputs matching these names
  'data-config': {
    authors: {
      // Reads the contents of this file
      path: 'data/authors.csv'
    },
    offices: {
      // Reads the contents of each file in this directory
      path: 'data/offices',
      parser: 'json'
    }
  }
};
```

***

## Documentation

The `./_cloudcannon/info.json` file is initially populated with the contents of your configuration. `cloudcannon-reader` then generates values for `collections`, `data`, `time`, and `cloudcannon`.

### Source

The `source` settings changes where to read from another folder. The `path` value for collection items is relative to `source`. Defaults to `'.'`.

### Output

The `output` settings changes where to write the `_cloudcannon` folder containing `info.json`. Defaults to `'.'`.

### Data

The `data-config` defines how data files should be read and parsed into the JSON representation. Defaults to `{}`.

```json
{
  "data-config": {
    "locations": {
      "path": "data/locations.csv"
    },
    "offices": {
      "path": "data/offices",
      "parser": "front-matter"
    }
  }
}
```

The available keys in each data set configuration are:

<details>
  <summary><code>path</code></summary>

> The `path` is a reference to either:
>
> - The top-most folder where the files in this data set are stored.
> - The file containing the data.
>
> Both options are relative to `source`.

</details>

<details>
  <summary><code>parser</code> (optional)</summary>

> The `parser` field should state which [Parser](#parsers) you want to use to read the file or files in this data set.

</details>

### Collections

The `collections-config` object defines how collections and their files should be read and parsed into the JSON representation. Defaults to `{}`.

```json
{
  "collections-config": {
    "posts": {
      "path": "content/posts",
      "parser": "yaml",
      "url": "/posts/{category|slugify}/[slug].html"
    }
  }
}
```

Matches the collection-level configuration format for CloudCannon, which is also set here (e.g. `name`, `_enabled_editors`, `_add_options`).

The keys available in each collection configuration are:

<details>
  <summary><code>path</code></summary>

> The `path` is the top-most folder where the files in this collection are stored. It is relative to `source`.

</details>

<details>
  <summary><code>url</code> (optional)</summary>

> The `url` is used to build the `url` field for items in the collection. Similar to permalink in many SSGs. Can be a string or a function. Defaults to `''`.
>
> Functions are are supported with `.js` or `.cjs` files. Given file path, parsed file content and an object with filters as arguments. The return value should be the slash-prefixed URL string.
>
> Strings are used as a template to build the URL. There are two types of placeholders available, file and data. Placeholders resulting in empty values are supported. Sequential slashes in URLs are condensed to one.
>
> File placeholders are always available, and provided by `cloudcannon-reader`:
>
> - `[path]` is the full path of the file, relative to `source`.
> - `[slug]` is the filename, excluding extension.
> - `[ext]` is the last extension, including `.`.
>
> Data placeholders are populated from front matter or data values in the file, and support a number of filters:
>
> - `{title}` is the `title` from inside the file.
> - `{id}` is the `id` from inside the file.
> - `{title|lowercase}` is `title` from inside the file, lower cased.
> - `{category|slugify}` is `category` from inside the file, slugified.
> - `{tag|slugify|uppercase}` is `tag` from inside the file, slugified, then upper cased.

</details>

<details>
  <summary><code>parser</code> (optional)</summary>

> The `parser` field should state which [Parser](#parsers) you want to use to read the files in this collection.

</details>

### CloudCannon

Set global [CloudCannon configuration](https://cloudcannon.com/documentation/edit/editing/configuration/#configuration) as top level keys in your `cloudcannon-reader` configuration and they'll be copied across to `./_cloudcannon/info.json`.

CloudCannon then reads these in the app and applies them to your editing interface. These include:

- `_options`
- `_select_data`
- `_array_structures`
- `_comments`
- `_instance_values`
- `_collection_groups`
- `_enabled_editors`
- `uploads_dir`
- `_source_editor`

***

## Parsers

Parsers define how `cloudcannon-reader` processes your files into the JSON written to `info.json`. You can set the parser for data and collections under `data-config` and `collection-config`.

These are the available parsers and default file extensions covered:

- `csv` (`.csv`)
- `front-matter` (`.md`, `.mkd`, `.markdown`, `.html`, `.htm`)
- `json` (`.json`)
- `properties` (`.properties`)
- `toml` (`.toml`)
- `yaml` (`.yaml`, `.yml`)

Functions are are supported with `.js` or `.cjs` files. Given file path, raw file content and an object with parsers and filters as arguments. The return value should be an object representing this file.

`cloudcannon-reader` exits in error if no suitable parser is found.

***

## Development

Install dependencies:

```bash
$ npm i
```

Run tests:

```bash
$ npm test
$ npm run test:watch
$ npm run test:coverage
```

Lint code:

```bash
$ npm run lint
```

Link this package locally to test it on a site folder, then run it within your site folder:

```bash
$ npm link
$ cd ../my-ssg-site
$ cloudcannon-reader
```

## License

ISC
