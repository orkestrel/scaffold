# Overlap: `@orkestrel/sea`

Live checkout: `C:\Users\mikes\WebstormProjects\sea` on `main` at `c990c94`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already used `isArrayBuffer`.

## Named types

`isSEAError` and `isShellError` are the domain brands.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `isSEAError` / `isShellError` `instanceof` | `isInstance` | Runtime yes | Domain names stay. | Implement the bodies. |
| `isExecutableFormat` literal list | `literalOf` | Yes | `'pe' \| 'elf' \| 'macho'`. | Implement. |
| Catch `instanceof Error` | `isError` | Yes | Message / cause projection. | Implement. |
| Errno `typeof thrown.code === 'string'` | `isString` | Yes | After `isError` and `'code' in`. | Implement. |
| `AssetManager.register` `Array.isArray` | `isArray` | Runtime yes | `isArray` brands `readonly unknown[]` and fails `Asset(item: AssetInput)`. | Retain. |
| `JSON.stringify` blob config | `cloneJSONValue` | No | Pretty-print for Node `--experimental-sea-config`. | Retain. |
| `isPowerOfTwo` | none | No | Arithmetic invariant. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
