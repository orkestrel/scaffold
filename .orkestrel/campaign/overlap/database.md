# Overlap: `@orkestrel/database`

Live checkout: `C:\Users\mikes\WebstormProjects\database` on `main` at `f296e0b`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already imports `Result`, `isRecord`, `isString`, `isBoolean`, `isFiniteNumber`, `parseNumber`, and JSON cloners.

## Named types

`isKey`, `isColumnSchema`, `isTableSchema`, `isDriverSchema`, `isMigration*`, `isDriverMetadata`, and `isDatabaseError` are domain brands.

`Database.ts` already uses originating `Result`.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| Schema validators try/catch around `cloneJSON*` | `holds` | Yes | Containment of a hostile clone. | Implement. |
| `isKey` / schema field `typeof` + `Number.isFinite` / `Array.isArray` | `isString` / `isFiniteNumber` / `isBoolean` / `isArray` / `arrayOf` | Yes | `arrayOf` is used where a JSONValue array must narrow to a schema row. Conformance fixtures that `push` onto `meta.tags` keep native `Array.isArray` because contract `isArray` brands a readonly array. | Implement. |
| `isDatabaseError` / cloner rethrow | `isInstance` / `isDatabaseError` | Runtime yes | Direct `isInstance` in a cloner would fail to narrow; the type predicate stays. | Implement. |
| `inferValueStorage` / encode-decode / compare / shape literals | `isBoolean` / `isNumber` / `isInteger` / `isBigInt` / `isObject` / `isString` / `isUint8Array` / `isError` | Yes | `Number.isNaN` stays (NaN order). `isNonNegativeInteger` refuses `-0`; paging keeps `isInteger` + `>= 0`. | Implement. |
| `JSON.parse` in drivers / decode | `parseJSON` | No | Drivers keep the parse `cause` as `DRIVER`. Decode also contains `cloneJSONValue`. | Retain throwing parse plus local catch. |
| `JSON.stringify` encode / index identity | `parseJSON` | n/a | Serialization, not parse. | Retain. |
| `Object.hasOwn` | none | n/a | Own-key probe. | Retain. |
| `equalsValue` / driver `#guard` try/catch | `attempt` | No | Structural walk and driver wrap, not a Result boundary. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
