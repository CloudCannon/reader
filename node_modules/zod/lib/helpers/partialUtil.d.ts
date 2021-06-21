import { ZodObject, ZodOptional, ZodTypeAny } from "../index";
declare type AnyZodObject = ZodObject<any, any, any>;
export declare namespace partialUtil {
    type RootDeepPartial<T extends ZodTypeAny> = {
        object: T extends AnyZodObject ? ZodObject<{
            [k in keyof T["_shape"]]: DeepPartial<T["_shape"][k]>;
        }, T["_unknownKeys"], T["_catchall"]> : never;
        rest: ReturnType<T["optional"]>;
    }[T extends AnyZodObject ? "object" : "rest"];
    type DeepPartial<T extends ZodTypeAny> = {
        object: T extends ZodObject<infer Shape, infer Params, infer Catchall> ? ZodOptional<ZodObject<{
            [k in keyof Shape]: DeepPartial<Shape[k]>;
        }, Params, Catchall>> : never;
        rest: ReturnType<T["optional"]>;
    }[T extends ZodObject<any> ? "object" : "rest"];
}
export {};
//# sourceMappingURL=partialUtil.d.ts.map