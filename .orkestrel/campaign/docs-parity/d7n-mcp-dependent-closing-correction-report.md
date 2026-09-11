# MCP dependent closing correction report

## Outcome

Applied the named CLOSING corrections to `README.md` and `guides/mcp.md` at
`a01d5e872ace90034c991d61b236df6915128178`. The correction did not change MCP
source, runtime, public contracts, behavioral tests, native-entry tests, package
metadata, generated configuration, or setup policy. Root review and release
acceptance remain pending.

## Demonstration lead-ins

Added complete demonstration sentences before the unchanged fences under these
method headings:

- `MCPStreamControllerInterface`: stops the typed exchange through its serialized mirror.
- `MCPMethodManagerInterface`: registers and looks up a modern method handler.
- `MCPTaskClientInterface`: reads and updates a deferred tool call through the Tasks extension.
- `HTTPDisconnect`: bridges a held-open SSE response to the request's cancellation signal.
- `MCPSessionInterface`: pushes, replays, attaches, and detaches a session's resumable stream.
- `StdioServerInterface`: starts and stops the stdio ingress handle.
- `ScopeServerInterface`: stops a worker-scope server and demonstrates inert repeated cleanup.

The root source-prepublish freeze comparison changes only the added lead-in lines
around these fences. It changes no fence body.

## Shape corrections

Updated only the guide Shape cells:

| Type | Final Shape |
| --- | --- |
| `MCPCallerHandler` | `(request: Request, context: RouteContext<string, TState> \| undefined) => unknown` |
| `MCPHeaderIssue` | `{ header, reason, message }` |
| `MCPPromptMessage` | `{ role, content }` |
| `MCPElicitSchema` | `Readonly<Record<string, unknown>> plus { $schema?, type, properties, required? }` |

`MCPCallerHandler` now contains the alias RHS rather than the leftover generic
declaration fragment. Its optional context arm, return type, and escaped Markdown
union remain. `MCPElicitSchema` keeps its declared parent and bare added members;
the Shape no longer embeds the `type: 'object'` property annotation.

## README Usage form

Moved the opening TypeScript fence directly under `## Usage`. Preserved the
onboarding fact in `This example exposes a tool registry over MCP, mounted on the
HTTP spine.` after that example. The fence body and following client example are
unchanged.

## Scoped evidence

Commands ran from `C:/Users/mikes/WebstormProjects/mcp` through ignored correction
instruments.

| Command | Exit | Result |
| --- | ---: | --- |
| `C:/Users/mikes/scoop/apps/git/current/bin/bash.exe tmp/d7n-mcp-dependent-closing-correction/run-format-check.sh` | `0` | `All matched files use the correct format.` |
| `C:/Users/mikes/scoop/apps/git/current/bin/bash.exe tmp/d7n-mcp-dependent-closing-correction/run-native.sh` | `0` | `Test Files 1 passed (1); Tests 163 passed (163)` |
| `git diff --check` | `0` | No whitespace errors. |

Retained receipts:

- `tmp/d7n-mcp-dependent-closing-correction/format.stdout.txt`
- `tmp/d7n-mcp-dependent-closing-correction/format.stderr.txt`
- `tmp/d7n-mcp-dependent-closing-correction/format.exit.txt`
- `tmp/d7n-mcp-dependent-closing-correction/native.stdout.txt`
- `tmp/d7n-mcp-dependent-closing-correction/native.stderr.txt`
- `tmp/d7n-mcp-dependent-closing-correction/native.exit.txt`

The native stdout records:

```text
Test Files  1 passed (1)
Tests       163 passed (163)
Duration    3.01s
```

Native stderr is empty. Format stdout records the passing format result. Format
stderr contains only the npm execution notices.

## Delta from the root source-prepublish freeze

Reconstructed the owned freeze files from `HEAD` plus
`tmp/pass/d7n-mcp-dependent-source-prepublish/diff-after.txt`, then compared them
with the corrected working files. The retained exact deltas are:

- `tmp/d7n-mcp-dependent-closing-correction/closing-readme.diff.txt`
- `tmp/d7n-mcp-dependent-closing-correction/closing-guide.diff.txt`
- `tmp/d7n-mcp-dependent-closing-correction/closing-readme.numstat.txt`
- `tmp/d7n-mcp-dependent-closing-correction/closing-guide.numstat.txt`

Measured delta:

```text
README.md     2 insertions, 2 deletions
guides/mcp.md 30 insertions, 16 deletions
```

The guide measurement includes formatter-only table-width alignment around
`MCPHeaderIssue` and `MCPCallerHandler`. Semantic changes are limited to the named
Shape cells and demonstration lead-ins. The README measurement is the onboarding
sentence move and its post-example framing.

Current tracked status still contains the root source-prepublish work and generated
repair. This correction adds no tracked path beyond `README.md` and `guides/mcp.md`.

## Limits

This correction does not supply or recreate the unavailable historic source-first
Summary-red transcript. The separate recovery report remains the record of that
limit. No install, build, whole-suite gate, commit, push, ref change, authentication,
or upload ran.
