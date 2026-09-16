# Overlap: `@orkestrel/toolbox`

Live checkout: `C:\Users\mikes\WebstormProjects\toolbox` on `main` at `0bd5ce4`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already used combinators, shapes, `createContract`, `attempt`, cloners, `parseJSONValue`, `isRecord` / `isString` / `isNonEmptyString` / `isFiniteNumber`.

## Named types

`isToolboxError` is a local-class brand. `isColumnPrimitive` is a four-literal union.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isToolboxError` `instanceof` | `isInstance` (`validators.ts:387`) | Yes | Local class. | Implement. |
| `isColumnPrimitive` or-chain | `literalOf` (`combinators.ts:166`) | Yes | | Implement. |
| Lineage / indexes `Array.isArray` | `isArray` (`:716`) | Yes | | Implement. |
| `isAgentFunction` / workflow `typeof === 'function'` | `isFunction` (`:300`) | Yes | | Implement. |
| Column `optional` boolean | `isBoolean` (`:204`) | Yes | | Implement. |
| Database key/row lists | `isArray` | Yes | Check, not mutate. | Implement. |
| Timeout `Number.isSafeInteger` | `isNumber` (`:117`) plus `Number.isSafeInteger` | Yes | No contract twin for safe integer. | Pair. |
| Catch `instanceof Error` | `isError` (`:454`) | Yes | | Implement. |
| Relation key `string` / `number` | `isString` / `isNumber` | Yes | | Implement. |
| Token `typeof === 'function'` | `isFunction` | Same runtime | `isFunction` failed `TS2322` (call result `unknown`). | Retain native `typeof === 'function'`. |
| Body limit `Number.isFinite` | `isFiniteNumber` (`:133`) | Yes | | Implement. |
| `ContentTooLargeError` | `isInstance` | Yes | Imported class. | Implement. |
| POST body `JSON.parse`+catch | `parseJSON` (`parsers.ts:522`) | Yes | 400 on undefined. | Implement. |
| Include tree `typeof === 'object'` | `isObject` (`:605`) | Yes | Excludes `null`. | Implement. |
| `Object.hasOwn` collision | none | — | Own-key probe. | Retain. |
| Constants `JSON.stringify` | none | — | Example encode. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
