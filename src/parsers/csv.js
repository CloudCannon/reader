import papa from 'papaparse';

export function parse(raw) {
	return papa.parse(raw, {
		skipEmptyLines: true,
		header: true,
		dynamicTyping: true
	})?.data;
}
