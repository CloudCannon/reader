import { IParsersEnum, Parsers } from '../src/enum/parser.enum';
import { getLoaderType } from '../src/helper/loader';

//if file type with no loader : do something
describe.only('getLoaderType()', () => {
    describe("if fileType with no loader", () => {

        it('should return file type', () => {
            const expected = Parsers.md;
            const response = getLoaderType(".md")
            expect(response).toEqual(expected);
        });
        it('shoud through if fileType is not of type IParserEnum', () => {
            expect(() => getLoaderType(".fake")).toThrow()
        })
    })
    describe("if fileType and loader", () => {
        it('should listen to loader', () => {
            const response = getLoaderType(".md", "html")
            const expected = Parsers.html
            expect(response).toBe(expected);
        });
    })
    describe("if loader is not an enum but file type is", () => {
        it('should return file type', () => {
            const response = getLoaderType(".md", "fake")
            const expected = Parsers.md
            expect(response).toBe(expected);
        })
    });

    describe("If loader and fileType are not enums", () => {
        it('should throw', () => {
            expect(() => getLoaderType(".fake", 'fake')).toThrow()
        })
    })
});
