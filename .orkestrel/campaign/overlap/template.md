# Overlap: `@orkestrel/template`

Live checkout: `C:\Users\mikes\WebstormProjects\template` on `main` at `5935797`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already imports `createContract`, `isFiniteNumber`, and shapes.

## Named types

`TemplateValidationResult` is the fill-validation envelope, not contract `Result`.

`TemplateManager.#isInstance` is a domain duck-type, not a rename of contract `isInstance`.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isTemplateError` `instanceof` | `isInstance` | Runtime yes | Domain name stays. | Implement the body. |
| Id / target `typeof === 'string'` | `isString` | Yes | UUID fallback stays. | Implement. |
| Path / empty-path `Array.isArray` | `isArray` | Yes | One-or-many FieldPath. | Implement. |
| `#isInstance` method `typeof === 'function'` | `isFunction` | Yes | `'in'` checks stay. | Implement. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
