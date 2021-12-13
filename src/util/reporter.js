import chalk from 'chalk';
import log from './logger.js';

function cheapPlural(amount, str) {
	const amountStr = amount === 0 ? 'no' : amount;
	return `${amountStr} ${str}${amount === 1 ? '' : 's'}`;
}

export default function report(info) {
	const collectionKeys = Object.keys(info.collections_config || {});
	const dataKeys = Object.keys(info.data_config || {});

	const collectionsStr = cheapPlural(collectionKeys.length, 'collection');
	log(`📁 Processed ${collectionsStr}${collectionKeys.length ? ':' : ''}`);

	const collectionSummary = collectionKeys.map((collectionKey) => ({
		key: collectionKey,
		fileCount: info.collections[collectionKey]?.length || 0
	}));

	collectionSummary.forEach((collectionSummary) => {
		const countStr = cheapPlural(collectionSummary.fileCount, 'file');
		log(`   ${chalk.bold(collectionSummary.key)} with ${countStr}`);
	});

	const dataStr = cheapPlural(dataKeys.length, 'data set');
	log(`💾 Processed ${dataStr}${dataKeys.length ? ':' : ''}`);

	dataKeys.forEach((key) => {
		log(`   ${chalk.bold(key)}`);
	});
}
