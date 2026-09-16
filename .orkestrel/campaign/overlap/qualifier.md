# Overlap: `@orkestrel/qualifier`

Live checkout: `C:\Users\mikes\WebstormProjects\qualifier` on `main` at `e6dec00`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already used `arrayOf` / `literalOf` / `objectOf` / `recordOf` / `whereOf`, `resolveField`, `isBoolean` / `isNumber` / `isRecord` / `isString` / `isFiniteNumber`.

## Named types

`QualificationResult` is a domain envelope, not contract `Result`.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isQualifierError` `instanceof` | `isInstance` | Runtime yes | Domain name stays. | Implement the body. |
| `renderValue` / empty `any`/`none` `Array.isArray` | `isArray` | Yes | Join/length stays. | Implement. |
| `mapEngineError` `instanceof Error` | `isError` | Yes | Reason-error branch stays first. | Implement. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
