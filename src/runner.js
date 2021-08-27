import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { cosmiconfig } from 'cosmiconfig';
import { generateInfo } from './generators/info.js';

export default {
	readConfig: async function () {
		const explorer = cosmiconfig('cloudcannon');
		const configFile = await explorer.search();
		return configFile?.config;
	},

	generate: async function (config) {
		return await generateInfo(config);
	},

	write: async function (info, destinationDir) {
		await mkdir(destinationDir, { recursive: true });
		await writeFile(join(destinationDir, 'info.json'), JSON.stringify(info, null, '\t'));
	},

	run: async function () {
		const config = await this.readConfig();
		if (!config) {
			throw new Error('No configuration file found.');
		}

		let info;

		try {
			info = await this.generate(config);
		} catch (e) {
			e.message = `Failed to generate info: ${e.message}`;
			throw e;
		}

		try {
			const destinationDir = join('.', config.destination || '', '_cloudcannon');
			await this.write(info, destinationDir);
		} catch (e) {
			e.message = `Failed to write info: ${e.message}`;
			throw e;
		}
	}
};
