import { readLocalJSONFile } from '../src/helper/read-local-file';
import fs from 'fs/promises';
import * as path from 'path';

describe('testing generateInfo', () => {

    it('should call readFile', async () => {
        expect.assertions(1);

        const readFileSpy = jest.spyOn(fs, "readFile");
        const filePath = path.join(__dirname, 'test.json')
        
        await readLocalJSONFile(filePath);
        expect(readFileSpy).toHaveBeenCalledTimes(1);
        readFileSpy.mockClear();
    })

})
