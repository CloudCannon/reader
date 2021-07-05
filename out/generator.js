"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildObject = void 0;
var promises_1 = require("fs/promises");
var path = __importStar(require("path"));
var parser_enum_1 = require("./enum/parser.enum");
var parse_from_gray_matter_1 = require("./helper/parse-from-gray-matter");
var url_builder_1 = require("./helper/url-builder");
var pkginfo = require('pkginfo')(module, 'version', 'name');
var loader_1 = require("./helper/loader");
function buildObject(userInput) {
    return __awaiter(this, void 0, void 0, function () {
        var configObject, generatedInfo, collections;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, basicGeneratedInfo()];
                case 1:
                    generatedInfo = _a.sent();
                    return [4 /*yield*/, getCollections(userInput)];
                case 2:
                    collections = _a.sent();
                    configObject = __assign(__assign(__assign({}, userInput), generatedInfo), { collections: collections });
                    return [2 /*return*/, configObject];
            }
        });
    });
}
exports.buildObject = buildObject;
function basicGeneratedInfo() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, {
                    time: new Date().toISOString(),
                    cloudcannon: {
                        name: module.exports.name,
                        version: module.exports.version
                    }
                }];
        });
    });
}
function getCollections(userInput) {
    return __awaiter(this, void 0, void 0, function () {
        var collectionsConfig, keys, collections, _i, keys_1, key, loader, collection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    collectionsConfig = userInput["collections-config"];
                    keys = Object.keys(collectionsConfig);
                    collections = new Object();
                    _i = 0, keys_1 = keys;
                    _a.label = 1;
                case 1:
                    if (!(_i < keys_1.length)) return [3 /*break*/, 4];
                    key = keys_1[_i];
                    loader = collectionsConfig[key].loader || null;
                    return [4 /*yield*/, getCollection(collectionsConfig[key], key, loader)];
                case 2:
                    collection = _a.sent();
                    collections[key] = collection;
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, collections];
            }
        });
    });
}
function getCollection(collectionConfig, key, loader) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var files, result, defaultTheme, e_1;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    defaultTheme = (_a = collectionConfig.default) !== null && _a !== void 0 ? _a : null;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, promises_1.readdir(path.join('.', collectionConfig.path))];
                case 2:
                    files = _b.sent();
                    return [4 /*yield*/, Promise.all(files.map(function (file) { return __awaiter(_this, void 0, void 0, function () {
                            var fileWithoutExtention, filePath, fileType, loaderType, frontMatter, url;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        fileWithoutExtention = file.replace(/\.[^/.]+$/, "");
                                        if (fileWithoutExtention === defaultTheme) {
                                            return [2 /*return*/];
                                        }
                                        filePath = path.join('.', collectionConfig.path, file);
                                        fileType = path.extname(filePath);
                                        loaderType = loader_1.getLoaderType(fileType, loader);
                                        return [4 /*yield*/, returnFrontMatterFromLoaderType(loaderType, filePath)];
                                    case 1:
                                        frontMatter = _a.sent();
                                        if (typeof collectionConfig.url === 'function') {
                                            url = collectionConfig.url(filePath, frontMatter);
                                        }
                                        else {
                                            url = url_builder_1.getUrlFromFrontMatter(frontMatter, collectionConfig.url);
                                        }
                                        return [2 /*return*/, __assign(__assign({}, frontMatter), { path: filePath, collection: key, ext: fileType, url: url })];
                                }
                            });
                        }); }))];
                case 3:
                    result = _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _b.sent();
                    throw new Error("" + e_1);
                case 5: return [2 /*return*/, result === null || result === void 0 ? void 0 : result.filter(function (a) { return !!a; })];
            }
        });
    });
}
function returnFrontMatterFromLoaderType(loaderType, filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = loaderType;
                    switch (_a) {
                        case parser_enum_1.Parsers.md: return [3 /*break*/, 1];
                        case parser_enum_1.Parsers.html: return [3 /*break*/, 3];
                        case parser_enum_1.Parsers.toml: return [3 /*break*/, 5];
                        case parser_enum_1.Parsers.yaml: return [3 /*break*/, 7];
                        case parser_enum_1.Parsers.json: return [3 /*break*/, 9];
                    }
                    return [3 /*break*/, 11];
                case 1: return [4 /*yield*/, parse_from_gray_matter_1.parseFromGrayMatter(filePath)];
                case 2: return [2 /*return*/, _b.sent()];
                case 3: return [4 /*yield*/, parse_from_gray_matter_1.parseFromGrayMatter(filePath)];
                case 4: return [2 /*return*/, _b.sent()];
                case 5: return [4 /*yield*/, parse_from_gray_matter_1.parseFromGrayMatter(filePath)];
                case 6: return [2 /*return*/, _b.sent()];
                case 7: return [4 /*yield*/, parse_from_gray_matter_1.parseFromGrayMatter(filePath)];
                case 8: return [2 /*return*/, _b.sent()];
                case 9: return [4 /*yield*/, parse_from_gray_matter_1.parseFromGrayMatter(filePath)];
                case 10: return [2 /*return*/, _b.sent()];
                case 11: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=generator.js.map