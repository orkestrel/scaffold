# Overlap: `@orkestrel/program`

Live checkout: `C:\Users\mikes\WebstormProjects\program` on `main` at `08b1d08`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already used combinators (`literalOf`, `arrayOf`, `objectOf`, `recordOf`, `whereOf`) plus `isString` / `isNumber` / `isBoolean` / `isJSONValue` / `isRecord` / `isFiniteNumber` / `isArray` / `resolveField`.

## Named types

`isProgramError` is a local-class brand. `hasReservedKey` probes own keys.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isProgramError` `instanceof` | `isInstance` (`validators.ts:387`) | Yes | Local class. | Implement. |
| `#seal` freeze walk `typeof === 'object'` | `isObject` (`:605`) | Yes | Must include arrays. | Implement. |
| `remove` `Array.isArray` / `typeof === 'string'` | `isArray` (`:716`) / `isString` (`:97`) | Yes | Overload discriminant. | Implement. |
| `hasReservedKey` `Object.hasOwn` | none | — | Own-key probe. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
