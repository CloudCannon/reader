import { generateCollections } from './collections.js';
import { generateData } from './data.js';

export async function generateInfo(config) {
	return {
		...config,
		time: new Date().toISOString(),
		cloudcannon: {
			name: 'ssg-reader',
			version: '0.0.1' // TODO: automate this
		},
		data: await generateData(config['data-config']),
		collections: await generateCollections(config['collections-config'])
	};
}

