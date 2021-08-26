export function buildUrl(frontMatter, urlTemplate) {
	if (!urlTemplate) {
		return '';
	}

	if (!urlTemplate.includes(':')) {
		return urlTemplate;
	}

	const parts = urlTemplate.split('/');

	const templated = parts.map((url) => {
		if (url.includes(':')) {
			// TODO do a regex here instead so we can multiple in one part, e.g. /:year-:month-:day/:title:ext
			const formattedUrl = url.replace(':', '');

			if (frontMatter[formattedUrl]) {
				return frontMatter[formattedUrl];
			} else {
				throw new Error(`${url} does not exist in config`);
			}
		}

		return url;
	});

	return templated.join('/').replace(/\/+/g, '/');
}
