import { generateCollections } from './collections.js';
import { generateData } from './data.js';

export async function generateInfo(config, options) {
	const source = config.source?.replace(/^\/+|\/+$/g, '').replace(/\/+/g, '/') || '';

	return {
		...config,
		time: new Date().toISOString(),
		cloudcannon: {
			name: 'cloudcannon-reader',
			version: options?.version || '0.0.0'
		},
		data: await generateData(config['data-config'], { source }),
		collections: await generateCollections(config['collections-config'], { source })
	};
}

