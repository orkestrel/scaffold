# Overlap: `@orkestrel/queue`

Live checkout: `C:\Users\mikes\WebstormProjects\queue` on `main` at `4252afb`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already used `Result`, `createContract`, `cloneJSONValue`, `integerShape` / `stringShape`, `preview`, `isFiniteNumber` / `isInteger` / `isRecord` / `isString`.

## Named types

Handler `Result` is contract `Result`. Domain `QueueError` stays.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isQueueError` `instanceof` in try/catch | `isInstance` | Yes | `isInstance` already contains through `holds`. | Implement. |
| `isQueueSignal` native getter try/catch | `holds` | Yes | Native `aborted` slot probe stays. | Implement. |
| `isStoredEntry` try/catch around record fields | `holds` | Yes | `'input' in value` stays. | Implement. |
| Abort/store wrap `instanceof Error` | `isError` | Yes | Message/cause projection stays. | Implement. |
| Concurrency/retries `Number.isSafeInteger` | none | n/a | No safe-integer primitive. Already beside `isInteger`. | Retain. |
| `readOption` try/catch | `readValue` / `attempt` | No | Those throw `ContractError`; this door throws `QueueError` `invalid`. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
