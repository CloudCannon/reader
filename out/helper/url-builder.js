"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlFromFrontMatter = void 0;
function getUrlFromFrontMatter(frontMatter, urlTemplate) {
    if (!urlTemplate) {
        return "";
    }
    if (!urlTemplate.includes(':')) {
        return urlTemplate;
    }
    var urlVariableArray = urlTemplate.split('/');
    var newUrlSlug;
    newUrlSlug = urlVariableArray.map(function (url) {
        if (url.includes(':')) {
            var formattedUrl = url.replace(':', '');
            if (frontMatter[formattedUrl]) {
                return frontMatter[formattedUrl];
            }
            else {
                throw new Error(url + " does not exist in config");
            }
        }
        else {
            return url;
        }
    });
    return newUrlSlug.join('/').replace(/\/+/g, '/');
}
exports.getUrlFromFrontMatter = getUrlFromFrontMatter;
//# sourceMappingURL=url-builder.js.map