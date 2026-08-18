import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import ansis from 'ansis';
import { readConfig } from './config.js';
import { generateInfo } from './generators/info.js';
import log from './util/logger.js';
import report from './util/reporter.js';

export default {
	readConfig,

	generate: async (config, options) => await generateInfo(config, options),

	write: async (info, outputDir, outputPath) => {
		await mkdir(outputDir, { recursive: true });
		await writeFile(outputPath, JSON.stringify(info, null, '\t'));
	},

	run: async function (flags, pkg) {
		log(`⭐️ Starting ${ansis.blue('cloudcannon-reader')}`);

		const config = await this.readConfig(flags?.config || process.env.CLOUDCANNON_CONFIG_PATH);
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
			log(`⚠️ ${ansis.red('Failed to generate')} ${ansis.red.bold(outputPath)}`, 'error');
			throw e;
		}

		try {
			await this.write(info, outputDir, outputPath);
			report(info);
			log(`🏁 Generated ${ansis.bold(outputPath)} ${ansis.green('successfully')}`);
		} catch (e) {
			log(`⚠️ ${ansis.red('Failed to write')} ${ansis.red.bold(outputPath)}`, 'error');
			throw e;
		}
	},
};
