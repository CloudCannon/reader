import { relative } from 'node:path';
import ansis from 'ansis';
import { lilconfig } from 'lilconfig';
import { parse as parseYaml } from './parsers/yaml.js';
import log from './util/logger.js';

function rewriteKey(object, oldKey, newKey) {
	const canRename = Object.hasOwn(object, oldKey) && !Object.hasOwn(object, newKey);

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
	const explorer = lilconfig(moduleName, {
		searchPlaces: [
			`${moduleName}.config.json`,
			`${moduleName}.config.yaml`,
			`${moduleName}.config.yml`,
			`${moduleName}.config.js`,
			`${moduleName}.config.cjs`,
		],
		loaders: {
			'.yaml': (_filePath, content) => parseYaml(content),
			'.yml': (_filePath, content) => parseYaml(content),
		},
	});

	try {
		const config = configPath ? await explorer.load(configPath) : await explorer.search();

		if (config) {
			const relativeConfigPath = relative(process.cwd(), config.filepath);
			log(`⚙️ Using config file at ${ansis.bold(relativeConfigPath)}`);
			return migrateLegacyKeys(config.config || {});
		}
	} catch (e) {
		if (e.code === 'ENOENT') {
			log(`⚠️ ${ansis.red('No config file found at')} ${ansis.red.bold(configPath)}`);
			return false;
		}

		log(`⚠️ ${ansis.red('Error reading config file')}`, 'error');
		throw e;
	}

	log('⚙️ No config file found');
	return false;
}

export { migrateLegacyKeys, readConfig };
