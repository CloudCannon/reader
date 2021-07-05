import { getUrlFromFrontMatter } from '../src/helper/url-builder'; 

describe('getUrlFromFrontMatter', () => {
    describe('Does not include a urlTemplate', () => {
        it('should return an empty string', () => {
            const frontMatter = { string: 'string' };
            const expected = '';

            expect(getUrlFromFrontMatter(frontMatter)).toBe(expected);
        });
    });
    describe('Url does not include variables', () => {
        it('Should return what it recieves', () => {
            const frontMatter = { thing: '/thing/' }
            const url = '/url';
            expect(getUrlFromFrontMatter(frontMatter, url)).toBe(url);
        });
    });

    describe('Url includes variables', () => {
        it('should return title variable within the url', () => {
            const expected = '/url/my-title';
            const url = '/url/:title';
            const frontMatter = { title: 'my-title' };
            const result = getUrlFromFrontMatter(frontMatter, '/url/:title')
            expect(result).toBe(expected);
        })

        it('should throw if title variable doesn\'t exist', () => {
            const frontMatter = { notTitle: 'my-title' };
            expect(() => getUrlFromFrontMatter(frontMatter, '/url/:title')).toThrow();
        })
    })
});
