import * as path from 'path';
import { parseFromGrayMatter } from '../src/helper/parse-from-gray-matter'

describe('parseFromGrayMatter()', () => {

    describe('Valid file', () => {
        const filePath = path.join(__dirname, 'fixture/input-collection-item.md');

        it('should return correct data', async () => {
            
            const result = await parseFromGrayMatter(filePath);
            const expected = {
                "title" : "Nice!"
            }

            expect(result).toEqual(expected);
            expect(typeof result).toEqual('object');
            expect(Array.isArray(result)).toBeFalsy();

        })

        it('should not throw is filePath is correct', () => {
            expect(async () => {
                await parseFromGrayMatter(filePath);
            }).not.toThrow();
        })
    })

    describe('Invalid file', () => {

        it('should throw if invalid fileType', async () => {
            const filePath = path.join(__dirname, 'fixture/incorrect-input-collection-item.md');
            await expect(parseFromGrayMatter(filePath)).rejects.toThrow();
        })

        it('should throw if invalid file name', async () => {
            const filePath = path.join(__dirname, 'fake.md');
            await expect(parseFromGrayMatter(filePath)).rejects.toThrow();
        })
    })
})
