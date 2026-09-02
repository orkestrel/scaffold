# Unit voice-mcp — report

Every TSDoc block under `src/` of `/home/user/fleet/mcp` now opens with a third-person `-s` verb
sentence, and every boolean `@returns` reads `True if …; false otherwise`. The acceptance instrument
reports `mcp files= 40 blocks= 598 imperative= 0 verbless= 0 returnsBad= 0`. The gate chain exits 0
at every step. The tree is uncommitted and unstaged.

## Blocks rewritten by kind

| Kind                                                | Blocks |
| --------------------------------------------------- | ------ |
| First sentence from the imperative                   | 72     |
| First sentence given a verb (bare noun phrase)       | 232    |
| First sentence reworded to drop the symbol's name    | 10     |
| Boolean `@returns`                                   | 77     |

The counts come from `/tmp/claude-0/-home-user-scaffold/249f2596-6386-5f66-868c-31383bbd6eeb/scratchpad/count.mjs`,
which pairs each block against its `HEAD` blob and classifies the launch tree's first sentence with
the acceptance instrument's own rules. The imperative and verbless figures equal the brief's launch
measurement exactly, and no block already in the third person had its first sentence touched
(`third: 0`). The name-drop row is a subset of the verbless row: `MessagePortTransport`,
`WebSocketClientTransport` (browser), `HTTPClientTransport`, `StdioClientTransport`,
`StdioServerTransport`, `WebSocketClientTransport` (server), `MCPServer`, `MCPClient`,
`MCPServerInterface`, and `MCPClientInterface` each carried an expanded form of their own identifier
in the opening noun phrase, which the rewrite removed.

## Files touched

All 26 files sit under `src/`; the repository has no `app/` directory.

- `src/browser/constants.ts`
- `src/browser/transports/MessagePortTransport.ts`
- `src/browser/transports/WebSocketClientTransport.ts`
- `src/browser/types.ts`
- `src/core/MCPClient.ts`
- `src/core/MCPMethodManager.ts`
- `src/core/MCPProgressReporter.ts`
- `src/core/MCPServer.ts`
- `src/core/MCPStreamController.ts`
- `src/core/MCPTaskClient.ts`
- `src/core/MCPTextStreamController.ts`
- `src/core/constants.ts`
- `src/core/errors.ts`
- `src/core/helpers.ts`
- `src/core/transports/HTTPClientTransport.ts`
- `src/core/types.ts`
- `src/core/validators.ts`
- `src/server/HTTPDisconnect.ts`
- `src/server/MCPSession.ts`
- `src/server/constants.ts`
- `src/server/helpers.ts`
- `src/server/transports/StdioClientTransport.ts`
- `src/server/transports/StdioServerTransport.ts`
- `src/server/transports/WebSocketClientTransport.ts`
- `src/server/transports/WebSocketServerTransport.ts`
- `src/server/types.ts`

Diffstat: 26 files changed, 442 insertions(+), 426 deletions(-).

## Gates

Run from `/home/user/fleet/mcp` after the final edit.

| Command                | Exit | Note                                              |
| ---------------------- | ---- | ------------------------------------------------- |
| `npm run format:check` | 0    | All matched files use the correct format          |
| `npm run lint:check`   | 0    | No output                                         |
| `npm run check`        | 0    | Root plus core, browser, and server projects      |
| `npm run build`        | 0    | Core, browser, and server bundles emitted         |
| `npm test`             | 0    | 1337 + 111 + 46 + 86 + 159 + 47 + 4 passed, 1 skipped |

No mutating `lint` or `format` run was needed: `format:check` passed on the first attempt because the
change touches comment text only, which oxfmt does not reflow. `npm test` is reported as an
observation for timing; the Orchestrator's landing chain is the authoritative run.

## Acceptance criteria

1. Comment-only diff: `git diff -U0` yields zero changed lines that are not a `*` or `/**` comment
   line.
2. Instrument clean: `voice-scan.mjs` reports `imperative= 0 verbless= 0 returnsBad= 0` for `mcp`.
3. Later text untouched: a per-file comparison of every doc block's content minus its first paragraph
   and its `@returns` lines against the `HEAD` blob is byte-identical for all 26 files
   (`scratchpad/rest.mjs`). Every `{@link …}` target and every backtick token is preserved except the
   `` `true` ``/`` `false` `` tokens the boolean `@returns` rewrite drops by design, one `` `MessagePort` ``
   duplicate removed with the symbol-name repetition, and four `` `value` `` subjects added where a
   `` `true` for … `` return needed a subject.
4. Gate chain exits 0 at every step.
5. `git status --short` lists 26 entries, all under `src/`.

## Evidence

- `/home/user/scaffold/tmp/units/voice/voice-mcp.diff`
- `/home/user/scaffold/tmp/units/voice/voice-mcp.status`

## Deviations

None. Three judgment calls, recorded because the brief leaves wording to the executor:

- The checkout carries no `.claude/rules/`, so the rule text came from
  `node_modules/@orkestrel/scaffold/dist/host/claude/rules/typescript.md`, as the brief directs.
- `MCPClient` and `MCPClientInterface` lost the trailing appositive `— a transport-agnostic Model
  Context Protocol CLIENT`, which repeated the symbol's name. To keep the transport-agnostic fact,
  `an injected {@link MCPMessageTransportInterface}` became `any injected
  {@link MCPMessageTransportInterface}`. `MCPServer` and `MCPServerInterface` needed no such
  compensation: their sentences already state `with NO transport coupling`.
- Five boolean `@returns` stay on one line beyond 100 columns. The instrument matches
  `; false otherwise` on a single line, so wrapping there reads as an unconverted block. oxfmt does
  not reflow comments and `format:check` passes; the repository already carries comment lines of that
  length.
