# Overlap: `@orkestrel/workspace`

Live checkout: `C:\Users\mikes\WebstormProjects\workspace` on `main` at `a097957`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already used `arrayOf` / `holds` / `isNumber` / `isRecord` / `isString` / `literalOf` / `isArray` / `rawShape` / `stringShape`.

## Named types

`isWorkspaceError` is the domain brand.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isWorkspaceError` `instanceof` | `isInstance` (`validators.ts:387`) | Runtime yes | Domain name stays. | Implement the body. |
| `isText` / `isBinary` `'text' in` / `'base64' in` | none | No | Typed `FileContent` arm discriminant, not a type test. | Retain. |
| `isValidRange` numeric bounds | none | No | Domain 1-based range invariant. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
