# @orkestrel/jsonrpc design

The design round `ROADMAP.md` item 81 names, for `@orkestrel/jsonrpc`, `@orkestrel/lsp`, and `@orkestrel/mcp`. The consult of 2026-10-30 read lsp 0.0.12 and mcp 0.0.40, ran both packages' built guards over one value set, and read the JSON-RPC 2.0 specification, the MCP specification and schema for revision 2025-06-18, and the official MCP TypeScript SDK. The user rules the open decisions before the package is created.

## Rulings proposed

1. `JSONRPCErrorResponse.id` is required and typed `JSONRPCId | null`. JSON-RPC 2.0 § 5 requires `id` on every response and sets it to `null` when the request's id could not be read, which admits `null` under `AGENTS.md` § Design laws. `JSONRPCId` stays `string | number`, so a request's and a result response's `id` stay non-null. The MCP specification, its schema, and the SDK's server transport write `id: null` for an unreadable id; mcp's guide claims MCP omits it.
2. `JSONRPCMessage = JSONRPCInvocation | JSONRPCResponse`, `JSONRPCInvocation = JSONRPCRequest | JSONRPCNotification`, and `JSONRPCResponse = JSONRPCResultResponse | JSONRPCErrorResponse`; `JSONRPCInvocation` moves into the package with its guard.
3. Every guard is total over `unknown`, built from `@orkestrel/contract`'s `isRecord`, `holds`, `isString`, and `isInteger`, structural rather than clone-backed, and accepts extra members. An `id` is a string or a finite integer; an error `code` is an integer; a `result` is any present value. Each invocation arm refuses a `result` or `error` member and each response arm refuses a `method` member, so the arms partition every input: mcp's guards answer a message carrying `method` and `result` as both a request and a response today.
4. Beyond item 81's list, `isJSONRPCId`, `isJSONRPCResultResponse`, `isJSONRPCErrorResponse`, `isJSONRPCMessage`, `buildJSONRPCResult`, and `buildJSONRPCError` move. `parseJSONRPCMessage`, `JSONRPC_SERVER_ERROR`, `MCPError`, `LSPError`, lsp's framing readers, and lsp's error-context arm stay in their packages, and the package throws no error of its own.

## Surface

Layer 1, depending on `@orkestrel/contract` alone; one `src/core` environment; guide `guides/jsonrpc.md`.

| Name | Kind | Signature | Summary |
| --- | --- | --- | --- |
| `JSONRPCId` | type | `string \| number` | Identifies a JSON-RPC 2.0 request and the response that answers it. |
| `JSONRPCRequest` | interface | `{ jsonrpc, id, method, params? }` | Describes a JSON-RPC 2.0 method call that requires a response. |
| `JSONRPCNotification` | interface | `{ jsonrpc, method, id?, params? }` | Describes a JSON-RPC 2.0 method call that permits no response. |
| `JSONRPCInvocation` | type | `JSONRPCRequest \| JSONRPCNotification` | Describes one inbound JSON-RPC 2.0 call, a request or a notification. |
| `JSONRPCError` | interface | `{ code, message, data? }` | Describes the error object a JSON-RPC 2.0 error response carries. |
| `JSONRPCResultResponse` | interface | `{ jsonrpc, id, result, error? }` | Describes a successful JSON-RPC 2.0 response. |
| `JSONRPCErrorResponse` | interface | `{ jsonrpc, id, error, result? }` | Describes a failed JSON-RPC 2.0 response, with `id` set to `null` when the request's id could not be read. |
| `JSONRPCResponse` | type | `JSONRPCResultResponse \| JSONRPCErrorResponse` | Describes either outcome of a JSON-RPC 2.0 request. |
| `JSONRPCMessage` | type | `JSONRPCInvocation \| JSONRPCResponse` | Describes one complete JSON-RPC 2.0 wire message. |
| `JSONRPC_PARSE_ERROR` | const | `-32700` | Identifies a payload that is not valid JSON, `-32700`. |
| `JSONRPC_INVALID_REQUEST` | const | `-32600` | Identifies a payload that is not a valid JSON-RPC 2.0 request, `-32600`. |
| `JSONRPC_METHOD_NOT_FOUND` | const | `-32601` | Identifies a method the receiver does not provide, `-32601`. |
| `JSONRPC_INVALID_PARAMS` | const | `-32602` | Identifies invalid method parameters, `-32602`. |
| `JSONRPC_INTERNAL_ERROR` | const | `-32603` | Identifies an internal receiver failure, `-32603`. |
| `isJSONRPCId` | function | `(value: unknown) => value is JSONRPCId` | Checks whether a value is a JSON-RPC 2.0 id, a string or a finite integer. |
| `isJSONRPCError` | function | `(value: unknown) => value is JSONRPCError` | Checks whether a value is a JSON-RPC 2.0 error object. |
| `isJSONRPCRequest` | function | `(value: unknown) => value is JSONRPCRequest` | Checks whether a value is a JSON-RPC 2.0 request. |
| `isJSONRPCNotification` | function | `(value: unknown) => value is JSONRPCNotification` | Checks whether a value is a JSON-RPC 2.0 notification. |
| `isJSONRPCInvocation` | function | `(value: unknown) => value is JSONRPCInvocation` | Checks whether a value is a JSON-RPC 2.0 request or notification. |
| `isJSONRPCResultResponse` | function | `(value: unknown) => value is JSONRPCResultResponse` | Checks whether a value is a successful JSON-RPC 2.0 response. |
| `isJSONRPCErrorResponse` | function | `(value: unknown) => value is JSONRPCErrorResponse` | Checks whether a value is a failed JSON-RPC 2.0 response. |
| `isJSONRPCResponse` | function | `(value: unknown) => value is JSONRPCResponse` | Checks whether a value is a JSON-RPC 2.0 response. |
| `isJSONRPCMessage` | function | `(value: unknown) => value is JSONRPCMessage` | Checks whether a value is a JSON-RPC 2.0 message. |
| `buildJSONRPCResult` | function | `(id: JSONRPCId, result: unknown) => JSONRPCResultResponse` | Builds a successful JSON-RPC 2.0 response that echoes the request's id. |
| `buildJSONRPCError` | function | `(id: JSONRPCId \| null, code: number, message: string, data?: unknown) => JSONRPCErrorResponse` | Builds a failed JSON-RPC 2.0 response, omitting `data` when it is absent. |

