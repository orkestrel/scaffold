# MCP dependent documentation and native-entry report

## Outcome

Implemented the bounded MCP documentation and native Guide entry unit at baseline
`a01d5e872ace90034c991d61b236df6915128178`. The baseline was clean. The final
tracked changes remain inside the assigned MCP paths. Root review, package gates,
and release acceptance remain pending; this unit does not accept its own work.

## Audit mapping

### M1

Repaired the broken `MCPTaskManagerInterface` sentence while retaining its factual
warning and consequences.

### M2

Aligned the browser-face factory, class, and options summaries by manually comparing
the source descriptions with the browser Surface rows. This is structural evidence
outside the name-keyed equality reader:

| Symbol | Before guide summary | Final guide summary |
| --- | --- | --- |
| `createWebSocketClientTransport` | `Create a MCPMessageTransportInterface through a browser WebSocket.` | `Creates the browser-face WebSocket client transport for an MCPClientInterface — a MCPMessageTransportInterface that drives a remote MCP server over the native WebSocket global. This factory is the browser sibling of the Node face's createWebSocketClientTransport (@orkestrel/mcp/server).` |
| `createHTTPClientTransport` | `Return core HTTPClientTransport through the browser face.` | `Creates the HTTP client transport for an MCPClientInterface — a MCPMessageTransportInterface that drives a remote Streamable-HTTP MCP server over the native fetch.` |
| `WebSocketClientTransport` | `The browser-face MCP WebSocket client transport.` | `Drives a remote MCP server over the native WebSocket global from the browser face, as a client MCPMessageTransportInterface. This class is the browser sibling of the Node face's WebSocketClientTransport.` |
| `WebSocketClientTransportOptions` | `the remote WS endpoint + optional subprotocols` | `Options for createWebSocketClientTransport (browser face) — the remote MCP WebSocket endpoint and any negotiated subprotocols.` |

The final guide wording matches the normalized source descriptions. The guide keeps
the browser `WebSocketClientTransportOptions` Shape as `{ url, protocols? }` and the
Node Shape as `{ url, headers? }`.

### M3

Added the legacy-revision and removable-decorator contract to `createMCPLegacy`.
Clarified the text-stream `return` and `throw` summaries and reconciled their guide
method rows. The `MCPLegacy` implementation, executable ownership tokens, and
progress-stream behavior were not changed.

### M4

Filled the audited Shape cells for reserved metadata, elicitation, pagination,
progress ownership, controlled streams, server extensions, HTTP handler options,
stdio evidence, and scope delivery. Added the extended-interface Shape convention
to the relevant core, server, stdio, and browser type groups. Kept
`DEFAULT_MCP_LIMITS` unchanged.

### M5

Corrected malformed possessives and lowered the audited prose-only capitals without
changing protocol requirement words or runtime behavior.

### M6

Removed the duplicate internal-directory explanation from the README. Replaced
relative prose pointers with named targets. The README now links to the package's
wire-conformance evidence through a descriptive absolute link.

### M7

Collapsed the repeated `tests/guides.test.ts` inventory rows into a descriptive
row that names the guide/public-barrel, legacy/public-face, native parity, stdio,
subscription, progress, and transport evidence.

### M8

Replaced the static inventory entry with native `GuideCommand` composition in
`tests/guides.test.ts`. The entry uses `readInventory` and `createVitest`, keeps the
MCP module/language/internal policy, moves project and Vitest runtime imports into
the anonymous async execute callback, and preserves the package-specific parity
and behavior registrations. No-argument execution did not rewrite tracked files.
Explicit `--to guide` and `--to source` executions converged without further drift.
Obsolete `npm run docs` pointers were removed from owned native-entry comments.

### M9

Completed the existing Shape tables and extended-interface convention. Added named
headings for distinct sibling demonstrations. No authored heading is followed
directly by an unowned fence, and distinct examples no longer share an accidental
nearest heading.

## Assertion preservation

