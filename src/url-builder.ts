export function getUrlFromFrontMatter(frontMatter: any, urlTemplate?: string): string {

    if(!urlTemplate) {
        return ""
    }

    if(!urlTemplate.includes(':')) {
        return urlTemplate;
    }

    const urlVariableArray = urlTemplate.match(/:[^/:]+/g);
    let newUrlSlug;

    newUrlSlug = urlVariableArray?.map(url => {
        let formattedUrl = url.replace(':', '')

        if(frontMatter[formattedUrl]) {
            return frontMatter[formattedUrl];
        }
        else {
            throw new Error(`${url} does not exist in config`)
        }
    })
    return urlTemplate.replace(/\/+/g, '/')

}