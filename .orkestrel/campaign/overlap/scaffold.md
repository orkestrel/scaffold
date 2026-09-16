# Overlap: `@orkestrel/scaffold`

Live checkout: `C:\Users\mikes\WebstormProjects\scaffold` on `main` at `d6ef2689`, campaign files untracked before this package's `src`/`tests` edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already used combinators (`andOf` / `arrayOf` / `literalOf` / `recordOf` / `unionOf` / `holds`), parsers (`parseJSON` / `parseJSONAs` / `parseStringField`), cloners (`cloneJSONValue`), and `attempt`.

## Named types

`isScaffoldError` and `isUsageError` are the domain brands.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isScaffoldError` `instanceof` | `isInstance` | Runtime yes | Domain name stays. | Implement the body. |
| `isUsageError` `instanceof` | `isInstance` | Runtime yes | Domain name stays. | Implement the body. |
| CLI `values.from` `Array.isArray` / string filters | `isArray` / `isString` | Yes | parseArgs multiple vs scalar. | Implement. |
| Manifest-section `typeof key === 'string'` after `parseJSON` | `isString` | Yes | Key from JSON text. | Implement. |
| Upstream dependency `typeof range === 'string'` | `isString` | Yes | Length bounds stay local. | Implement. |
| `WriteTransaction` `string \| WriteAnchor` | `isString` | Yes | Discriminant. | Implement. |
| `readFileHex` `Number.isSafeInteger(limit)` | none | No twin | Pair with `isNumber`. | Retain `Number.isSafeInteger`; add `isNumber`. |
| Generated vite `peerDependencies` typeof/Array | `isObject` / `isArray` | Yes | Emitted into consumer `vite.config.ts`; that file must stay self-contained. | Retain. |
| Generated `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Yes | Emitted consumer proof; must not import `@orkestrel/contract`. | Retain. |
| Generated `server.address()` `typeof === 'string'` | `isString` | Yes | Node `AddressInfo` discriminant inside template text. | Retain. |
| `JSON.stringify` of manifests / scripts | `cloneJSONValue` | No | Pretty-print / protocol text. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Retain. Vendored byte-identical; `@orkestrel/contract` is not in `BASE_DEV_DEPENDENCIES`. |
| `tests/distribution.test.ts` JSON object / string walks | `isRecord` / `isString` | Implement. Throwing `JSON.parse` retained. |
| `tests/config.test.ts` inline vite/tsconfig walks | n/a | Retain. |
