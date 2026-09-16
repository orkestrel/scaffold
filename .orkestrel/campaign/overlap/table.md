# Overlap: `@orkestrel/table`

Live checkout: `C:\Users\mikes\WebstormProjects\table` on `main` at `8f5a853`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already imports `attempt`, `isRecord`, `isArray`, `isFiniteNumber`, and JSON cloners.

## Named types

`isTableError` is the domain brand.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| Schema / parse containment | `attempt` / `isRecord` / `isArray` | Yes | Already implemented. | Keep. |
| `isTableError` `instanceof` | `isInstance` | Runtime yes | Domain name stays. | Implement the body. |
| Manager one-or-many `Array.isArray` | `isArray` | Yes | Same overload shape as router `add`. | Implement. |
| Pagination `Number.isFinite` | `isFiniteNumber` | Yes | `Number.isNaN` stays. | Implement. |
| `Object.hasOwn` | none | n/a | Own-key probe. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
