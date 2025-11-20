import { test } from "node:test";
import assert from "node:assert";
import runner from "../src/runner.js";

const mockRunner = {
	...runner,
	readConfig: async () => Promise.resolve({}),
	generate: async () => Promise.resolve({}),
	write: async () => Promise.resolve(),
};

test("Handle error on generate", async () => {
	const mockRunnerThrow = {
		...mockRunner,
		generate: async () => {
			throw new Error("Test");
		},
	};

	await assert.rejects(async () => await mockRunnerThrow.run(), {
		name: "Error",
		message: "Test",
	});
});

test("Handle error on write", async () => {
	const mockRunnerThrow = {
		...mockRunner,
		write: async () => {
			throw new Error("Test");
		},
	};

	await assert.rejects(async () => await mockRunnerThrow.run(), {
		name: "Error",
		message: "Test",
	});
});

test("Run", async () => {
	let resultInfo;
	let resultOutputDir;

	runner.readConfig = async () => Promise.resolve({ output: "over/here" });
	runner.generate = async (config) =>
		Promise.resolve({ ...config, info: true });
	runner.write = async (info, config) => {
		resultInfo = info;
		resultOutputDir = config;
		return Promise.resolve();
	};

	await runner.run();

	assert.deepStrictEqual(resultInfo, { output: "over/here", info: true });
	assert.deepStrictEqual(resultOutputDir, "over/here/_cloudcannon");
});
