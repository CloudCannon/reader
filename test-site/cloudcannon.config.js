let cloudcannonConfig = {
    collections: {
        posts: {
            default: "_defaults",
            path: "_posts",
            loader: "md"
        },
        "news": {
            "default": "_defaults",
            "path": "_news",
            "url": "/news/:title/",
            "loader": "html"
        },
        "case-studies": {
            "default": "_defaults",
            "path": "_case_study"
        }
    },
    "comments": {},
    "input-options": {},
    "array-strictures": {},
    "select-data": {},
    "generator": {},
    "source-editor": {},
    "paths": {
        "uploads": "Key"
    }
}

function thing() {
    cloudcannonConfig['base-url'] = "I did a thing"
}

thing();

module.exports = { cloudcannonConfig }