The migrated native entry retains declaration/barrel/internal policy, populated
documented method groups, interface/class membership, method examples, encountered
imports and links, legacy ownership and public-face refusals, stdio spawn and
composition, legacy initialization, subscription stamping and filtering, progress
claiming, burst delivery, capacity refusal, and bound-duplex execution. It uses
native report channels and public Guide leaves only where their semantics match.

## Defect evidence

The baseline native command was executed through the environment-preserving unit
script:

```text
C:/Users/mikes/scoop/apps/git/current/bin/bash.exe tmp/d7n-mcp-dependent-fix/run-native.sh
```

Before migration it exited `1` before collection with
`ERR_MODULE_NOT_FOUND: Cannot find package '@src/core'`. Vitest produced no failing
test count because collection never began.

After native migration and before guide reconciliation, the source description was
changed first and the same command exited `1` with:

```text
Test Files  1 failed (1)
Tests       1 failed | 162 passed (163)
```

The failure reported Summary disagreements. After guide reconciliation, the same
command exited `0` with:

```text
Test Files  1 passed (1)
Tests       163 passed (163)
```

## Final scoped validation

All commands ran from `C:/Users/mikes/WebstormProjects/mcp`.

| Command | Exit | Result |
| --- | ---: | --- |
| `C:/Users/mikes/scoop/apps/git/current/bin/bash.exe tmp/d7n-mcp-dependent-fix/run-native.sh` | `0` | `Test Files 1 passed (1); Tests 163 passed (163)` |
| `C:/Users/mikes/scoop/apps/git/current/bin/bash.exe tmp/d7n-mcp-dependent-fix/run-native.sh --to guide` | `0` | `Test Files 1 passed (1); Tests 163 passed (163)` |
| `C:/Users/mikes/scoop/apps/git/current/bin/bash.exe tmp/d7n-mcp-dependent-fix/run-native.sh --to source` | `0` | `Test Files 1 passed (1); Tests 163 passed (163)` |
| `C:/Users/mikes/scoop/apps/git/current/bin/bash.exe tmp/d7n-mcp-dependent-fix/run-format-check.sh` | `0` | `All matched files use the correct format.` |
| `C:/Users/mikes/scoop/apps/git/current/bin/bash.exe tmp/d7n-mcp-dependent-fix/run-lint.sh` | `0` | Scoped Oxlint completed without diagnostics. |
| `git diff --check` | `0` | No whitespace errors. |

No install, build, full suite, commit, push, publish, or tree-wide mutating gate ran.

## Changed paths

- `README.md`
- `guides/mcp.md`
- `src/browser/types.ts`
- `src/core/factories.ts`
- `src/core/helpers.ts`
- `src/core/types.ts`
- `src/core/validators.ts`
- `tests/guides.test.ts`

Ignored unit instruments:

- `tmp/d7n-mcp-dependent-fix/run-native.sh`
- `tmp/d7n-mcp-dependent-fix/run-format.sh`
- `tmp/d7n-mcp-dependent-fix/run-format-check.sh`
- `tmp/d7n-mcp-dependent-fix/run-lint.sh`

Final tracked diffstat:

```text
README.md              |    8 +-
guides/mcp.md          |  194 +++---
src/browser/types.ts   |   12 +-
src/core/factories.ts  |    4 +
src/core/helpers.ts    |    8 +-
src/core/types.ts      |   19 +-
src/core/validators.ts |    2 +-
tests/guides.test.ts   | 1649 ++++++++++++++++++++++++------------------------
8 files changed, 985 insertions(+), 911 deletions(-)
```

## Deviations

No scope deviation remains. During source-first parity proof, the typed controller's
`return` and `throw` prose was edited along with the intended text controller. That
temporary edit was corrected before reconciliation and is absent from the final
diff. A local README anchor did not satisfy the package's existing URL-oriented
link assertion, so the final descriptive link uses the package's absolute GitHub
target. No off-limits file was changed.
