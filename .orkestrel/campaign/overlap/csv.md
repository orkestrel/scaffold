# Overlap: `@orkestrel/csv`

Live checkout: `C:\Users\mikes\WebstormProjects\csv` on `main` at `a02263f`, clean before edit. Runtime `@orkestrel/contract` `^0.0.17` already declared.

## Named parsers

| Local symbol | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `parseInteger` | `parseInteger` | No | Local requires `INTEGER_PATTERN` (no leading zeros) and `Number.isSafeInteger`. Contract `parseInteger('007')` is `7` and an unsafe integer string still yields a finite integer. | Retain. Confirmed against live contract `0.0.17` `parsers.ts`. |
| `parseReal` | `parseNumber` | No | Local refuses a leading zero. Contract `parseNumber('007.5')` is `7.5`. | Retain. |
| `parseBoolean` | `parseBoolean` | No | Local accepts only the exact canonical true/false texts. Contract also accepts `'1'` / `'0'` / `1` / `0`. | Retain. |

## `src` sweep

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| `limit` `Number.isInteger` | `isInteger` | Yes | Local still requires `>= 0`. `-0` still passes that comparison. | Implement the type test; keep `>= 0`. |
| `serializeCell` `typeof` + `JSON.stringify` try/catch | `isString` / `isNumber` / `isBoolean` / `isBigInt` / `attempt` | Yes | Failure and `undefined` stringify still become `blank`. | Implement. |
| `isRowList` `Array.isArray` | `isArray` | Yes | The explicit predicate stays because readonly-array narrowing needs it. | Implement the body. |
| `isCSVError` `instanceof` | `isInstance` | Runtime yes | Contract contains a hostile throw. | Implement the body. |
| `new CSV` `typeof === 'string'` | `isString` | Yes | Discriminant of `string \| CSVTable`. | Implement. |
| `deriveShapes` `typeof` | `isString` / `isNumber` / `isBoolean` | Yes | `Number.isSafeInteger` stays; contract has no safe-integer guard. | Implement the type tests. |
| `inferRows` `typeof === 'string'` | `isString` | Yes | None. | Implement. |
| `Number.isSafeInteger` in infer/shape | none | n/a | Contract `isInteger` admits unsafe integers. | Retain. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList`. |
| `tests/config.test.ts` inline walks | n/a | Retain. |
