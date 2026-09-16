# Overlap: `@orkestrel/browser`

Live checkout: `C:\Users\mikes\WebstormProjects\browser` on `main` at `fdd8037`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already imported `Result`, `attempt`, `isArray`, `isBoolean`, `isError`, `isFiniteNumber`, `isFunction`, `isInteger`, `isInstance`, `instanceOf`, `isRecord`, `isString`, `parseArray`, `parseEnum`, and `parseJSON`.

## Named types

`Browser*Result` types are domain envelopes, not contract `Result`. `BrowserResultLimitError` is a domain error.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `parseNumberArray` `isArray` + `.every(isFiniteNumber)` | `parseArray` + `isFiniteNumber` | Yes, denser | `parseArray` refuses holes; `.every` skips them. A CDP number table is dense. | Implement. |
| Binding / codegen `parseJSON` then `isRecord` | `parseJSONAs` + `isRecord` | Yes | Same swallow of `SyntaxError`, then the record brand. | Implement. |
| Snapshot string table `.every(isString)` | `parseArray` + `isString` | Yes, denser | Same hole rule as `parseNumberArray`. | Implement. |
| Locator `texts()` `isArray` + `.every(isString)` | `parseArray` + `isString` | Yes, denser | Domain `BrowserError` on failure stays. | Implement. |
| CDP field walks `isRecord` + `isString` / `isFiniteNumber` | `parse*Field` / `objectOf` / `recordOf` | No | Field readers coerce (`'42'` → `'42'` or `42`). `recordOf` rejects extra CDP keys. `objectOf` would drop range invariants (`>= 0`, `end >= start`). | Retain domain parsers. |
| Timing / opcode `isFiniteNumber` / `isInteger` plus `>= 0` | `isNonNegativeNumber` / `isNonNegativeInteger` | No | Contract rejects `-0`. CDP timing still accepts it. | Retain. |
| `Network.json` `attempt` + throwing `JSON.parse` | `parseJSON` | No | The door keeps the `SyntaxError` as `BROWSER_JSON_ERROR` cause. `parseJSON` swallows it. | Retain. |
| Error brands `isInstance` / `instanceOf` | already originating | n/a | Already adopted. | Retain. |
| Page-script `typeof` / `instanceof` in `compilers.ts` / `constants.ts` | none | n/a | Injected into the inspected page; contract is not on that realm. | Exclude. |
| `ReturnType<typeof setTimeout>` | none | n/a | Type-only `typeof`. | Exclude. |
| `compile*` page expressions | `compileGuard` / `compileParser` | No | These emit in-page JavaScript, not contract shapes. | Exclude. |
| HAR / snapshot JSON clone via `JSON.stringify` | `cloneJSONValue` | No | Tests and docs round-trip a domain snapshot; ownership/freeze would change the artifact. | Exclude. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/setup.ts` CDP frame `typeof` | `isNumber` / `isString` | Implement. |
| `tests/setupServer.ts` address / key / frame / pid / argv | `isObject` / `isString` / `isNumber` / `isFunction` / `isInteger` / `parseJSON` / `parseArray` | Implement. |
| `tests/service/browser.test.ts` debugger URL | `isString` | Implement. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
| Fixture `JSON.parse` that must throw on bad test data | `parseJSON` | Retain where a throw is the fixture contract (`setup.ts` send). |
