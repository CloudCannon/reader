import { mkdir, writeFile } from 'fs/promises';
import { join, relative } from 'path';
import { cosmiconfig } from 'cosmiconfig';
import { generateInfo } from './generators/info.js';
import log from './util/logger.js';
import report from './util/reporter.js';
import chalk from 'chalk';

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
				const relativeConfigPath = relative(process.cwd(), config.filepath);
				log(`⚙️ Using config file at ${chalk.bold(relativeConfigPath)}`);
				return config.config || {};
			}
		} catch (e) {
			if (e.code === 'ENOENT') {
				log(`⚠️ ${chalk.red('No config file found at')} ${chalk.red.bold(configPath)}`);
				return false;
			} else {
				log(`⚠️ ${chalk.red('Error reading config file')}`, 'error');
				throw e;
			}
		}

		log('⚙️ No config file found, see the instructions at https://github.com/CloudCannon/reader');
		return false;
	},

	generate: async function (config, options) {
		return await generateInfo(config, options);
	},

	write: async function (info, outputDir, outputPath) {
		await mkdir(outputDir, { recursive: true });
		await writeFile(outputPath, JSON.stringify(info, null, '\t'));
	},

	run: async function (flags, pkg) {
		log('⭐️ Starting cloudcannon-reader');

		const config = await this.readConfig(flags?.config);
		if (config === false) {
			return;
		}

		config.output = flags?.output || config.output;

		const outputDir = join('.', config.output || '', '_cloudcannon');
		const outputPath = join(outputDir, 'info.json');
		let info;

		try {
			info = await this.generate(config, { version: pkg?.version });
		} catch (e) {
			log(`⚠️ ${chalk.red('Failed to generate')} ${chalk.red.bold(outputPath)}`, 'error');
			throw e;
		}

		try {
			await this.write(info, outputDir, outputPath);
			report(info);
			log(`🏁 Generated ${chalk.bold(outputPath)} successfully`);
		} catch (e) {
			log(`⚠️ ${chalk.red('Failed to write')} ${chalk.red.bold(outputPath)}`, 'error');
			throw e;
		}
	}
};
