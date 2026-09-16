# Overlap: `@orkestrel/interpret`

Live checkout: `C:\Users\mikes\WebstormProjects\interpret` on `main` at `51395be`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already used `recordOf` / `objectOf` / `arrayOf` / `literalOf` / `unionOf` / `notOf`, `parseJSONAs`, `isString` / `isNumber` / `isBoolean` / `isFiniteNumber` / `isRecord`, and `FieldPath`.

## Named types

Stage `*Result` types are domain envelopes, not contract `Result`.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isInterpretError` `instanceof` | `isInstance` | Runtime yes | Domain name stays. | Implement the body. |
| `remove` overload `typeof === 'string'` | `isString` | Yes | `string \| readonly string[]` discriminant. | Implement. |
| Stage `error instanceof Error` | `isError` | Yes | `isError` is `isInstance(..., Error)`. | Implement. |
| Narrator lexicon `typeof === 'string'` | `isString` | Yes | `Object.hasOwn` stays. | Implement. |
| Narrator formatter `typeof === 'function'` | `isFunction` | No on this call | `isFunction` widens `NarratorFormatter` to `unknown`; the door returns `string`. | Retain. |
| `setField` / canonicalize / generate / clarify `Array.isArray` | `isArray` | Yes | Length-1 unwrap stays domain. | Implement. |
| `extractNumbers` `Number.isFinite` | `isFiniteNumber` | Yes | Already imported. | Implement. |
| Canonicalizer `JSON.stringify` | `cloneJSONValue` / `canonicalStringify` | No | Cycle labels and key-order display, not an owned frozen snapshot. | Retain. |
| `Object.hasOwn` lexicon lookups | none | n/a | Own-key probe. | Retain. |
| Combinator guards / `parseTemplate` | already originating | n/a | No independent schema/generator triple to fold. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
