# Overlap: `@orkestrel/pool`

Live checkout: `C:\Users\mikes\WebstormProjects\pool` on `main` at `bfe5943`, clean before edit. Runtime `@orkestrel/contract` was absent (runtime `@orkestrel/emitter` only). Adding runtime `@orkestrel/contract` `^0.0.17`.

## Named types

`isPoolMax` and `isPoolSignal` are domain brands. `Pool.ts` `#destroy` local `attempt` is a Promise binding, not contract `attempt`.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isPoolMax` `typeof number` + `Number.isSafeInteger` + `> 0` | `isNumber` | Yes on the type test | Contract has no safe-integer primitive. `isInteger` is weaker. | Implement `isNumber`. Keep `Number.isSafeInteger`. |
| `isPoolSignal` try/catch around the native getter | `holds` / `isFunction` | Yes | Same brand as `isAbortSignal`. | Implement. |
| `PoolError` cause `instanceof Error` + string message | `isError` / `isString` | Yes | Contract containment replaces the local try/catch. | Implement. |
| `isPoolError` try/catch `instanceof` | `isInstance` | Yes | Contract already contains a hostile throw. | Implement. |
| `Pool.ts` local `attempt` Promise | `attempt` | No | Async destroy hook, not a Result. | Retain the binding. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
