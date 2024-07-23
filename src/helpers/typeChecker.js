export function typeChecker(obj, schema) {
    for (const key in schema) {
        if (!schema.hasOwnProperty(key)) continue;

        const type = schema[key];
        const value = obj[key];

        if (typeof value !== type) {
            throw new Error(`Invalid type for ${key}. Expected ${type}, but got ${typeof value}.`);
        }
    }
    return true;
}
