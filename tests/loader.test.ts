import { getLoader } from '../src/helper/loader';

describe('getLoader()', () => {
	describe('if fileType with no loader', () => {
		it('should return file type', () => {
			const expected = 'gray-matter';
			const response = getLoader('.md');
			expect(response).toEqual(expected);
		});
	});

	describe('if fileType and loader', () => {
		it('should listen to loader', () => {
			const response = getLoader('.md', 'html');
			const expected = 'gray-matter';
			expect(response).toBe(expected);
		});
	});
});
