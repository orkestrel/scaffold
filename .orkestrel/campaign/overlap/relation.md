# Overlap: `@orkestrel/relation`

Live checkout: `C:\Users\mikes\WebstormProjects\relation` on `main` at `e9fea20`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already used `isRecord` / `isString` / `isArray` / `isDefined`.

## Named types

`isRelationError` is the domain brand.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isRelationError` `instanceof` | `isInstance` | Runtime yes | Domain name stays. | Implement the body. |
| Descriptor `relationship` literal list | `literalOf` | Yes | Present-and-typed; omitted stays unconstrained. Not `objectOf` (`undefined` members must still fail). | Implement. |
| `readColumn` `typeof === 'object' && !== null` | `isObject` | Yes | Not `isRecord` — arrays remain readable. | Implement. |
| Nested include `typeof === 'boolean'` | `isBoolean` | Yes | `boolean \| Include` discriminant. | Implement. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
