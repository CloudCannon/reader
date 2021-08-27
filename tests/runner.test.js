import test from 'ava';
import runner from '../src/runner.js';

const mockRunner = {
	...runner,
	readConfig: async () => Promise.resolve({}),
	generate: async () => Promise.resolve({}),
	write: async () => Promise.resolve()
};

test('Should handle error with no config', async (t) => {
	const mockRunnerNoConfig = {
		...mockRunner,
		readConfig: async () => Promise.resolve(),
	};

	await t.throwsAsync(
		async () => await mockRunnerNoConfig.run(),
		{ instanceOf: Error, message: 'No configuration file found.' }
	);
});

test('Should handle error on generate', async (t) => {
	const mockRunnerThrow = {
		...mockRunner,
		generate: async () => { throw new Error('Test'); },
	};

	await t.throwsAsync(
		async () => await mockRunnerThrow.run(),
		{ instanceOf: Error, message: 'Failed to generate info: Test' }
	);
});

test('Should handle error on write', async (t) => {
	const mockRunnerThrow = {
		...mockRunner,
		write: async () => { throw new Error('Test'); },
	};

	await t.throwsAsync(
		async () => await mockRunnerThrow.run(),
		{ instanceOf: Error, message: 'Failed to write info: Test' }
	);
});

test('Should run', async (t) => {
	let resultInfo;
	let resultDestinationDir;

	runner.readConfig = async () => Promise.resolve({ destination: 'over/here' });
	runner.generate = async (config) => Promise.resolve({ ...config, info: true });
	runner.write = async (info, config) => {
		resultInfo = info;
		resultDestinationDir = config;
		return Promise.resolve();
	}

	await runner.run();

	t.deepEqual(resultInfo, { destination: 'over/here', info: true });
	t.deepEqual(resultDestinationDir, 'over/here/_cloudcannon');
});
