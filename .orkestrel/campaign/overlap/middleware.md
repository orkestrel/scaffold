# Overlap: `@orkestrel/middleware`

Live checkout: `C:\Users\mikes\WebstormProjects\middleware` on `main` at `a8cefcf`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already used `isRecord` / `isString` / `isBoolean` / `isFiniteNumber` / `isFunction` / `isError` and shapes.

## Named types

`isMultipartError` is a dual-copy structural brand (not `instanceof`).

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isMultipartError` object/status/code | `isObject` (`validators.ts:605`) / `isNumber` (`:117`) / `literalOf` (`combinators.ts:166`) | Yes | Brand stays. | Implement those tests. |
| `isSession` object/`Map`/methods | `isObject` / `isInstance` (`:387`) / `isFunction` (`:300`) | Yes | Duck-type session. | Implement. |
| `isSessionControl` method typeof | `isFunction` | Yes | | Implement. |
| `isMultipartFile` size/validated | `isNumber` / `isBoolean` (`:204`) | Yes | | Implement. |
| `isMultipartBody` `Array.isArray` | `isArray` (`:716`) | Yes | | Implement. |
| Options `Array.isArray` / secret lists | `isArray` | Yes | | Implement. |
| `isFiniteNumber` + `Number.isInteger` | `isInteger` (`:148`) | Yes | Positive-integer options. | Implement. |
| Boundary `instanceof Error` | `isError` (`:454`) | Yes | | Implement. |
| `only`/`except` `typeof === 'string'` | `isString` (`:97`) | Yes | Path overload. | Implement. |
| CIDR `Number.isInteger` after `Number(...)` | `isInteger` | Yes | | Implement. |
| Declared length `Number.isFinite` | `isFiniteNumber` (`:133`) | Yes | Already imported. | Implement. |
| `streamFile` string / `Uint8Array` | `isString` / `isUint8Array` | Yes | | Implement. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
