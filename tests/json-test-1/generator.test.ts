import * as path from 'path';
import { cosmiconfig } from 'cosmiconfig';
import { readFile } from 'fs/promises';
import MockDate from 'mockdate';
import { generateInfo } from '../../src/generator';

describe('generateInfo()', () => {
	describe('json config', () => {
		beforeEach(() => {
			MockDate.set('2000-11-22');
		});

		afterEach(() => {
			MockDate.reset();
		});

		it('should return correct data from JSON config', async () => {
			const resultFilePath = path.join(__dirname, '/cloudcannonrc.json');
			const expectedFilePath = path.join(__dirname, './_cloudcannon/info.json');
			const expectedFile = await readFile(expectedFilePath);
			const expectedJSON = JSON.parse(expectedFile.toString());
			const expected = JSON.stringify(expectedJSON, null, 2);
			const explorer = cosmiconfig('cloudcannon');
			const configFile = await explorer.load(resultFilePath).then((item) => item);
			let result;

			if (configFile) {
				const info = await generateInfo(configFile.config.cloudcannonConfig);
				result = JSON.stringify(info, null, 2);
			}

			expect(result).toBe(expected);
		});
	});
});
