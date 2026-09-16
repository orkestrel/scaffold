# Overlap: `@orkestrel/lsp`

Live checkout: `C:\Users\mikes\WebstormProjects\lsp` on `main` at `5f02eff`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already used `arrayOf` / `literalOf` / `optionalOf` / `unionOf` / `holds`, `parseJSON`, `isBoolean` / `isInteger` / `isNumber` / `isRecord` / `isString` / `isError`.

## Named types

`isLSPError` is a cross-copy brand (`name`, symbol, declared code), not `isInstance`.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `textDocumentSync` `typeof === 'object'` | `isLSPTextDocumentSyncOptions` | Yes on this union | Domain guard already composed from contract combinators. | Implement. |
| Publication `Array.isArray` then copy/freeze | `isArray` | Runtime yes | `isArray` brands `readonly unknown[]` and fails `TS2345` into `readonly LSPDiagnostic[]`. Native `Array.isArray` keeps the existing resolve path. | Retain. |
| Content-Length `Number.isSafeInteger` | `isNumber` | Yes on the type test | Contract has no safe-integer primitive. | Implement `isNumber`. Keep `Number.isSafeInteger`. |
| Frame `JSON.stringify` | `cloneJSONValue` / `canonicalStringify` | No | Protocol bytes, and a throw is the framing error. | Retain. |
| `isLSPError` brand | `isInstance` | No | Cross-copy brand plus declared-code membership. | Retain. |
| Type-only `typeof LSP_*` | none | n/a | Type query. | Exclude. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