The members are readonly; `jsonrpc` is `'2.0'`; `params` is `Readonly<Record<string, unknown>>`; `result` is `unknown`; a notification's `id`, a result response's `error`, and an error response's `result` are `never`. The package's tests migrate the JSON-RPC blocks of mcp's `tests/src/core/validators.test.ts` and `tests/src/core/helpers.test.ts` and lsp's `tests/src/core/validators.test.ts`, with the `id` expectations pinned to `null`, and add one table-driven case per guard and a partition case over values carrying both halves' discriminants.

## Adoption

- **lsp** declares the package, deletes its JSON-RPC types (`src/core/types.ts`), the five codes (`src/core/constants.ts`), and the four guards (`src/core/validators.ts`), imports them in `src/core/helpers.ts`, `LSPClient.ts`, `parsers.ts`, `LSPFraming.ts`, `LSPSession.ts`, and `errors.ts`, and builds its unsupported-method response with `buildJSONRPCError`. Nothing in `LSPClient` changes at runtime; its guards start refusing a fractional `id` and a non-integer error `code`.
- **mcp** declares the package, adds it to its build's externals and its distribution proof's pinned table, deletes its JSON-RPC types, codes, `isJSONRPCId`, nine guards, and both builders, and imports them across the files that name them. Every unreadable-id error envelope on HTTP, stdio, WebSocket, and the legacy client transport carries `id: null`, so `buildJSONRPCError(undefined, …)` becomes `buildJSONRPCError(null, …)`, and every test pinning an absent `id` on an error envelope pins `id: null`. `JSONRPCResultResponse.result` widens from MCP's result union to `unknown`, and `MCPLegacy.ts` narrows it with `isMCPResult` before reading it.
- **probe**, which depends on both, imports only `JSONRPC_SERVER_ERROR` from mcp and needs no edit. **browser**'s `BROWSE_UPSTREAM` list in scaffold's `src/core/constants.ts` gains the package when browser re-pins an mcp that declares it.

## Open decisions

- Approve ruling 1's wire change: mcp's error envelopes carry `id: null` where they omit `id` today. No third-party MCP client was run against it.
- By-name `params` only: the guards refuse JSON-RPC § 4.2 by-position arrays, as both copies do; a later generic consumer would need the array arm.
- `result: unknown` drops mcp's compile-time claim that a method handler returns an MCP result; mcp's typecheck against the package proves the reads still narrow.
- `buildJSONRPCResult` is a typed literal with no translation, kept as the success half of a pair; deleting it under the wrapper law is the alternative.
- The plain-record `isRecord` root refuses a class instance, which `.claude/rules/patterns.md` § Foreign contracts asks a guard over a foreign interface to accept; both copies refuse one today.
- Creating the `orkestrel/jsonrpc` GitHub repository and publishing the package's first version, 0.0.1.
