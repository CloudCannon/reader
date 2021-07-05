import { IFrontMatter } from '../interfaces/front-matter.interface'
export function getUrlFromFrontMatter(frontMatter: IFrontMatter, urlTemplate?: string): string {
    if(!urlTemplate) {
        return ""
    }

    if(!urlTemplate.includes(':')) {
        return urlTemplate;
    }

    const urlVariableArray = urlTemplate.split('/');
    let newUrlSlug;
    newUrlSlug = urlVariableArray.map(url => {
        if(url.includes(':')) {
            let formattedUrl = url.replace(':', '')
            if(frontMatter[formattedUrl]) {
                return frontMatter[formattedUrl];
            }
            else {
                throw new Error(`${url} does not exist in config`)
            }
        } else {
            return url;
        }
    })
    return newUrlSlug.join('/').replace(/\/+/g, '/')
}