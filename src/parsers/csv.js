import papa from 'papaparse';

export function parse(raw) {
	return papa.parse(raw, {
		header: true,
		dynamicTyping: true
	})?.data;
}
