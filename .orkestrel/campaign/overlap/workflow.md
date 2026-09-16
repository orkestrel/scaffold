# Overlap: `@orkestrel/workflow`

Live checkout: `C:\Users\mikes\WebstormProjects\workflow` on `main` at `1089474`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already used combinators, shapes, `createContract`, `compileGuard`, cloners, `attempt`, `Result`, `isRecord` / `isArray` / `isBoolean` / `isFiniteNumber` / `isFunction` / `isInteger` / `isJSONValue` / `isNonEmptyString` / `isObject` / `isPromise`.

## Named types

`isWorkflowError` is a local-class brand. `errorToMessage` is a persistence projection.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isWorkflowError` try/`instanceof` | `isInstance` (`validators.ts:387`) | Yes | `isInstance` already wraps `holds`. | Implement. |
| Snapshot `description` `typeof !== 'string'` | `isString` (`:97`) | Yes | Empty string still admitted. | Implement. |
| `Task.fail` message | `isString` | Yes | | Implement. |
| `report` `instanceof WorkflowError` | `isWorkflowError` | Yes | | Implement. |
| Silence / timeout `Number.isFinite` | `isFiniteNumber` (`:133`) | Yes | Already imported in helpers. | Implement. |
| `errorToMessage` `instanceof Error` | `isError` (`:454`) / `isString` | Yes | | Implement. |
| `matchesDescription` `typeof === 'string'` | `isString` | Yes | | Implement. |
| Wait outcome `typeof === 'boolean'` | `isBoolean` (`:204`) | Yes | | Implement. |
| Diagnostic `` `${typeof signal}` `` | none | — | Identity label. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
