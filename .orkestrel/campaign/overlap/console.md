# Overlap: `@orkestrel/console`

Live checkout: `C:\Users\mikes\WebstormProjects\console` on `main` at `133f3d6`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already imports `isArray`.

## Named types

`CaptureResult` is the capture envelope `{ value, messages }`, not contract `Result`.

`isStreamTarget`, `isBufferEncoding`, and `isConsoleError` are domain brands.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isStreamTarget` object + `write` function | `isObject` / `isFunction` | Yes | Not `isRecord` — streams are class instances. | Implement. |
| `isBufferEncoding` string + `Buffer.isEncoding` | `isString` | Yes on the type test | Host encoding table stays. | Implement the type test. |
| `inferColumns` finite positive number | `isFiniteNumber` | Yes on the type test | `> 0` stays. | Implement the type test. |
| `decodeChunk` string / `Uint8Array` | `isString` / `isUint8Array` | Yes | `Buffer.isBuffer` stays first. Total try/catch is a string fallback, not `attempt`. | Implement the type tests. Retain the catch. |
| `Object.hasOwn(environment, 'FORCE_COLOR')` | none | n/a | Own-key probe. | Retain. |
| `createServerSink` `typeof fixed === 'number'` | `isNumber` | Yes | Includes `NaN` / `Infinity`, matching the live discriminant. | Implement. |
| `ProcessCapture` encoding-as-callback | `isFunction` | Runtime yes | `isFunction` does not exclude `StreamWriteCallback` from the remaining Node `write` union (`TS2345`). | Retain native `typeof === 'function'` for the overload discriminant. |
| `ProcessCapture` string chunk | `isString` | Yes | None. | Implement. |
| `ProcessCapture` / `Capture` sink try/catch | `attempt` | No | Best-effort tee; a throw must not escape into the patched host write. | Retain. |
| `isConsoleError` | `isInstance` | Runtime yes | Public domain name stays. | Implement the body. |
| `stringifyValue` `instanceof Error` / object | `isError` / `isObject` | Yes | Circular `JSON.stringify` is domain serialization, not `parseJSON`. | Implement the type tests. Retain stringify. |
| `createCaptureResult` `instanceof Promise` | `isInstance` | Runtime maybe | Platform thenable branch that restores `console`. Same ctor-narrowing risk as `DOMException`. | Retain native `instanceof`. |
| `Styler` `#isSurface` function | `isFunction` | Yes | Structural `'in'` checks stay. | Implement the type test. |
| `Spinner` `ReturnType<typeof setInterval>` | none | n/a | Type-only `typeof`. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
