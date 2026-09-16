# Overlap: `@orkestrel/probe`

Live checkout: `C:\Users\mikes\WebstormProjects\probe` on `main` at `43f5f61`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already used combinators, shapes, `compileGuard`, `compileSchema`, `attempt`, `holds`, `isError`, `isArray` / `isRecord` / `isString` / `isNumber`.

## Named types

`isProbeError` is a cross-copy brand (`Symbol.for`). Native `instanceof ProbeError` is not that brand.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isProbeError` body | `isInstance` | No | Duplicate-install brand, not constructor identity. | Retain brand. |
| Call-site `instanceof ProbeError` | `isProbeError` | Yes | Same-package brand. | Implement. |
| Lint / describe `instanceof Error` | `isError` (`validators.ts:454`) | Yes | | Implement. |
| `parseProjectConfig` `JSON.parse`+`attempt` | `parseJSON` (`parsers.ts:522`) | Yes | No cause attached. | Implement. |
| Manifest `JSON.parse`+`attempt` | `parseJSON` | No | Failure attaches `parsing.error` as cause. | Retain. |
| Path / version / bin / stack strings | `isString` (`:97`) | Yes | | Implement. |
| Vitest project `typeof === 'function'` | `isFunction` (`:300`) | Same runtime | `isFunction` failed `TS2345` on `#wrap`. | Retain native `typeof === 'function'`. |
| Stack / pid numbers | `isNumber` (`:117`) plus `Number.isSafeInteger` | Yes | | Implement. |
| Duck objects | `isObject` (`:605`) | Yes | | Implement. |
| Stack `Array.isArray` | `isArray` (`:716`) | Yes | | Implement. |
| Protocol `JSON.stringify` / TypeScript `typeof` | none | — | Encode / type query. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
