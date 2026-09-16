# Overlap: `@orkestrel/websocket`

Live checkout: `C:\Users\mikes\WebstormProjects\websocket` on `main` at `7d56d0c`, clean before edit. `@orkestrel/contract` `^0.0.17` was development-only. Promoting to runtime because `src` needs originating primitives.

## Named types

`isWebSocketError` is the domain brand.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isWebSocketError` `instanceof` | `isInstance` | Runtime yes | Domain name stays. | Implement the body. |
| Opcode / close-code `Number.isInteger` | `isInteger` | Yes | Range stays. | Implement. |
| Payload / timeout `Number.isSafeInteger` | `isNumber` | Yes on the type test | Contract has no safe-integer primitive. | Implement `isNumber`. Keep `Number.isSafeInteger`. |
| Payload / chunk `typeof === 'string'` | `isString` | Yes | `Buffer.isBuffer` stays first. | Implement. |
| TSDoc `typeof key` examples | none | n/a | Consumer-facing examples. | Retain. |
| `ReturnType<typeof setTimeout>` | none | n/a | Type-only `typeof`. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
