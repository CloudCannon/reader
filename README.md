# Reader

Creates [CloudCannon](https://cloudcannon.com/) build information for sites made with any static
site generator.

This tool runs after your SSG build, reading your configuration to find pages, collections, and
data files to create a JSON file used to automatically integrate the site with CloudCannon. This
JSON file is written to `_cloudcannon/info.json`.

[<img src="https://img.shields.io/npm/v/@cloudcannon%2Freader?logo=npm" alt="version badge">](https://www.npmjs.com/package/@cloudcannon%2Freader)
[<img src="https://img.shields.io/npm/dt/@cloudcannon%2Freader" alt="downloads badge">](https://www.npmjs.com/package/@cloudcannon%2Freader)

***

- [Installation](#installation)
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

## Installation

**You don't have to install anything** when building on CloudCannon. This tool is automatically
installed before your site is built. This gives you the latest support, new features, and fixes
as they are released.

**If required**, you can install the tool manually to test the integration and diagnose issues.

```bash
npm install --global @cloudcannon/reader
```

This gives you access to the `cloudcannon-reader` binary.

<details>
<summary>Usage</summary>

<blockquote>

To generate a JSON file at `_cloudcannon/info.json`:

```sh
$ cloudcannon-reader
```

To print usage details:

```sh
$ cloudcannon-reader --help

Usage
  $ cloudcannon-reader [options]

Options
  --version     Print the current version
  --config, -c  Use a specific configuration file
  --output, -o  Write to a different location than .
  --quiet, -q   Disable logging

Environment
  CLOUDCANNON_CONFIG_PATH  Use a specific configuration file

Examples
  $ cloudcannon-reader --config "cloudcannon.dev.config.json"
  $ cloudcannon-reader --output "public"
  $ CLOUDCANNON_CONFIG_PATH=src/cloudcannon.config.js cloudcannon-reader
```

</blockquote>
</details>

***

## Configuration

Configuration files should be in the root directory (or the same directory you run
`cloudcannon-reader`). The first supported file found in this order is used:

- `cloudcannon.config.json`
- `cloudcannon.config.yaml`
- `cloudcannon.config.yml`
- `cloudcannon.config.js`
- `cloudcannon.config.cjs`

Alternatively, use a specific file with the `CLOUDCANNON_CONFIG_PATH`
environment variable or the `--config` command line option:

```sh
$ CLOUDCANNON_CONFIG_PATH=src/cloudcannon.config.js cloudcannon-reader
$ cloudcannon-reader --config "src/cloudcannon.config.js"
```

Your global CloudCannon configuration is set in this file as well, as it's used as a base to
generate `_cloudcannon/info.json` (used to integrate your site with CloudCannon).

Example content for `cloudcannon.config.cjs`:

```javascript
module.exports = {
  // Global CloudCannon configuration
  _inputs: {
    title: {
      type: 'text',
      comment: 'The title of your page.'
    }
  },
  _select_data: {
    colors: ['Red', 'Green', 'Blue']
  },

  // Read from ./src instead of .
  source: 'src',

  // Write to ./output/_cloudcannon/info.json instead of ./_cloudcannon/info.json
  output: 'output',

  // Populates the sidebar navigation and provides metadata for the editor
  collections_config: {
    people: {
      // Reads the contents of each file in this directory
      path: 'content/people',

      // The URL template for items in this collection
      url: '/people/{department|slugify}/[slug]/',

      // Tells CloudCannon this collection produces output files
      output: true

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
      },

      // Tells CloudCannon this collection produces output files
      output: true
    },
    pages: {
      // Tells CloudCannon to navigate to this path for this collection
      path: '',

      // Reads the contents of each file for this pattern (takes priority over path)
      glob: ['**/*.md', './src/pages/*.html'],

      // Tells CloudCannon to only show successfully parsed files for this collection
      // Useful for excluding other collections when using '' as path
      filter: 'strict',

      // Tells CloudCannon this collection produces output files
      output: true
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
  data_config: {
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

The `_cloudcannon/info.json` file is initially populated with the contents of your configuration. `cloudcannon-reader` then generates values for `collections`, `data`, `time`, `version`, and `cloudcannon`.

### Source

The `source` settings changes where to read from another folder. The `path` value for collection items is relative to `source`. Defaults to `'.'`.

### Output

The `output` settings changes where to write the `_cloudcannon` folder containing `info.json`. Defaults to `'.'`.

### Data

The `data_config` defines how data files should be read and parsed into the JSON representation. Defaults to `{}`.

```json
{
  "data_config": {
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

The `collections_config` object defines how collections and their files should be read and parsed into the JSON representation. Defaults to `{}`.

```json
{
  "collections_config": {
    "posts": {
      "path": "content/posts",
      "parser": "yaml",
      "url": "/posts/{category|slugify}/[slug].html"
    }
  }
}
```

Matches the collection-level configuration format for CloudCannon, which is also set here (e.g. `name`, `_enabled_editors`, `add_options`).

The keys available in each collection configuration are:

<details>
  <summary><code>path</code></summary>

> The `path` is the top-most folder where the files in this collection are stored. It is relative to `source`.

</details>

<details>
  <summary><code>glob</code> (optional)</summary>

> The `glob` is a string or array of strings containing patterns to filter the files parsed into this collection. Globs are **not** relative to `source`. Patterns are matched with [picomatch](https://github.com/micromatch/picomatch#basic-globbing). If set as an array, files only have to match one glob pattern to be parsed.
>
> ```javascript
> glob: ['**/*.md', '**/*.html'] // All .md and .html files
> ```
>
> ```javascript
> glob: './src/**/*.liquid' // All .liquid files inside the src folder and subfolders
> ```
>
> This is used to find files instead of `path`, but path is still required as a base path for the collection.
>
> - `'./src/*.md'` matches `.md` files in the `src` folder.
> - `'**/*.html'` matches `.html` files in any folder or subfolder.
> - `['**/*.md', './pages/*.html']` matches `.md` files in any folder, or `.html` files in the `pages` folder.

</details>

<details>
  <summary><code>url</code> (optional)</summary>

> The `url` is used to build the `url` field for items in the collection. Similar to permalink in many SSGs. Can be a string or a function. Defaults to `''`.
>
> Functions are are supported with `.js` or `.cjs` files. Given file path, parsed file content and an object with filters and the `buildUrl` function as arguments. The return value should be the slash-prefixed URL string.
>
> ```javascript
> url: (filePath, content, { filters, buildUrl }) => {
>   if (content.permalink) {
>     // Returns a lower case permalink front matter field
>     return filters.lowercase(content.permalink);
>   }
>
>   // Falls back to processing a url string
>   return buildUrl(filePath, content, '/[slug]/');
> }
> ```
>
> Strings are used as a template to build the URL. There are two types of placeholders available, file and data. Placeholders resulting in empty values are supported. Sequential slashes in URLs are condensed to one.
>
> ```javascript
> url: '/blog/{date|year}/[slug]/'
> ```
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
> - `{date|year}` is `date` from inside the file, with the 4-digit year extracted.
> - `{date|month}` is `date` from inside the file, with the 2-digit month extracted.
> - `{date|day}` is `date` from inside the file, with the 2-digit day extracted.

</details>

<details>
  <summary><code>parser</code> (optional)</summary>

> The `parser` field should state which [Parser](#parsers) you want to use to read the files in this collection.
>
> ```javascript
> parser: 'front-matter'
> ```

</details>

### CloudCannon

Set global [CloudCannon configuration](https://cloudcannon.com/documentation/edit/editing/configuration/#configuration) as top level keys in your `cloudcannon-reader` configuration and they'll be copied across to `_cloudcannon/info.json`.

CloudCannon then reads these in the app and applies them to your editing interface. These include:

- `collection_groups`
- `editor`
- `source_editor`
- `_enabled_editors`
- `_inputs`
- `_editables`
- `_select_data`
- `_structures`

***

## Parsers

Parsers define how `cloudcannon-reader` processes your files into the JSON written to `info.json`. You can set the parser for data and collections under `data_config` and `collections_config`.

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

```sh
$ npm i
```

Run tests:

```sh
$ npm test
$ npm run test:watch
$ npm run test:coverage
```

Lint code:

```sh
$ npm run lint
```

Link this package locally to test it on a site folder, then run it within your site folder:

```sh
$ npm link
$ cd ../my-ssg-site
$ cloudcannon-reader
```

## License

ISC
