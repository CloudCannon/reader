import { parse } from 'path';
import slugify from '@sindresorhus/slugify';

export const filters = {
	uppercase: (value) => value?.toUpperCase?.(),
	lowercase: (value) => value?.toLowerCase?.(),
	slugify: (value) => slugify(value, { decamelize: false }),
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

function processFileTemplates(urlTemplate, filePath, collectionPath) {
	const { name, ext, dir: basePath, base: filename } = parse(filePath);
	const slug = name === 'index' ? '' : name;

	const relativePath = collectionPath
		? filePath.replace(new RegExp(`^/?${collectionPath}/`), '')
		: filePath;

	const relativeBasePath = collectionPath
		? parse(relativePath).dir || ''
		: basePath;

	return urlTemplate
		.replace(/\[ext\]/g, ext)
		.replace(/\[slug\]/g, slug)
		.replace(/\[filename\]/g, filename)
		.replace(/\[base_path\]/g, basePath)
		.replace(/\[relative_path\]/g, relativePath)
		.replace(/\[relative_base_path\]/g, relativeBasePath)
		.replace(/\[full_slug\]/g, `${relativeBasePath}/${slug}`)
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

export function buildUrl(filePath, data, collectionConfigOrUrl) {
	const isUrl = typeof collectionConfigOrUrl === 'string'
		|| typeof collectionConfigOrUrl === 'function';

	const collectionConfig = isUrl
		? { url: collectionConfigOrUrl }
		: (collectionConfigOrUrl || {});

	if (!collectionConfig.url) {
		return '';
	}

	if (typeof collectionConfig.url === 'function') {
		return collectionConfig.url(filePath, data, { filters, buildUrl, collectionConfig });
	}

	const fileTemplated = processFileTemplates(collectionConfig.url, filePath, collectionConfig.path);
	const templated = processDataTemplates(fileTemplated, data);

	return templated.replace(/\/+/g, '/');
}
