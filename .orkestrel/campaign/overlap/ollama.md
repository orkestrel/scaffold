# Overlap: `@orkestrel/ollama`

Live checkout: `C:\Users\mikes\WebstormProjects\ollama` on `main` at `034f2e1`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already used `isNumber` / `isRecord` / `isString` / `parseJSONAs`.

## Named types

Wire extractors are total projections. Malformed `tool_calls` entries are dropped rather than failing the array.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `extractTools` `Array.isArray` | `isArray` (`validators.ts:716`) | Yes | Check, not mutate. | Implement. |
| Remaining helpers | already `isRecord` / `isString` / `isNumber` / `parseJSONAs` | Yes | | Already adopted. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
