# Overlap: `@orkestrel/html`

Live checkout: `C:\Users\mikes\WebstormProjects\html` on `main` at `20ed05d`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already imports `holds`, `isRecord`, `isString`, `isArray`, `isInteger`, `arrayOf`, `literalOf`, `recordOf`, and `attempt`.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isHTMLNode` leaving `typeof === 'object' && !== null` | `isObject` | Yes | Not `isRecord` — this only needs a WeakSet key. | Implement. |
| Entity `Number.isFinite(parseInt(...))` | `isFiniteNumber` | Yes on this number | Range and surrogate checks stay. | Implement. |
| `parseStartTag` `Number.isInteger` | `isInteger` | Yes | Local still requires `>= 0` and `'<'`. | Implement the type test. |
| Scheme/attribute `typeof has === 'function'` | `isFunction` | Yes | `Set#has` vs `includes` fallback stays. | Implement. |
| `walkNodes` try/catch | `attempt` | No | A generator cannot wrap its body in `attempt` without collecting eagerly. | Retain. |
| `new HTML` `typeof === 'string'` | `isString` | Yes | Discriminant of `string \| HTMLDocument`. | Implement. |
| `typeof implied` in parsers | none | n/a | TypeScript type query, not a runtime test. | Exclude. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
