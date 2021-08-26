#!/usr/bin/env node

import { mkdir, writeFile } from 'fs/promises';
import { cosmiconfig } from 'cosmiconfig';
import { generateInfo } from './generators/info.js';

async function start() {
	const explorer = cosmiconfig('cloudcannon');
	const configFile = await explorer.search();

	if (configFile) {
		try {
			const info = await generateInfo(configFile.config);

			try {
				await mkdir('./_cloudcannon', { recursive: true });
				await writeFile('./_cloudcannon/info.json', JSON.stringify(info, null, '\t'));
			} catch (e) {
				console.error('Failed to write info.');
				throw e;
			}
		} catch (e) {
			console.error('Failed to generate info.');
			throw e;
		}
	} else {
		throw new Error('No config file found.');
	}
}

start().then(() => console.log('Generated ./_cloudcannon/info.json successfully.'));
