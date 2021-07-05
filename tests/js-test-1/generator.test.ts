import * as path from 'path';
import { cosmiconfig } from 'cosmiconfig';
import { readFile } from 'fs/promises';
import MockDate from 'mockdate'
import { buildObject } from '../../src/generator'

describe('buildObject()', () => {
    describe('javacript config', () => {
        
        beforeEach(() => {
            MockDate.set('2000-11-22');
        });
        afterEach(() => {
            MockDate.reset();
        })

        it('should return correct data from js config', async () => {

            const resultFilePath = path.join(__dirname, '/cloudcannon.config.js');
            const expectedFilePath = path.join(__dirname, './_cloudcannon/info.json');
            const expectedFile = await readFile(expectedFilePath);
            const expectedJSON = JSON.parse(expectedFile.toString());
            const expected = JSON.stringify(expectedJSON, null, 2);

            const explorer = cosmiconfig('cloudcannon');
            const configFile = await explorer.load(resultFilePath).then(item => item);
            let result;
            
            if(configFile) {
                let details = await buildObject(configFile.config.cloudcannonConfig);
                result = JSON.stringify(details, null, 2);
            }

            expect(result).toBe(expected);
        })
    })
})
