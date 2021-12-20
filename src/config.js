import { relative } from 'path';
import { cosmiconfig } from 'cosmiconfig';
import log from './util/logger.js';
import chalk from 'chalk';

function rewriteKey(object, oldKey, newKey) {
	const canRename = Object.prototype.hasOwnProperty.call(object, oldKey)
		&& !Object.prototype.hasOwnProperty.call(object, newKey);

	if (canRename) {
		object[newKey] = object[oldKey];
		delete object[oldKey];
	}
}

function migrateLegacyKeys(config) {
	rewriteKey(config, '_collection_groups', 'collection_groups');
	rewriteKey(config, '_editor', 'editor');
	rewriteKey(config, '_source_editor', 'source_editor');
	rewriteKey(config, 'base-url', 'base_url');
	rewriteKey(config, 'collections-config', 'collections_config');
	rewriteKey(config, 'data-config', 'data_config');

	Object.keys(config.collections_config || {}).forEach((key) => {
		rewriteKey(config.collections_config[key], '_sort_key', 'sort_key');
		rewriteKey(config.collections_config[key], '_subtext_key', 'subtext_key');
		rewriteKey(config.collections_config[key], '_image_key', 'image_key');
		rewriteKey(config.collections_config[key], '_image_size', 'image_size');
		rewriteKey(config.collections_config[key], '_singular_name', 'singular_name');
		rewriteKey(config.collections_config[key], '_singular_key', 'singular_key');
		rewriteKey(config.collections_config[key], '_disable_add', 'disable_add');
		rewriteKey(config.collections_config[key], '_icon', 'icon');
		rewriteKey(config.collections_config[key], '_add_options', 'add_options');
	}, {});

	return config;
}

async function readConfig(configPath) {
	const moduleName = 'cloudcannon';
	const explorer = cosmiconfig(moduleName, {
		searchPlaces: [
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
			return migrateLegacyKeys(config.config || {});
		}
	} catch (e) {
		if (e.code === 'ENOENT') {
			log(`⚠️ ${chalk.red('No config file found at')} ${chalk.red.bold(configPath)}`);
			return false;
		}

		log(`⚠️ ${chalk.red('Error reading config file')}`, 'error');
		throw e;
	}

	log('⚙️ No config file found');
	return false;
}

export {
	migrateLegacyKeys,
	readConfig
};


