import { generateCollections } from './collections.js';
import { generateData } from './data.js';

const sanitizeConfig = function (config) {
	const isObject = (obj) => obj === Object(obj);
	const defaults = {
		source: '',
		base_url: '',
		'base-url': '',
	};

	let sanitizedConfig = config || {};
	sanitizedConfig = isObject(sanitizedConfig) ? sanitizedConfig : {};

	Object.keys(sanitizedConfig).forEach((configKey) => {
		sanitizedConfig[configKey] = (sanitizedConfig[configKey] || defaults[configKey]) ?? {};
	});
	return sanitizedConfig;
};

export async function generateInfo(config, options) {
	const source = config.source?.replace(/^\/+|\/+$/g, '').replace(/\/+/g, '/') || '';
	const sanitizedConfig = sanitizeConfig(config);

	return {
		...sanitizedConfig,
		time: new Date().toISOString(),
		cloudcannon: {
			name: 'cloudcannon-reader',
			version: options?.version || '0.0.0'
		},
		version: '0.0.3',
		data: await generateData(config.data_config, { source }),
		collections: await generateCollections(config.collections_config, { source })
	};
}

