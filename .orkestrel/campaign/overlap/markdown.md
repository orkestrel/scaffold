# Overlap: `@orkestrel/markdown`

Live checkout: `C:\Users\mikes\WebstormProjects\markdown` on `main` at `af27846`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared. `src` already imports `parseInteger`, `isNonEmptyString`, `isNonEmptyArray`, guards, and contract shapes.

## Named types

`MarkdownParseResult` is a parse tuple, not contract `Result`.

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `new Markdown` `typeof === 'string'` | `isString` | Yes | Discriminant of `string \| MarkdownDocument`. | Implement. |
| Helper `'value' in` + `typeof === 'string'` | `isString` | Yes | Presence check stays. | Implement. |
| Heading / list `parseInteger` | already imported | Yes | `?? 1` fallback stays. | Keep. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/setup.test.ts` `isRecordLike` | n/a | Retain. Setup fixture walker. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
