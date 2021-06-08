import { IParsersEnum, Parsers } from '../src/enum/parser.enum';
import { getLoaderType } from '../src/helper/loader';
import { ILoader } from '../src/interfaces/user-info.interface';

//if file type with no loader : do something
describe('getLoaderType()', () => {
    describe("if file type with no loader", () => {

        it.only('should return file type', () => {
            const expected = Parsers.md;
            const response = getLoaderType(".md")
            expect(response).toEqual(expected);
        });
    }
    )



});

//if file type and loader : listen to loader

//if file type is not in enum : should throw 

//if loader is not and file type is no in enum : should throw

// if loader is not an enum but file type is : should return file type