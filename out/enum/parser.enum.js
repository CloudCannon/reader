"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IParsersEnum = exports.Parsers = void 0;
var zod_1 = require("zod");
var Parsers;
(function (Parsers) {
    Parsers["md"] = "gray-matter";
    Parsers["html"] = "gray-matter";
    Parsers["toml"] = "gray-matter";
    Parsers["yaml"] = "gray-matter";
    Parsers["json"] = "gray-matter";
})(Parsers = exports.Parsers || (exports.Parsers = {}));
exports.IParsersEnum = zod_1.z.nativeEnum(Parsers);
//# sourceMappingURL=parser.enum.js.map