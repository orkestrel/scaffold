# Overlap: `@orkestrel/abort`

Live checkout: `C:\Users\mikes\WebstormProjects\abort` on `main` at `81e5120`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared.

## Named types

No local `Result`, parser, or named guard duplicated a contract export. `isAbortSignal` is the platform brand and stays.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| Options `isRecord` / `isString` | already imported | Yes | None. | Keep originating imports. |
| `isAbortSignal` try/catch around the native `aborted` getter | `holds` / `isFunction` | Yes | Domain brand stays; containment and the function test are contract's. | Implement. |
| `validateAbortOptions` try/catch that throws `ContractError` `'Abort: options could not be read'` | `readValue` | Yes | Same message shape (`<reader>: <subject> could not be read`), code `bound`, context, and cause. | Implement. |
| `linkSignal` native `AbortSignal.any` | none | n/a | Platform composition. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. Not contract `isRecord`. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList` as a rename of `isArray`. |
| `tests/config.test.ts` inline `typeof` / `Array.isArray` | `isString` / `isObject` / `isArray` | Retain. Config walks. |
| `tests/src` `instanceof DOMException` / `TypeError`, `typeof abort.id` | none | Retain. These prove this package's public fields and platform abort identity. |
| `tests/guides.test.ts` class/getter `typeof` | `isFunction` | Retain. These prove this package's public surface for guide parity. |
