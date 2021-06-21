import { MakeErrorData, ZodError, ZodErrorMap } from "../ZodError";
import { util } from "./util";
export declare const ZodParsedType: {
    number: "number";
    string: "string";
    nan: "nan";
    integer: "integer";
    float: "float";
    boolean: "boolean";
    date: "date";
    bigint: "bigint";
    symbol: "symbol";
    function: "function";
    undefined: "undefined";
    null: "null";
    array: "array";
    object: "object";
    unknown: "unknown";
    promise: "promise";
    void: "void";
    never: "never";
    map: "map";
    set: "set";
};
export declare type ZodParsedType = keyof typeof ZodParsedType;
export declare const getParsedType: (data: any) => ZodParsedType;
export declare const issueHelpers: (error: ZodError, params: ParseParams) => {
    makeIssue: (errorData: MakeErrorData) => {
        path: (string | number)[];
        message: string;
        code: "invalid_type";
        expected: "number" | "string" | "nan" | "integer" | "float" | "boolean" | "date" | "bigint" | "symbol" | "function" | "undefined" | "null" | "array" | "object" | "unknown" | "promise" | "void" | "never" | "map" | "set";
        received: "number" | "string" | "nan" | "integer" | "float" | "boolean" | "date" | "bigint" | "symbol" | "function" | "undefined" | "null" | "array" | "object" | "unknown" | "promise" | "void" | "never" | "map" | "set";
    } | {
        path: (string | number)[];
        message: string;
        keys: string[];
        code: "unrecognized_keys";
    } | {
        path: (string | number)[];
        message: string;
        code: "invalid_union";
        unionErrors: ZodError<any>[];
    } | {
        path: (string | number)[];
        message: string;
        code: "invalid_enum_value";
        options: (string | number)[];
    } | {
        path: (string | number)[];
        message: string;
        code: "invalid_arguments";
        argumentsError: ZodError<any>;
    } | {
        path: (string | number)[];
        message: string;
        code: "invalid_return_type";
        returnTypeError: ZodError<any>;
    } | {
        path: (string | number)[];
        message: string;
        code: "invalid_date";
    } | {
        path: (string | number)[];
        message: string;
        code: "invalid_string";
        validation: import("../ZodError").StringValidation;
    } | {
        path: (string | number)[];
        message: string;
        code: "too_small";
        minimum: number;
        inclusive: boolean;
        type: "string" | "number" | "array";
    } | {
        path: (string | number)[];
        message: string;
        code: "too_big";
        inclusive: boolean;
        type: "string" | "number" | "array";
        maximum: number;
    } | {
        path: (string | number)[];
        message: string;
        code: "invalid_intersection_types";
    } | {
        path: (string | number)[];
        message: string;
        code: "custom";
        params?: {
            [k: string]: any;
        } | undefined;
    };
    addIssue: (errorData: MakeErrorData) => void;
};
export declare type ParseParams = {
    data: any;
    path: (string | number)[];
    errorMap: ZodErrorMap;
    parentError: ZodError;
    async: boolean;
};
export declare type ParseParamsWithOptionals = util.flatten<Partial<ParseParams> & {
    data: any;
}>;
export declare type ParseParamsNoData = Omit<ParseParams, "data">;
export declare type ParseContext = ParseParams & ReturnType<typeof issueHelpers> & {
    parsedType: ZodParsedType;
    currentError: ZodError;
};
export declare type ZodParserReturnPayload<T> = {
    success: false;
    error: ZodError;
} | {
    success: true;
    data: T;
};
export declare type ZodParserReturnType<T> = ZodParserReturnPayload<T> | Promise<ZodParserReturnPayload<T>>;
//# sourceMappingURL=parseUtil.d.ts.map