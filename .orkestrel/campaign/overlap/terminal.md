# Overlap: `@orkestrel/terminal`

Live checkout: `C:\Users\mikes\WebstormProjects\terminal` on `main` at `b375a47`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already used `Result` / `attempt` / `isArray` / `isString` / `arrayOf` / `isBoolean` / `isRecord` / `parseJSON` / `literalOf` / `recordOf` / `rawShape` / `stringShape`.

## Named types

`isTerminalError` is the domain brand.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isTerminalError` `instanceof` | `isInstance` (`validators.ts:387`) | Runtime yes | Domain name stays. | Implement the body. |
| `isAbortError` `instanceof DOMException \| Error` | `isError` (`validators.ts:454`) | Yes | `isError` is `isInstance(..., Error)` and covers `DOMException`. Name check stays. | Implement. |
| `isInputStream` / `isReadable` object + method typeof | `isObject` (`:605`) / `isFunction` (`:300`) | Yes | Duck-type stream seam. | Implement. |
| `supportsRawMode` `typeof === 'function'` | `isFunction` | Yes | Optional `setRawMode`. | Implement. |
| `fieldToText` / `valueToText` typeof number/string/boolean | `isNumber` (`:117`) / `isString` (`:97`) / `isBoolean` (`:204`) | Yes | `FieldValue` discriminant. | Implement. |
| Prompt `#errors` `typeof named === 'string'` | `isString` | Yes | Form error context field. | Implement. |
| SSE `JSON.stringify` of form/id | `cloneJSONValue` | No | Protocol event payload. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
