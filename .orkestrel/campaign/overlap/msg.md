# Overlap: `@orkestrel/msg`

Live checkout: `C:\Users\mikes\WebstormProjects\msg` on `main` at `2e54e1c`, clean before edit. Declared `@orkestrel/contract` was absent; lockfile already resolved `0.0.17` through the development closure.

| Local symbol | Contract candidate | Same semantics? | Difference | Decision | Required tests |
| --- | --- | --- | --- | --- | --- |
| `Result` / `Success` / `Failure` in `src/core/types.ts` | `Result` / `Success` / `Failure` | Yes for the discriminant `{ success, value \| error }` | Local defaulted `E` to `Error`; contract defaults `E` to `unknown`. `createMSG` already names `Result<MSGInterface, MSGError>`, so the default is unused at the public factory. | Implement: delete the local types; import originating symbols; do not re-export them. | Existing `createMSG` / helper tests keep constructing and narrowing through local `success` / `failure` / `isSuccess` / `isFailure`. |
| `success` / `failure` / `isSuccess` / `isFailure` in `src/core/helpers.ts` | none | n/a | Contract publishes no constructors or narrowers; `attempt` captures every throw as `Failure<unknown>`. | Retain: they construct and narrow the imported Result shape. They are not rename wrappers of a contract function. | `tests/src/core/helpers.test.ts` Result helpers. |
| `createMSG` try/catch | `attempt` | No | `createMSG` returns `Failure` only for `MSGError` and rethrows any other throw. `attempt` would swallow those into `Failure<unknown>`. | Retain the domain catch. | `tests/src/core/factories.test.ts` malformed and empty input. |
| `isRecord` in `src/core/validators.ts` | `isRecord` | Same target type; contract is the stricter plain-record brand | Local accepted any non-null non-array object, including `Date`, `Map`, and class instances. Contract accepts object literals and null-prototype records only. Email guards are built for plain parsed records. | Implement: import originating `isRecord`; do not re-export it. | Domain guards still accept plain objects and null-prototype records; reject a class instance whose fields would otherwise match. |
| `isEmailFormat` / `isEmailAttachment` / `isEmailMessage` / `isEmailChain` | none | n/a | Domain shapes. Field tests now use contract primitives as recorded below. | Retain the domain guards. | Existing validator tests plus a sparse `to` rejection. |

## `src` sweep (`typeof` / `instanceof` / `Array.isArray` / `Number.is*` / JSON / outcomes)

| Local check | Contract candidate | Same semantics? | Difference | Decision |
| --- | --- | --- | --- | --- |
| Email field `typeof === 'string'` | `isString` | Yes | None. | Implement. |
| Attachment `bytes instanceof Uint8Array` | `isUint8Array` | Runtime yes | Contract contains a hostile `instanceof` throw. | Implement. |
| Optional `date instanceof Date` | `isDate` | Runtime yes | Contract contains a hostile throw. | Implement. |
| `Array.isArray` + `every(typeof === 'string')` on `to` / `cc` | `arrayOf(isString)` | No for sparse arrays | `Array.prototype.every` skips holes; `arrayOf` refuses them. Dense string lists are the email invariant. | Implement `arrayOf`. |
| `Array.isArray` + `every(isEmailAttachment)` / `every(isEmailMessage)` | `arrayOf(...)` | Same dense difference | Domain element guards stay. | Implement `arrayOf`. |
| `isMSGError` `instanceof MSGError` | `isInstance` | Runtime yes | Contract contains a hostile throw. `isMSGError` stays the public domain name. | Implement the body through `isInstance`; do not re-export `instanceOf`. |
| `new MSG` `instanceof Uint8Array` / `ArrayBuffer` | `isUint8Array` / `isArrayBuffer` | Runtime yes | Total brands for the `MSGInput` discriminant. | Implement. |
| Attachment name / id / folder `typeof` | `isString` / `isNumber` | Yes | Domain fallbacks stay. | Implement. |
| `#string` / `#number` / `#boolean` / `#binary` | `isString` / `isNumber` / `isBoolean` / `isUint8Array` | Yes for identity, not `parseString` / `parseNumber` / `parseBoolean` | Contract parsers coerce. These methods must not. | Implement the guards; keep the methods as non-coercing projections. |
| `Number.isNaN(parseInt(...))` | `isFiniteNumber` | Yes on this `parseInt` result | `parseInt` does not yield `±Infinity` here. | Implement. |
| Recipient-role `typeof === 'number'` | `isNumber` | Yes | Domain mapping stays. | Implement. |
| Burner `Number.isInteger` + `< 0` | `isNonNegativeInteger` | Yes except documented `-0` | Local already refused `-0` via `< 0`. | Implement. |
| `decodeMIMEWords` try/catch | `attempt` | Yes | Sync decode; failure returns the original encoded word. | Implement as that projection. |
| `isNaN(date.getTime())` | none | n/a | Invalid-Date test, not a type guard. `isDate` accepts an invalid `Date`. | Retain. |
| Attachment extract try/catch | `attempt` | No | Continues the loop on any throw; not a Result boundary. | Retain. |
| `isEmailFormat` literals | `literalOf('eml', 'msg')` | Yes | The named domain guard is `EmailFormat`, not a rename of `literalOf`. | Retain the two-literal body. |

## Test sweep

| Local check | Contract candidate | Decision |
| --- | --- | --- |
| `tests/setupPolicy.ts` `isPolicyRecord` | `isObject` && `!isArray` | Implement. Not contract `isRecord`. |
| `tests/distribution.test.ts` `isRecord` / `isNames` / `isList` | `isObject` / `isArray` / `isString` | Implement. Deleted `isList` as a rename of `isArray`. |
| `tests/config.test.ts` inline `typeof` / `Array.isArray` | `isString` / `isObject` / `isArray` | Retain. These walk Vite/TS/Oxlint config shapes. |
| `tests/src` `typeof result.name` / `instanceof TypeError` | none | Retain. These prove this package's public fields and thrown identity. |
