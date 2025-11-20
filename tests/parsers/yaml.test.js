import { test } from "node:test";
import assert from "node:assert";
import { parse } from "../../src/parsers/yaml.js";

test("Parse YAML", () => {
	assert.deepStrictEqual(parse("hi: there"), { hi: "there" });
});
