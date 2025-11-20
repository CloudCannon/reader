import { test } from "node:test";
import assert from "node:assert";
import { parse } from "../../src/parsers/properties.js";

test("Parse properties", () => {
	assert.deepStrictEqual(parse("hi = there"), { hi: "there" });
});
