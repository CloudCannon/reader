let cloudcannonConfig = {
    'collections-config': {
        posts: {
            default: "_defaults",
            path: "tests/js-test-1/_posts",
            loader: "md",
            url: urlBuilder
        }
    },
    _comments: {},
    _options: {},
    _array_structures: {},
    _select_data: {},
    generator: {},
    _source_editor: {},
    paths: {
        uploads: "Key"
    }
}

function thing() {
    cloudcannonConfig['base-url'] = "I did a thing"
}
function urlBuilder(filePath, frontMatter) {
    return `hello/${frontMatter.title.replace(/\s+/g, '-').toLowerCase()}`;
}

thing();

module.exports = { cloudcannonConfig }