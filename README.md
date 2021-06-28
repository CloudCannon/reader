To start project in Dev environment:
Run `npm install`
Run `npm i -g ts-node-dev`
In project folder run `npx ts-node-dev --respawn [./path/to/index.ts]`

DOCUMENTATION:

We use cosmiconfig to search and load config files from your repository.
Files that will be accepted:
- `cloudcannonconfig` property in package.json
- `cloudcannonrc` file in JSON or YAML format
- `.cloudcannon.json`, `.cloudcannon.yaml`, `.cloudcannon.yml`, `.cloudcannon.js`, or `.cloudcannon.cjs`
`cloudcannon.config.js` or `cloudcannon.config.cjs` CommonJS module exporting an object

We require you to set an object of your collections for CloudCannon to be able to know where to find them:
example:
```'collections-config': {
    posts: { 
    //Collections name
        
        default: "_defaults", 
        //This is your default collections theme file, we will not include this file in our build but will use it to create a new collection item.
        
        path: "_posts", 
        //Where we can find your collections folder from root
        
        loader: "md", 
        //(Optional) - Check out our docs, this is optional, and if it is not set we will use our loader associated with your file extention
        
        url: urlBuilder 
        //We require you to set the url for your individual post collection items. This listens to frontmatter and can be formatted like '/post/:title' where ':title' is a value on the post's frontmatter. Alternatively you are able to use a function if using a js or cjs config extention to dynamically set them based on your own logic.
        functions set in in `url` get `filePath` and `frontMatter`
    }
},```

loader: 
We currently only have one loader which is `gray-matter` so regardless of the input here it will parse through `gray-matter`. Files we accept for collection items:
- md
- html
- toml
- yaml
- json
