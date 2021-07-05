import * as path from 'path';
import { parseFromGrayMatter } from '../src/helper/parse-from-gray-matter'

describe('parseFromGrayMatter()', () => {

    describe('Valid file', () => {
        
        it('should return correct data from md', async () => {
            const filePath = path.join(__dirname, 'fixture/input-collection-item.md');
            
            const result = await parseFromGrayMatter(filePath);
            const expected = {
                "title" : "Nice!"
            }

            expect(result).toEqual(expected);
            expect(typeof result).toEqual('object');
            expect(Array.isArray(result)).toBeFalsy();

        })

        it('should return correct data from html', async () => {
            const filePath = path.join(__dirname, 'fixture/input-collection-item.html');
            
            const result = await parseFromGrayMatter(filePath);
            const expected = {
                "title" : "Nice!"
            }

            expect(result).toEqual(expected);
            expect(typeof result).toEqual('object');
            expect(Array.isArray(result)).toBeFalsy();

        })

        it('should return correct data from json', async () => {
            const filePath = path.join(__dirname, 'fixture/input-collection-item.json');
            
            const result = await parseFromGrayMatter(filePath);
            const expected = {
                "title" : "Nice!"
            }

            expect(result).toEqual(expected);
            expect(typeof result).toEqual('object');
            expect(Array.isArray(result)).toBeFalsy();
        })

        it('should return correct data from yaml', async () => {
            const filePath = path.join(__dirname, 'fixture/input-collection-item.yaml');
            
            const result = await parseFromGrayMatter(filePath);
            const expected = {
                "title" : "Nice!"
            }

            expect(result).toEqual(expected);
            expect(typeof result).toEqual('object');
            expect(Array.isArray(result)).toBeFalsy();
        })

        it('should return correct data from toml', async () => {
            const filePath = path.join(__dirname, 'fixture/input-collection-item.toml');
            
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
                const filePath = path.join(__dirname, 'fixture/input-collection-item.md');
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
