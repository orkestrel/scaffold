# Overlap: `@orkestrel/ndjson`

Live checkout: `C:\Users\mikes\WebstormProjects\ndjson` on `main` at `fb93d3b`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared.

## `src` sweep

`src` already parses each line through `parseJSONAs(line, isRecord)`. No leftover `typeof` / `instanceof` / `Array.isArray` / `Number.is*` / local Result.

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| Line parse | `parseJSONAs` / `isRecord` | Already implemented. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
