import test from 'ava';
import runner from '../src/runner.js';

const mockRunner = {
	...runner,
	readConfig: async () => Promise.resolve({}),
	generate: async () => Promise.resolve({}),
	write: async () => Promise.resolve()
};

test('Handle error on generate', async (t) => {
	const mockRunnerThrow = {
		...mockRunner,
		generate: async () => { throw new Error('Test'); },
	};

	await t.throwsAsync(
		async () => await mockRunnerThrow.run(),
		{ instanceOf: Error, message: 'Failed to generate info: Test' }
	);
});

test('Handle error on write', async (t) => {
	const mockRunnerThrow = {
		...mockRunner,
		write: async () => { throw new Error('Test'); },
	};

	await t.throwsAsync(
		async () => await mockRunnerThrow.run(),
		{ instanceOf: Error, message: 'Failed to write info: Test' }
	);
});

test('Run', async (t) => {
	let resultInfo;
	let resultOutputDir;

	runner.readConfig = async () => Promise.resolve({ output: 'over/here' });
	runner.generate = async (config) => Promise.resolve({ ...config, info: true });
	runner.write = async (info, config) => {
		resultInfo = info;
		resultOutputDir = config;
		return Promise.resolve();
	}

	await runner.run();

	t.deepEqual(resultInfo, { output: 'over/here', info: true });
	t.deepEqual(resultOutputDir, 'over/here/_cloudcannon');
});
