# Overlap: `@orkestrel/server`

Live checkout: `C:\Users\mikes\WebstormProjects\server` on `main` at `3c9eccc`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already used `isNumber` / `isRecord` / `isString` / `isFiniteNumber` / `isFunction` / `isInteger` / `parseJSON`.

## Named types

`isHTTPError` is the dual-package brand. `isServerError` is the same-copy brand.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isHTTPError` `instanceof` + object test | `isInstance` / `isObject` | Runtime yes | Brand + status/message stay. Dual-copy hazard remains. | Implement those two tests. |
| `isServerError` `instanceof` | `isInstance` | Runtime yes | Same-copy, documented. | Implement the body. |
| `Server.use` `typeof === 'function'` | `isFunction` | Runtime yes | `isFunction` widens the function/array overload (`TS2345` / `TS2488`). | Retain. |
| Boundary `instanceof Error` | `isError` | Yes | `expose` message. | Implement. |
| `decodeTokenPayload` throwing `JSON.parse` + catch | `parseJSON` | Yes | Total `undefined` on invalid JSON. | Implement. Drop try/catch. |
| Token `value` / `exp` typeof | `isString` / `isNumber` | Yes | `isNumber` keeps NaN as a number, matching `typeof`. | Implement. |
| `normalizeSecret` `typeof === 'string'` | `isString` | Yes | Scalar vs rotation list. | Implement. |
| Accept `Number.isFinite` | `isFiniteNumber` | Yes | q-value. | Implement. |
| Range `Number.isInteger` | `isInteger` | Yes | After `Number(...)`. | Implement. |
| `ContentTooLargeError` `instanceof` | `isInstance` | Runtime yes | Local subclass. | Implement. |
| `EADDRINUSE` `instanceof Error` | `isError` | Yes | Node errno. | Implement. |
| `scrubPrototype` `Array.isArray` | `isArray` | Runtime yes | Mutates in place. | Retain. |
| Cookie/token `JSON.stringify` | `cloneJSONValue` | No | Wire encoding. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
