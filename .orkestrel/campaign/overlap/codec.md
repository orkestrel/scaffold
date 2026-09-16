# Overlap: `@orkestrel/codec`

Live checkout: `C:\Users\mikes\WebstormProjects\codec` on `main` at `0968e65`. Declared `@orkestrel/contract` was absent; lockfile already resolved `0.0.17` through the development closure. Runtime `^0.0.17` added because `src` now imports originating guards.

## Named types

No local `Result`, parser, or named guard duplicated a contract export. Domain `isBase64` / `isUTF8` / siblings stay: each asks this package's decoder or encoder.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| Text guards `typeof === 'string'` | `isString` | Yes | Domain decode/encode still follows. | Implement. |
| Byte guards `ArrayBuffer.isView` | `isArrayBufferView` | Yes | Contract contains a throw from `ArrayBuffer.isView`. | Implement. Keep it first so a proxy never reaches a decoder `length`. |
| Byte guards `instanceof Uint8Array` | `isUint8Array` | Runtime yes | Contract contains a hostile `instanceof` throw. Alone it would accept a proxy that `instanceof` admits. | Implement after `isArrayBufferView`, not instead of the view-slot test. |
| `isArrayBufferView` + `isUint8Array` as `isUint8Array` only | `isUint8Array` | No | `isUint8Array` uses `instanceof` and can admit a proxy; the decoder would then walk a `length` trap. | Retain the view-slot conjunct. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. Not contract `isRecord`. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList` as a rename of `isArray`. |
| `tests/config.test.ts` and `tests/guides.test.ts` inline `typeof` | `isObject` / `isString` | Retain. Config and manifest walks, and the guides suite's package.json parse, are not extracted guards. |
