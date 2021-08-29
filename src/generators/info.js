import { generateCollections } from './collections.js';
import { generateData } from './data.js';

export async function generateInfo(config) {
	const source = config.source?.replace(/^\/+|\/+$/g, '').replace(/\/+/g, '/') || '';

	return {
		...config,
		time: new Date().toISOString(),
		cloudcannon: {
			name: 'ssg-reader',
			version: '0.0.1' // TODO: automate this
		},
		data: await generateData(config['data-config'], { source }),
		collections: await generateCollections(config['collections-config'], { source })
	};
}

