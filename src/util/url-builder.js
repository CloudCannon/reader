import { parse } from 'path';
import slugify from '@sindresorhus/slugify';

export const filters = {
	uppercase: (value) => value?.toUpperCase?.(),
	lowercase: (value) => value?.toLowerCase?.(),
	slugify,
	year: (value) => value?.getFullYear?.(),
	month: (value) => {
		const month = value?.getMonth?.();
		return month === undefined ? month : ('0' + (month + 1)).slice(-2);
	},
	day: (value) => {
		const day = value?.getDate?.();
		return day === undefined ? day : ('0' + day).slice(-2);
	}
};

function processFileTemplates(urlTemplate, filePath) {
	const { name, ext } = parse(filePath);
	const slug = name === 'index' ? '' : name;

	return urlTemplate
		.replace(/\[ext\]/g, ext)
		.replace(/\[slug\]/g, slug)
		.replace(/\[filename\]/g, slug)
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

	if (typeof urlTemplate === 'function') {
		return urlTemplate(filePath, data, { filters });
	}

	const fileTemplated = processFileTemplates(urlTemplate, filePath);
	const templated = processDataTemplates(fileTemplated, data);

	return templated.replace(/\/+/g, '/');
}
