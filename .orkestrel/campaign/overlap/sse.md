# Overlap: `@orkestrel/sse`

Live checkout: `C:\Users\mikes\WebstormProjects\sse` on `main` at `f1edfa1`. Contract was development-only `^0.0.17`; promoted to runtime because `src` now imports `isInstance`.

## Named types

No local `Result`, parser, or named guard duplicated a contract export. `isSSEError` stays the public domain name.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isSSEError` `instanceof SSEError` | `isInstance` | Runtime yes | Contract contains a hostile `instanceof` throw. | Implement the body through `isInstance`; do not re-export `instanceOf`. |
| `retry` field `/^\d+$/` | `isInteger` / `parseInteger` | No | WHATWG retry is digit-only text on an already-parsed field string, not a from-unknown number test. `parseInteger` also coerces other types. | Retain the spec regex. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. Not contract `isRecord`. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList` as a rename of `isArray`. |
| `tests/config.test.ts` inline `typeof` / `Array.isArray` | `isString` / `isObject` / `isArray` | Retain. Config walks. |
