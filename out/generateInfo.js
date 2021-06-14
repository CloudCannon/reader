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
exports.generateInfo = void 0;
var promises_1 = require("fs/promises");
var path = __importStar(require("path"));
var read_local_file_1 = require("./helper/read-local-file");
var configObject;
function generateInfo(userInput) {
    return __awaiter(this, void 0, void 0, function () {
        var details;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    details = buildObject(userInput);
                    return [4 /*yield*/, promises_1.writeFile('./_cloudcannon/info.json', JSON.stringify(details, null, 2))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.generateInfo = generateInfo;
function buildObject(userInput) {
    return __awaiter(this, void 0, void 0, function () {
        var collections, generatedInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    collections = getCollections(userInput.loader, userInput.collections);
                    return [4 /*yield*/, basicGeneratedInfo()];
                case 1:
                    generatedInfo = _a.sent();
                    configObject = __assign(__assign({}, userInput), generatedInfo);
                    return [2 /*return*/, configObject];
            }
        });
    });
}
function basicGeneratedInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var packageJsonFile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, read_local_file_1.readLocalFile('../package.json')];
                case 1:
                    packageJsonFile = _a.sent();
                    return [2 /*return*/, {
                            time: new Date().toISOString(),
                            cloudcannon: {
                                name: packageJsonFile.name,
                                version: packageJsonFile.version
                            }
                        }];
            }
        });
    });
}
function getCollections(loader, collectionsConfig) {
    if (collectionsConfig === void 0) { collectionsConfig = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var keys, result, _loop_1, _i, keys_1, key, state_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    keys = Object.keys(collectionsConfig);
                    result = {};
                    _loop_1 = function (key) {
                        var files, e_1;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    files = void 0;
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, promises_1.readdir(path.join('.', collectionsConfig[key].path))];
                                case 2:
                                    files = _b.sent();
                                    result[key] = files.map(function (file) {
                                        var filePath = path.join('.', collectionsConfig[key].path, file);
                                        var fileType = path.extname(filePath);
                                        var loaderType = getLoaderType(fileType, loader);
                                        return {
                                            path: filePath,
                                            collection: key,
                                            ext: fileType,
                                            loader: loaderType
                                        };
                                    });
                                    return [2 /*return*/, { value: result }];
                                case 3:
                                    e_1 = _b.sent();
                                    console.log("error", e_1);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, keys_1 = keys;
                    _a.label = 1;
                case 1:
                    if (!(_i < keys_1.length)) return [3 /*break*/, 4];
                    key = keys_1[_i];
                    return [5 /*yield**/, _loop_1(key)];
                case 2:
                    state_1 = _a.sent();
                    if (typeof state_1 === "object")
                        return [2 /*return*/, state_1.value];
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getLoaderType(filetype, loader) {
    return "hello";
}
//# sourceMappingURL=generateInfo.js.map