import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { generateInfo } from './generators/info.js';
import { readConfig } from './config.js';
import log from './util/logger.js';
import report from './util/reporter.js';
import chalk from 'chalk';

export default {
	readConfig,

	generate: async function (config, options) {
		return await generateInfo(config, options);
	},

	write: async function (info, outputDir, outputPath) {
		await mkdir(outputDir, { recursive: true });
		await writeFile(outputPath, JSON.stringify(info, null, '\t'));
	},

	run: async function (flags, pkg) {
		log(`⭐️ Starting ${chalk.blue('cloudcannon-reader')}`);

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
			log(`🏁 Generated ${chalk.bold(outputPath)} ${chalk.green('successfully')}`);
		} catch (e) {
			log(`⚠️ ${chalk.red('Failed to write')} ${chalk.red.bold(outputPath)}`, 'error');
			throw e;
		}
	}
};
