# Overlap: `@orkestrel/worker`

Live checkout: `C:\Users\mikes\WebstormProjects\worker` on `main` at `b9ced5c`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already used `attempt` / `isRecord` / `Guard` / shapes.

## Named types

`serveWorker` is a spawned-thread entry. It cannot import `@orkestrel/contract` at runtime.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isReply` error field `typeof === 'string'` | `isString` (`validators.ts:97`) | Yes | | Implement. |
| Dispatch postMessage wrap `instanceof Error` | `isError` (`:454`) | Yes | | Implement. |
| Dispatch `instanceof Thread` | `isInstance` (`:387`) | Same runtime | `isInstance` failed to narrow `Thread` (`TS2339` `evict`). | Retain native `instanceof`. |
| `serveWorker` envelope `typeof` / `Array.isArray` / `instanceof Error` | `isObject` / `isArray` / `isString` / `isError` | Yes | Thread entry imports only `node:worker_threads`. | Retain. |
| TSDoc `typeof === 'number'` examples | `isNumber` | — | Consumer-facing examples, not live code. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
