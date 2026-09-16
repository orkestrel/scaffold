# Overlap: `@orkestrel/indexeddb`

Live checkout: `C:\Users\mikes\WebstormProjects\indexeddb` on `main` at `a2980b1`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already imports `isRecord` and `isArray`.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `supportsIndexedDB` `typeof indexedDB !== 'undefined'` | `isDefined` / `isUndefined` | No | Host feature detection. `typeof` does not evaluate a forbidden getter the way a value read would. | Retain. |
| `wrapCall` `instanceof DOMException` | `isInstance` | Runtime yes | Contract `isInstance` narrows to `object`, which cannot pass `wrapError(DOMException)` without a forbidden assertion. Native `instanceof` keeps the platform brand. | Retain. |
| `isIndexedDBError` `instanceof` | `isInstance` | Runtime yes | Public domain name stays. | Implement the body. |
| Index/store `typeof path === 'string'` | `isString` | Yes | Array-path spread stays. | Implement. |
| Database `Number.isInteger(version)` | `isInteger` | Yes | Local still requires `>= 1`. | Implement the type test. |
| IDB request / transaction try/catch | `attempt` | No | Native request and transaction bridges, not a Result boundary. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
