# Overlap: `@orkestrel/rater`

Live checkout: `C:\Users\mikes\WebstormProjects\rater` on `main` at `9432bac`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already used `arrayOf` / `literalOf` / `objectOf` / `recordOf`, `isArray` / `isBoolean` / `isJSONValue` / `isNumber` / `isRecord` / `isString`.

## Named types

`LineResult` / `RatingResult` are domain envelopes, not contract `Result`.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isRaterError` `instanceof` | `isInstance` | Runtime yes | Domain name stays. | Implement the body. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
