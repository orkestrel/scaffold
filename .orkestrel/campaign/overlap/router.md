# Overlap: `@orkestrel/router`

Live checkout: `C:\Users\mikes\WebstormProjects\router` on `main` at `b762678`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already imports `isRecord`, `isFunction`, and `isString`.

## Named types

`DispatchResult` is the match envelope, not contract `Result`.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `add` one-or-many `Array.isArray` | `isArray` | Runtime yes | Overload discriminant; contract brand may widen the union. | Implement if typecheck holds; otherwise retain native `Array.isArray`. |
| Header `set-cookie` `Array.isArray` | `isArray` | Yes | Node header `string \| string[]`. | Implement. |
| Handler `instanceof Error` | `isError` | Yes | Destroy-path wrap. | Implement. |
| `findAnchor` `instanceof HTMLAnchorElement` | `isInstance` | Runtime yes | `isInstance` failed to narrow the platform ctor (`TS2740` EventTarget vs `HTMLAnchorElement`). | Retain native `instanceof`. |
| `ReturnType` / `typeof METHOD_LIST` | none | n/a | Type-only `typeof`. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
