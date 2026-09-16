# Overlap: `@orkestrel/brief`

Live checkout: `C:\Users\mikes\WebstormProjects\brief` on `main` at `dbcf3e5`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already used combinators, `createContract`, `parseJSONAs`, `cloneJSONRecord`, `attempt`, and shapes.

## Named types

`isBriefError` is the domain brand.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isBriefError` `instanceof` | `isInstance` (`validators.ts:387`) | Runtime yes | Domain name stays. | Implement the body. |
| `freezeBranch` `typeof !== 'object'` | `isObject` (`:605`) | Yes | Skip primitives. | Implement. |
| Stage-throw renderer `instanceof Error` | `isError` (`:454`) | Yes | Wrapped in existing `attempt`. | Implement. |
| Renderer `typeof read.value === 'string'` | `isString` (`:97`) | Yes | | Implement. |
| Renderer `` `${typeof error}` `` | none | No | Identity label, not a type test. | Retain. |
| `deriveGivens` string/object | `isString` / `isObject` | Yes | Canonicalize objects. | Implement. |
| `remove` `typeof === 'string'` | `isString` | Yes | Overload discriminant. | Implement. |
| `captureValue` object/function/array | `isObject` / `isFunction` (`:300`) / `isArray` (`:716`) | Yes | Custom cloner keeps functions; not `cloneJSONValue`. | Implement type tests; retain the cloner. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
