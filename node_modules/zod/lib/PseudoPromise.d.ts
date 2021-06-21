declare type Func = (arg: any, ctx: {
    async: boolean;
}) => any;
declare type FuncItem = {
    type: "function";
    function: Func;
};
declare type Catcher = (error: Error, ctx: {
    async: boolean;
}) => any;
declare type CatcherItem = {
    type: "catcher";
    catcher: Catcher;
};
declare type Items = (FuncItem | CatcherItem)[];
export declare const NOSET: Readonly<{
    no_set: boolean;
}>;
export declare class PseudoPromise<PayloadType = undefined> {
    readonly _return: PayloadType | undefined;
    items: Items;
    constructor(funcs?: Items);
    static all: <T extends [PseudoPromise<any>, ...PseudoPromise<any>[]]>(pps: T) => PseudoPromise<{ [k in keyof T]: T[k] extends PseudoPromise<infer U> ? U : never; }>;
    all: <P extends PseudoPromise<any>, T extends [P, ...P[]]>(func: (arg: PayloadType, ctx: {
        async: boolean;
    }) => T) => PseudoPromise<{ [k in keyof T]: T[k] extends PseudoPromise<infer U> ? U : never; }>;
    static object: (pps: {
        [k: string]: PseudoPromise<any>;
    }) => PseudoPromise<any>;
    static resolve: <T>(value: T) => PseudoPromise<T>;
    then: <NewPayload>(func: (arg: PayloadType, ctx: {
        async: boolean;
    }) => NewPayload) => PseudoPromise<NewPayload extends Promise<infer U> ? U : NewPayload>;
    catch: (catcher: (err: Error, ctx: {
        async: boolean;
    }) => unknown) => this;
    getValueSync: () => PayloadType;
    getValueAsync: () => Promise<PayloadType>;
}
export {};
//# sourceMappingURL=PseudoPromise.d.ts.map