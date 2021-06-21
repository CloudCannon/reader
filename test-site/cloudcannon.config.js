let cloudcannonConfig = {
    collections: {
        posts: {
            default: "_defaults",
            path: "_posts",
            loader: "md"
        },
        news: {
            default: "_defaults",
            path: "_news",
            url: "/news/:title/",
            loader: "html"
        },
        casestudies: {
            default: "_defaults",
            path: "_case_study"
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

thing();

module.exports = { cloudcannonConfig }