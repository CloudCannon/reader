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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.issueHelpers = exports.getParsedType = exports.ZodParsedType = void 0;
var ZodError_1 = require("../ZodError");
var util_1 = require("./util");
exports.ZodParsedType = util_1.util.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set",
]);
var getParsedType = function (data) {
    if (typeof data === "string")
        return exports.ZodParsedType.string;
    if (typeof data === "number") {
        if (Number.isNaN(data))
            return exports.ZodParsedType.nan;
        return exports.ZodParsedType.number;
    }
    if (typeof data === "boolean")
        return exports.ZodParsedType.boolean;
    if (typeof data === "bigint")
        return exports.ZodParsedType.bigint;
    if (typeof data === "symbol")
        return exports.ZodParsedType.symbol;
    if (data instanceof Date)
        return exports.ZodParsedType.date;
    if (typeof data === "function")
        return exports.ZodParsedType.function;
    if (data === undefined)
        return exports.ZodParsedType.undefined;
    if (typeof data === "undefined")
        return exports.ZodParsedType.undefined;
    if (typeof data === "object") {
        if (Array.isArray(data))
            return exports.ZodParsedType.array;
        if (data === null)
            return exports.ZodParsedType.null;
        if (data.then &&
            typeof data.then === "function" &&
            data.catch &&
            typeof data.catch === "function") {
            return exports.ZodParsedType.promise;
        }
        if (data instanceof Map) {
            return exports.ZodParsedType.map;
        }
        if (data instanceof Set) {
            return exports.ZodParsedType.set;
        }
        return exports.ZodParsedType.object;
    }
    return exports.ZodParsedType.unknown;
};
exports.getParsedType = getParsedType;
var issueHelpers = function (error, params) {
    var makeIssue = function (errorData) {
        var errorArg = __assign(__assign({}, errorData), { path: __spreadArray(__spreadArray([], __read(params.path)), __read((errorData.path || []))) });
        var defaultError = ZodError_1.defaultErrorMap(errorArg, {
            data: params.data,
            defaultError: "Invalid input",
        });
        var issue = __assign(__assign({}, errorData), { path: __spreadArray(__spreadArray([], __read(params.path)), __read((errorData.path || []))), message: errorData.message ||
                params.errorMap(errorArg, {
                    data: params.data,
                    defaultError: defaultError.message,
                }).message });
        return issue;
    };
    var addIssue = function (errorData) {
        var issue = makeIssue(errorData);
        error.addIssue(issue);
    };
    return {
        makeIssue: makeIssue,
        addIssue: addIssue,
    };
};
exports.issueHelpers = issueHelpers;
//# sourceMappingURL=parseUtil.js.map