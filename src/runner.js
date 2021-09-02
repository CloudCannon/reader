import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { cosmiconfig } from 'cosmiconfig';
import { generateInfo } from './generators/info.js';

export default {
	readConfig: async function (configPath) {
		const moduleName = 'cloudcannon';
		const explorer = cosmiconfig(moduleName, {
			searchPlaces: [
				'package.json',
				`${moduleName}.config.json`,
				`${moduleName}.config.yaml`,
				`${moduleName}.config.yml`,
				`${moduleName}.config.js`,
				`${moduleName}.config.cjs`
			]
		});

		try {
			const config = configPath
				? await explorer.load(configPath)
				: await explorer.search();

			if (config) {
				console.log(`Using config file: ${config.filepath}`);
				return config.config || {};
			}
		} catch (e) {
			console.error(e);
		}

		console.log('No config file found.');
		return {};
	},

	generate: async function (config) {
		return await generateInfo(config);
	},

	write: async function (info, outputDir) {
		await mkdir(outputDir, { recursive: true });
		await writeFile(join(outputDir, 'info.json'), JSON.stringify(info, null, '\t'));
	},

	run: async function (flags = {}) {
		const config = await this.readConfig(flags?.config) || {};
		config.output = flags?.output || config.output;

		let info;

		try {
			info = await this.generate(config);
		} catch (e) {
			e.message = `Failed to generate info: ${e.message}`;
			throw e;
		}

		try {
			const outputDir = join('.', config.output || '', '_cloudcannon');
			await this.write(info, outputDir);
		} catch (e) {
			e.message = `Failed to write info: ${e.message}`;
			throw e;
		}
	}
};
