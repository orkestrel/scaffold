# Overlap: `@orkestrel/agent`

Live checkout: `C:\Users\mikes\WebstormProjects\agent` on `main` at `cc8a5b2`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already used combinators, shapes, `createContract`, `parseJSONAs`, `parseJSONValue`, cloners, `attempt`, `isArray` / `isRecord` / `isString` / `isBoolean` / `isFiniteNumber` / `isObject`.

## Named types

Local error brands: `isProviderAbortError`, `isAgentJobError`, `isConversationError`, `isAgentError`, `isProviderError`.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| Error-brand `instanceof` | `isInstance` (`validators.ts:387`) | Yes | Local classes. | Implement. |
| RelayStream abort catch | `isProviderAbortError` | Yes | | Implement. |
| `sanitizeToken` `Number.isFinite` | `isFiniteNumber` (`:133`) | Yes | Already imported. | Implement. |
| `JSON.stringify` wire / estimate | none | — | Protocol / estimate encode. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
