# Overlap: `@orkestrel/reason`

Live checkout: `C:\Users\mikes\WebstormProjects\reason` on `main` at `042cf64`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. Validators, parsers, and most builders already import originating primitives. Domain `*Result` types are reason envelopes, not contract `Result`.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| Reasoner `typeof === 'object' && !== null` | `isObject` | Yes | Not `isRecord` — class instances and arrays must stay. | Implement. |
| `Array.isArray` on definition lists | `isArray` | Yes | `!list \|\| !Array.isArray` collapses to `!isArray`. | Implement. |
| `Number.isFinite` | `isFiniteNumber` | Yes | `Number.isNaN` stays for labels. | Implement. |
| `instanceof Error` / `isReasonError` | `isError` / `isInstance` | Yes | Domain name stays. | Implement. |
| Builder / helper `typeof === 'string'` | `isString` | Yes | Already imported where present. | Implement. |
| `termToKey` `${typeof term}` | none | n/a | Serializes the typeof name as an identity label. | Retain the template. The object/function gate uses `isObject` / `isFunction`. |
| `Object.hasOwn` on subject merge | none | n/a | Own-key probe. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
