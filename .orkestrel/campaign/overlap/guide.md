# Overlap: `@orkestrel/guide`

Live checkout: `C:\Users\mikes\WebstormProjects\guide` on `main` at `c4348f5`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already compiled shapes through `createContract`, `objectShape` / `literalShape` / `unionShape` / `arrayShape` / `optionalShape`, and combinators `arrayOf` / `literalOf` / `recordOf` / `unionOf`.

## Named types

`ParityResult` is a domain envelope, not contract `Result`.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `parseGuideDirection` `'guide' \| 'source'` | `parseEnum` | Yes | Argv `--to` shape stays. | Implement. |
| `parsePackageName` `parseJSON` then `isRecord` then non-empty string | `parseJSONAs` + `isNonEmptyString` | Yes | Same swallow of `SyntaxError`. | Implement. |
| `normalizeDirectories` `typeof === 'string'` | `isString` | Yes | `GuideModule` discriminant. | Implement. |
| Native `error instanceof Error` | `isError` | Yes | `isError` is `isInstance(..., Error)`. | Implement. |
| `process.exitCode` string then `Number.isFinite` | `isString` / `isFiniteNumber` | Yes on the type tests | `Number.parseInt(..., 10)` stays; `parseInteger` would refuse `'1foo'`. | Implement the type tests. |
| `root instanceof URL` | `isInstance` + `URL` | Runtime yes | Platform ctor. | Implement. |
| `Object.hasOwn` on modules | none | n/a | Own-key probe. | Retain. |
| Diagnostic `JSON.stringify` | `cloneJSONValue` / `canonicalStringify` | No | Display text, not an owned snapshot. | Exclude. |
| Type-only `typeof EXPORT_KEYWORDS` | none | n/a | Type query. | Exclude. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `GuideCommand.test.ts` `typeof === 'function'` | `isFunction` | Implement. |
| `shapers.test.ts` generated `source` discriminant | `isString` / `isArray` | Implement. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
