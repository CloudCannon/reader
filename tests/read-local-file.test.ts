import { readLocalJSONFile } from '../src/helper/read-local-file';
import fs from 'fs/promises';
import * as path from 'path';

describe('testing generateInfo', () => {

    it('should call readFile', async () => {
        expect.assertions(1);

        const readFileSpy = jest.spyOn(fs, "readFile");
        const filePath = path.join(__dirname, './fixture/test.json')
        
        await readLocalJSONFile(filePath);
        expect(readFileSpy).toHaveBeenCalledTimes(1);
        readFileSpy.mockClear();
    })

    it('should throw on fake file', async () => {
        expect.assertions(1);

        const filePath = path.join(__dirname, './fixture/fake.json')
        await expect(() => readLocalJSONFile(filePath)).rejects.toThrow()
  
    })

})
