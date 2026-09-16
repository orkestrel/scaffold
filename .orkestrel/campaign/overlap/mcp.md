# Overlap: `@orkestrel/mcp`

Live checkout: `C:\Users\mikes\WebstormProjects\mcp` on `main` at `96da9df`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already used combinators, `parseJSON`, `cloneJSONValue` / `cloneJSONRecord`, `attempt`, `objectOf`, `arrayOf`, `isJSONValue`, and `sanitizeBudget`.

## Named types

`isMCPError` is the domain brand.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isMCPError` try/`instanceof` | `isInstance` (`validators.ts:387`) | Yes | `isInstance` already wraps `holds`, so the extra try/catch is redundant. | Implement the body. |
| Validators `Array.isArray` | `isArray` (`:716`) | Yes | Collection checks, not mutation. | Implement. |
| `isBoundedString` / elicit integer `Number.is*` | `isInteger` (`:148`) | Yes | Finite integer. | Implement. |
| MCPServer completion/resource lists | `isArray` | Yes | | Implement. |
| Progress token number+integer | `isInteger` | Yes | | Implement. |
| Input-round TTL `Number.isFinite` | `isFiniteNumber` (`:133`) | Yes | | Implement. |
| `serializeJSON` limit/depth/breadth | `isInteger` | Yes | `-0` still passes (`isInteger` + `< 0`). | Implement. |
| Serialize walk object/array/finite | `isObject` (`:605`) / `isArray` / `isFiniteNumber` | Yes | | Implement. |
| Tool-result `JSON.parse`+catch-to-text | `parseJSON` (`parsers.ts:522`) | Yes | Invalid JSON still falls back to text. | Implement. |
| Transport `JSON.parse` that emits the catch | `parseJSON` | No | The SyntaxError **is** the report. | Retain. |
| Protocol `JSON.stringify` | `cloneJSONValue` | No | Wire encoding. | Retain. |
| `instanceof Readable` | `isInstance` | Runtime maybe | Node stream `readableFlowing` slot. | Retain. |
| `Number.isSafeInteger` id text | none | No twin | Keep paired with `isNumber`. | Retain. |
| Catch `instanceof Error` | `isError` (`:454`) | Yes | Client send / WS upgrade. | Implement. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
