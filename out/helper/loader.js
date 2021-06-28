"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoaderType = void 0;
var parser_enum_1 = require("../enum/parser.enum");
function getLoaderFromFiletype(fileType) {
    var matchFileType = fileType.substring(1);
    var parser = Object.values(parser_enum_1.Parsers)[Object.keys(parser_enum_1.Parsers).indexOf(matchFileType)];
    return parser;
}
function getLoaderType(fileType, loader) {
    var parser;
    if (loader) {
        parser = parser_enum_1.Parsers[loader];
    }
    if (!parser) {
        parser = getLoaderFromFiletype(fileType);
    }
    return parser_enum_1.IParsersEnum.parse(parser);
}
exports.getLoaderType = getLoaderType;
//# sourceMappingURL=loader.js.map