# Overlap: `@orkestrel/sqlite`

Live checkout: `C:\Users\mikes\WebstormProjects\sqlite` on `main` at `f5e766f`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already imports `isArray` and `isObject`.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isSQLiteError` `instanceof SQLiteError` | `isInstance` | Runtime yes | Contract contains a hostile throw. Direct `isInstance` in `wrapError` failed to narrow the local class (`TS2739` empty object). | Implement in `isSQLiteError`. `wrapError` uses `isSQLiteError` so the type predicate returns `SQLiteError`. |
| `errcode` `typeof === 'number'` | `isNumber` | Yes | `'errcode' in` stays. Not `isRecord` — native errors fail the plain-record brand. | Implement. |
| `wrapError` `instanceof Error` | `isError` | Yes | Contract contains a hostile throw. | Implement. |
| Statement / database try/catch | `attempt` | No | Native `node:sqlite` call sites that rewrite through `wrapError`. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
