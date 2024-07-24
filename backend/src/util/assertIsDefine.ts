export function assertIsDefine<T>(val: T): asserts val is NonNullable<T> {
    if (!val) {
        throw Error("Expected 'val' tobe defined, but receive " + val)
    }
}