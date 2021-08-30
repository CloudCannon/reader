import { parse } from 'path';
import slugify from '@sindresorhus/slugify';

const filters = {
	uppercase: (value) => value?.toUpperCase?.(),
	lowercase: (value) => value?.toLowerCase?.(),
	slugify
};

function processFileTemplates(urlTemplate, filePath) {
	const { name, ext } = parse(filePath);

	return urlTemplate
		.replace(/\[ext\]/g, ext)
		.replace(/\[slug\]/g, name)
		.replace(/\[filename\]/g, name)
		.replace(/\[path\]/g, filePath);
}

function processDataTemplates(urlTemplate, data) {
	return urlTemplate.replace(/(\{[^}]+\})/g, function (match) {
		const [key, ...filterKeys] = match.slice(1, -1).split('|');
		const value = data[key] || '';

		return filterKeys.reduce((memo, filterKey) => {
			const filter = filters[filterKey];
			return (filter ? filter(memo) : memo) || '';
		}, value);
	});
}

export function buildUrl(filePath, data, urlTemplate) {
	if (!urlTemplate) {
		return '';
	}

	const fileTemplated = processFileTemplates(urlTemplate, filePath);
	const templated = processDataTemplates(fileTemplated, data);

	return templated.replace(/\/+/g, '/');
}
