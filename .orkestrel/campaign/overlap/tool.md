# Overlap: `@orkestrel/tool`

Live checkout: `C:\Users\mikes\WebstormProjects\tool` on `main` at `0974d9e`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already imports `attempt`, `isArray`, `holds`, `isRecord`, `isString`, `isInstance`, and `createContract`.

## Named types

`ToolResult` / `ToolSuccess` / `ToolFailure` are the tool-call envelope, not contract `Result`.

`isToolError` already uses `isInstance`.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| Execute isolation `instanceof Error` | `isError` | Yes | Still wrapped in `attempt` because a hostile `message` getter can throw. | Implement the type test. |
| Manager one-or-many / name lists | `isArray` | Yes | Already implemented. | Keep. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
