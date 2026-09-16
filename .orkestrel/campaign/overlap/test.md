# Overlap: `@orkestrel/test`

Live checkout: `C:\Users\mikes\WebstormProjects\test` on `main` at `0165283`. Declared `@orkestrel/contract` was absent; now runtime `^0.0.17`.

## Named types

| Local symbol | Contract candidate | Same semantics? | Difference | Decision | Required tests |
| --- | --- | --- | --- | --- | --- |
| `Result` / `Success` / `Failure` in `src/core/types.ts` | `Result` / `Success` / `Failure` | Yes for `{ success, value \| error }` | Local defaulted `E` to `Error`; contract defaults `E` to `unknown`. `retryUntil` already annotates `Result<T, unknown>` and no published signature returns the type. | Implement: delete the local types; import `Result` in `retryUntil`; do not re-export. | Existing `retryUntil` tests. |
| `retryUntil` try/catch around `await produce()` | `attempt` | No | `attempt` is synchronous. `retryUntil` awaits a producer and must capture both a throw and a rejection. | Retain the async catch. | Existing retry tests. |
| `JSONValue` in `src/core/types.ts` | `JSONValue` | Yes | Same primitive / array / string-keyed record union. Local alias was unused in implementation. | Implement: delete the local alias; do not re-export. | `roundTripJSON` tests. |
| `JSONSafe` | none | n/a | Test-only projection that keeps interface-typed snapshots. | Retain. | Existing `roundTripJSON` tests. |

## `src` sweep (`typeof` / `instanceof` / `Array.isArray` / `Number.is*` / JSON / outcomes)

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `checkBounds` `Number.isFinite` | `isFiniteNumber` | Yes on a number | Contract also rejects a non-number. | Implement. |
| `retryUntil` `Number.isInteger` / `undefined` | `isInteger` / `isDefined` | Yes | Local also requires `>= 1`. | Implement the type tests; keep the `>= 1` invariant. |
| `invokeUnchecked` `typeof method !== 'function'` | `isFunction` | Runtime yes | Contract `isFunction` narrows to a function whose `Reflect.apply` returns `unknown`, which cannot assign to caller-owned `T` without a forbidden assertion. Native `typeof` keeps the documented Function `any` bridge. | Retain. |
| `readProperty` object-or-function | `isObject` / `isFunction` | Runtime yes | Same unchecked `Reflect.get` `any` bridge as `invokeUnchecked`. | Retain. |
| `captureError` try/catch | `attempt` | Projection | `attempt` returns `Result`; `captureError` returns the thrown value or `undefined`. | Implement `captureError` as that projection. |
| `requireValue` null/undefined | `isDefined` | Yes | Local throws. | Implement the test; keep the throw boundary. |
| `roundTripJSON` function/symbol/finite/array/object | `isFunction` / `isSymbol` / `isNumber` / `isFiniteNumber` / `isArray` / `isObject` | Yes | The walk still throws on forbidden JSON leaves. | Implement the type tests; keep JSON.stringify/`JSON.parse` and the throw messages. |
| `roundTripJSON` / `decodeJSONLines` `JSON.parse` | `parseJSON` | No | `parseJSON` swallows the native `SyntaxError`. These paths need the exact parse or the line-numbered cause. | Retain. |
| `isRecorderMapComplete` object/function/array + try/catch | `isObject` / `isFunction` / `isArray` / `holds` | Yes | Own-key event pairing and recorder shape stay local. | Implement the type tests and totality through `holds`; keep `Object.hasOwn` and the event list. |
| `executeScenario` `instanceof Error` | `isError` | Yes | None. | Implement. |
| `readErrorCode` object + string `code` | `isObject` / `isString` | Yes | `'code' in` stays. | Implement. |
| `readInventory` `typeof root === 'string'` | `isString` | Yes | Root is already `URL \| string`. | Implement. |
| `createLoopback` address object/port/function | `isObject` / `isNumber` / `isFunction` | Yes | `'port' in` and `'closeAllConnections' in` stay. | Implement. |
| Browser `instanceof HTMLElement` / `SVGElement` / CSS rules | none | n/a | DOM brands. | Retain. |
| `typeof document !== 'undefined'` | none | n/a | Host detection. | Retain. |
| `createSignal` `typeof options === 'boolean' \| 'object'` | none | n/a | Discriminates `AddEventListenerOptions` from a boolean capture flag. | Retain. |
| Server/filesystem `try`/`catch` around `fs` | `attempt` | No | Async and Node error-code control flow, not a Result boundary. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setup.ts` `isSerializableRecord` first object test | `isObject` | Implement the first test; keep the prototype and `JSON.stringify` invariant. |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. Not contract `isRecord` — that brand rejects class instances this helper still accepts. |
| `tests/distribution.test.ts` local `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList` as a rename of `isArray`. Kept the local name `isRecord` as the object-and-not-array composition. |
| `tests/config.test.ts` inline `typeof` / `Array.isArray` | `isString` / `isObject` / `isArray` | Retain. These walk Vite/TS/Oxlint config shapes; they are not extracted guards and do not prove this package's public API. |
| `tests/src` `instanceof Error` / `HTMLElement` | `isError` / none | Retain in tests that assert a thrown `Error` identity or drive the real DOM. |
