# Overlap: `@orkestrel/budget`

Live checkout: `C:\Users\mikes\WebstormProjects\budget` on `main` at `2bb1cae`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared.

## Named types

`isBudgetAmount` composes `isFiniteNumber` with `>= 0` and still accepts `-0`. Contract `isNonNegativeNumber` refuses `-0`. Keep the local composition.

`isTokenScope` is the domain `'completion' | 'total' | 'prompt'` discriminant, not a rename of `literalOf`.

`isBudgetSignal` / `isTokenUsage` stay as domain names.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isBudgetAmount` | `isNonNegativeNumber` | No | Local accepts `-0`. | Retain the composition. |
| `isBudgetSignal` try/catch + `typeof === 'boolean'` | `holds` / `isFunction` / `isBoolean` | Yes | Domain brand stays. | Implement. |
| `isTokenUsage` try/catch around `Reflect.get` | `holds` | Yes | Field invariants stay. | Implement. |
| Options readers that throw `ContractError` `… could not be read` | `readValue` | Yes | Same message shape, code, context, and cause. | Implement on `validateBudgetOptions`, `validateTokenBudgetOptions`, and `createTokenConsumer`. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
