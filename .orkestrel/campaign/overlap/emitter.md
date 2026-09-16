# Overlap: `@orkestrel/emitter`

Live checkout: `C:\Users\mikes\WebstormProjects\emitter` on `main` at `1353a4d`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already imports `isFunction`.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| Constructor / hook `isFunction` | already imported | Yes | None. | Keep originating import. |
| `emit` / `#surface` try/catch | `attempt` | No | Isolates a listener throw, continues siblings, and routes to the error hook. `attempt` would collapse that into a Result and stop the loop. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
