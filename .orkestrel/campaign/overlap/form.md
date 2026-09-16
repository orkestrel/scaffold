# Overlap: `@orkestrel/form`

Live checkout: `C:\Users\mikes\WebstormProjects\form` on `main` at `3a759d7`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already imports `Result`, `attempt`, `isRecord`, `isArray`, `isFunction`, `isString`, `parseNumber`, and JSON cloners.

## Named types

`FormResult` is `Result<FormValues, readonly FieldError[]>`. Originating `Result` is already imported.

`isFormError` is the domain brand.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| Schema / value / parser containment | `attempt` / `isRecord` / `isArray` / `isFunction` | Yes | Already implemented. | Keep. |
| `isFormError` `instanceof FormError` | `isInstance` | Runtime yes | Public domain name stays. | Implement the body. |
| `Object.hasOwn` on field keys | none | n/a | Own-key probe; presence ≠ value. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
