# Overlap: `@orkestrel/process`

Live checkout: `C:\Users\mikes\WebstormProjects\process` on `main` at `0cae4df`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already imports `holds`, `isError`, `isString`, `isNonEmptyString`, and `isNonNegativeInteger`.

## Named types

`ExecuteResult` is the buffered run envelope, not contract `Result`.

`isProcessError` is a cross-copy brand (`Symbol.for` + prototype + name + code). Not a rename of `isInstance`.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isProcessError` | `isInstance` | No | Cross-installation brand, not local-class identity. | Retain. |
| ESRCH `instanceof Error` | `isError` | Yes | `'code' in` stays. | Implement. |
| `ProcessManager.stop` string discriminant | `isString` | Yes | Overload vs string list. | Implement. |
| `ReturnType<typeof setTimeout>` | none | n/a | Type-only `typeof`. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
