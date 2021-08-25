const DEFAULT_LOADERS = {
	md: 'gray-matter',
	html: 'gray-matter',
	toml: 'gray-matter',
	yml: 'gray-matter',
	yaml: 'gray-matter',
	json: 'gray-matter'
};

export function getLoader(fileType, loaderKey) {
	return DEFAULT_LOADERS[loaderKey || ''] || DEFAULT_LOADERS[fileType?.substring(1)];
}
