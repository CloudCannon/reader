# SSG Reader

Parses config, files and folder structures to create a JSON file with information about
sites made with any static site generator.

[Usage](#usage) &bull; [Documentation](#documentation) &bull; [Development](#development)

## Usage

### Configuration

SSG Reader supports a number of different config formats.
Config files should be in the root of your repository.

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

  'collections-config': {
    posts: { // Collection name as key
      // The collections default filename. Excluded from the build info, used to create a new file in app.
      default: '_defaults',

      // Path to collection folder relative to source
      path: '_posts',

      // (Optional) - The loader used to parse the files in this collection
      // If unset, defaults to the loader associated with file extention.
      loader: 'md',

      // The URL pattern for items in this collection (i.e. permalink in many SSGs). Either a string or function.
      //
      // The string supports front matter placeholders (e.g. '/post/:title' where ':title' is defined in front matter for each file).
      //
      // Functions are supported with `.js` or `.cjs` configs files to dynamically set URLs.
      // The function is passed `filePath` and `frontMatter` and should return a slash-prefixed URL string.
      url: (filePath, frontMatter) {
        return `/posts/${frontMatter.title.toLowerCase()}`;
      }
    }
  }
};
```

TODO list config options here, move comments from above to here.

## Documentation

### Loaders

In development.

There's only one loader at the moment which is `gray-matter`. Files we accept for collection items:

- `.md`
- `.html`
- `.yml` or `.yaml`
- `.json`
- `.toml`

## Development

Install dependencies in for `ssg-reader`:

```
npm install
npm i -g ts-node-dev
```

Then, from your site folder:

```
npx ts-node-dev --respawn [./path/to/index.ts]
```
