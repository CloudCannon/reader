const DEFAULT_LOADERS: Record<string, string> = {
	md: 'gray-matter',
	html: 'gray-matter',
	toml: 'gray-matter',
	yml: 'gray-matter',
	yaml: 'gray-matter',
	json: 'gray-matter'
};

export function getLoader(fileType: string, loaderKey?: string): string {
	return DEFAULT_LOADERS[loaderKey || ''] || DEFAULT_LOADERS[fileType?.substring(1)];
}
