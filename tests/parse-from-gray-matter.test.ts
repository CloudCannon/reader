import * as path from 'path';
import { parseFromGrayMatter } from '../src/parse-from-gray-matter'

describe('parseFromGrayMatter()', () => {

    describe('Valid file', () => {

        it('should return correct data', async () => {
            
            const filePath = path.join(__dirname, 'fixture/input-collection-item.md');
            const expected = {
                "title" : "Nice!"
            }

            // expect(async () => {
            //     await parseFromGrayMatter(filePath);
            // }).not.toThrow();

            const result = await parseFromGrayMatter(filePath);

            expect(result).toEqual(expected);
            expect(typeof result).toEqual('object');
            expect(Array.isArray(result)).toBeFalsy();

        })

        it('should throw', async () => {
            const filePath = path.join(__dirname, 'fixture/incorrect-input-collection-item.md');
            await expect(parseFromGrayMatter(filePath)).rejects.toThrow();
        })

    })

})
