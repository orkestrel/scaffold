# Overlap: `@orkestrel/timeout`

Live checkout: `C:\Users\mikes\WebstormProjects\timeout` on `main` at `1b5e0d4`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already imports `isInteger`, `isRecord`, and `isString`.

## Named types

`isTimeoutDuration` composes `isInteger` with the inclusive `[0, MAX_TIMEOUT_MS]` range. Not a rename of `isNonNegativeInteger`.

`isTimeoutSignal` is the platform brand and stays as the domain name.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isTimeoutDuration` | `isNonNegativeInteger` | No | Local also caps at `MAX_TIMEOUT_MS`. | Retain the composition. |
| `isTimeoutSignal` try/catch + `typeof === 'boolean'` | `holds` / `isFunction` / `isBoolean` | Yes | Same native-getter brand as `isBudgetSignal`. Domain name stays. | Implement. |
| `validateTimeoutOptions` try/catch that throws `ContractError` `'Timeout: options could not be read'` | `readValue` | Yes | Same message shape, code, context, and cause. | Implement. |
| `Timeout.ts` `ReturnType<typeof setTimeout>` | none | n/a | Type-only `typeof`. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
| `tests/src/core/helpers.test.ts` `instanceof TypeError` | none | Retain. Proves this package's `ContractError.cause`. |
| `tests/guides.test.ts` originating `isRecord` / `parseJSON` | already imported | Keep. |
