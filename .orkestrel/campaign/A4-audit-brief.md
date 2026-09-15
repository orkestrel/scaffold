# Audit A4 — falsify unit U4 (`@orkestrel/mcp` browser face: `createPageServer`, the WebMCP bridge `createModelContext`, the IDL double, the parity matrix)

## Role and lane

One brief, three blind lanes; state which you hold in your first line.

- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at `C:/Users/mikes/WebstormProjects/mcp`):
  OBJECTIVE lane and the cross-engine lane (the unit was written on Opus 5). Do not attempt a
  test run (the read-only sandbox refuses vitest's temp writes and cannot launch Chromium); name
  each vector as `UNRESOLVED` with its exact command and expected reading, and read the
  Orchestrator's gate log named under Already established for the readings that exist.
- `reviewer` on Opus 5 (native; Read, Grep, Glob): SUBJECTIVE lane; **your engine wrote this
  unit** — attack it harder, and attack the writer's own decisions first (the return shape under
  the IDL contradiction, the description fallback, the re-publish semantics, whether `client` is
  connected at return).
- `checker` on Sonnet (native; Read, Grep, Glob): MECHANICAL lane — acceptance criteria,
  conformance, scope honesty, parity, the matrix's rows against their cited sources.

Each lane performs the audit directly and spawns nothing; blind; no hedging. `CONFIRMED` names
the failed attack; undecidable is `UNRESOLVED`; writer's-report-only evidence is `UNRESOLVED`.

## Subject

The `mcp` checkout at checkpoint `b9ff0b9` (`feat: adopt the tool contract in the core client and
server`, clean before the unit) plus the uncommitted working tree written by the chain U4 (Opus 5
`implementer`, brief `U4-mcp-browser-brief.md` with successor `U4b-mcp-browser-brief.md`; stopped
by the Orchestrator on the user's report that it re-declared `waitForCondition` although
`@orkestrel/test` exports it) → U4c (Opus 5 `implementer`, brief `U4c-mcp-browser-fix-brief.md`:
closes the G6 reuse rows for this checkout, then finishes U4), against the tool contract
installed as the accepted tool tarball (`orkestrel-tool-0.0.14.tgz`, U1d) with the agent tarball
beside it. The writer's report is `.orkestrel/campaign/U4c-mcp-browser-report.md`. Assume the
chain has one more defect, and assume the reuse class recurs under a name the sweep did not
read.

**Review evidence:** `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/A4-diff.patch` (also at
`C:/Users/mikes/WebstormProjects/mcp/tmp/codex/A4-diff.patch`): `git diff HEAD`, untracked
files' full text, `git status --porcelain`.

**Brief and report:** `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/U4-mcp-browser-brief.md`,
`U4b-mcp-browser-brief.md`; `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/U4-mcp-browser-report.md`
(writer's report; establishes nothing here).

**Design record and law:** `.orkestrel/campaign/plan.md` (R7, R9, R10, R12, X6, X9, X10, X11,
X13); `D1-design-planner.md` § 3 and § 6; `D1b-design-astra.md` § 3 and § 6 (absence returns
`undefined`; the bridge borrows and never disconnects; refresh and destruction serialize; no
polyfill; feature absence never becomes a passing integration claim; require a usable description
rather than inventing one); the WebMCP IDL verbatim in `G5c-webmcp-idl.md` § 1–2 and the status
in § 7; scaffold `AGENTS.md` and
`.claude/rules/{names,typescript,architecture,patterns,tests,browser,documentation,writing,quality}.md`;
`.agents/skills/orkestrel-falsify/SKILL.md`. Pre-unit code: `src/browser/factories.ts` (`createScopeServer`
at the checkpoint), `src/browser/transports/MessagePortTransport.ts:26-29` (bind synchronously
after construction), `src/core/MCPClient.ts:780-801` (`#tool` and `#execute`, the descriptor-to-`Tool`
conversion the bridge's `adopt` parallels), `src/core/helpers.ts:793-822` (the MCP projections).

## What this round decides

Whether the browser face is accepted as the page's native MCP server and WebMCP bridge, whether
U5 (the distribution receipts in real Chromium) builds on it, and whether `mcp` bumps to 0.0.31
on it.

## Already established — do not re-run

Verified by the Orchestrator: the checkpoint's gates all exit 0 (`U3d-mcp-gates-orchestrator.log.txt`);
the Orchestrator's own gate run after U4c is at `U4c-mcp-gates-orchestrator.log.txt` (read it for
the readings the read-only lane cannot take). The reuse evidence: the export-name probe `P5`
(names of the installed `@orkestrel/test` and `@orkestrel/contract` exports against `export
function|const|class` in `src/**` and `tests/**`; re-run after U4c, reading in
`P5b-collide-after-u4c.log.txt`) and the G6 semantic sweep
(`G6-reuse-sweep-distillate.md`, rows 1–4 and 7–12 for this checkout). A lane that finds a
duplicate the probe and the sweep both missed names it under Findings.

## Numbered falsifiable claims

1. **`createPageServer` is the page's native MCP server, and nothing leaves the page.** The
   factory owns a `MessageChannel`, binds the server transport and the client transport
   synchronously after construction (no `await` between construction and binding), and the
   returned `client` completes `connect`, `tools`, and `call` against the server in the same
   document with zero network requests, proven with a counter that a positive control shows can
   count. Falsify with an interleaving that drops a frame, or a request that leaves the page.
2. **`destroy` tears down completely and idempotently.** Both ports close, both sides unbind, the
   client disconnects (`client.connected` false), a second `destroy` is a no-op, and a call after
   `destroy` fails rather than hanging. Falsify with a leaked listener, a hanging promise, or a
   second-destroy throw.
3. **Cancellation crosses the pair.** Aborting the `ToolContext.signal` handed to the client's
   wrapped tool cancels the in-flight `tools/call` so the server-side handler observes its own
   `context.signal` abort, and the pair stays usable after. Falsify with a path where the
   handler never sees the abort.
4. **Feature detection is honest.** `createModelContext` returns `undefined` when the document
   (default `globalThis.document`) carries no `modelContext`; no polyfill or global is installed;
   the guard in `validators.ts` narrows the member without `as`; the first browser test records
   whether the real Chromium exposes the member and the real-host tests run only when it does.
   Falsify with a path that assumes the member or mutates the document.
5. **`publish` registers what the IDL specifies.** For each tool the manager holds at the call,
   `registerTool` receives `name`, `title`, a `description` per the recorded fallback,
   `inputSchema` from `parameters`, `annotations` projected `pure → readOnlyHint`, `untrusted →
   untrustedContentHint`, `consequential → consequentialHint` with no invented defaults, `exposedTo`
   from `origins`, and a `signal` whose controller the bridge retains; the registered `execute`
   runs `tools.execute({ id, name, arguments }, { signal })`, returns the executed value unchanged
   on success, and rejects with the failure's `error` on failure; the `signal` WebMCP passes into
   `execute` reaches the tool's `context.signal`. Falsify with a field that does not arrive or a
   signal that is dropped.
6. **Re-publish and destroy own only their registrations.** A second `publish` registers names
   not already registered by this handle and aborts registrations whose names are gone (or
   whatever the TSDoc states — check that the code does what the TSDoc says); `destroy` aborts
   every controller this handle made, removes the `toolchange` listener, calls `emitter.destroy()`
   last, and leaves a registration made by another handle on the same document untouched;
   publish and destroy cannot interleave into a late registration after destruction. Falsify with
   an interleaving (an `await` inside `publish` while `destroy` runs) that leaves a registration
   alive.
7. **`adopt` produces executable `Tool` instances.** Each `RegisteredTool` becomes a `Tool` with
   `title`, `description`, `parameters` from `inputSchema`, the inverse annotation projection, and
   an `execute` that calls `executeTool(registered, args, { signal: context.signal })` with the
   agent-side signal forwarded; `origins` maps to `fromOrigins`. Falsify with a field lost or a
   signal not forwarded.
8. **`change` mirrors `toolchange`.** The bridge's emitter emits `change` for every `toolchange`
   the document dispatches and stops after `destroy`. Falsify with a missed or a post-destroy
   emission.
9. **The double is IDL-faithful and nothing more.** `tests/fixtures/modelContext.ts` implements
   `registerTool`, `getTools`, `executeTool`, and `toolchange` member for member against
   `G5c-webmcp-idl.md` § 1 (including `RegisteredTool`'s `window` and `origin`, the `exposedTo`
   and `fromOrigins` options, and the signal-driven unregistration), adds no member the IDL lacks,
   and never stands in for package code. Falsify with a member that diverges from the IDL or a
   package behaviour the double reimplements.
10. **The guide is true.** `### Browser transport` documents `createPageServer` and
    `createModelContext` beside `createScopeServer`; `## WebMCP parity` carries every row of the
    planner's matrix corrected to the landed names (`pure`, no `ToolManagerEventMap`, no
    `createScopeClient`, no `supported`, value returned unchanged), each row ending implement,
    retain, or exclude with its source; `## Declared conformance gaps` carries the
    `document.modelContext` row with the chromestatus reading (`Proposed`, no flag, no origin
    trial, 2026-08-12) and states the double proves the translation and never the native
    integration; server-initiated requests keep the "modern-protocol non-goal" wording; every new
    Surface row and Methods table is in parity. Falsify with a sentence the code contradicts.
11. **Nothing else moved.** Only owned files changed; `src/core/**` untouched (any needed patch is
    in the report); no dependency, version, lockfile, or vendored file changed; `guides/tool.md`
    is byte-identical to the tool checkout's tip. Falsify with `file:line`.
12. **Rules and tests.** No `any`/`as`/`!`, no suppression, no nested functions, no mocks; the
    browser tests run in real Chromium under the `src:browser` project; tests named for what they
    prove; the barrel exports every new type and factory and a browser test pins them. Name the
    three weakest new tests and the mutation that leaves each green.
13. **Nothing re-implements an installed `@orkestrel/test` or `@orkestrel/contract` export.**
    No helper, guard, wait, recorder, or deferred declared in `src/browser/**`, `tests/setupBrowser.ts`,
    `tests/fixtures/**`, or `tests/src/browser/**` does the job of an export of the installed
    `@orkestrel/test` 0.0.14 (core, browser, server entries) or `@orkestrel/contract` 0.0.17;
    `waitForCondition` is imported from `@orkestrel/test` and no local declaration of it remains;
    every call site passes `WaitOptions` (`{ budget }`), not a positional budget. Falsify with a
    declaration whose semantics an export already carries (name the export and its signature from
    the guide § Surface or the `node_modules` declaration), or with a `typeof`/`in` chain where a
    contract guard exists. The Orchestrator's probe (`P5`) and the G6 sweep rows are in the
    Already established section; attack what they missed.
14. **Coherent as the page's MCP server and WebMCP bridge for U5 to compose in an isolated
    consumer.** Would you ship it as mcp 0.0.31?

## Unknowns

- Whether the Chromium the suite launches exposes `document.modelContext` (expected not); the
  writer's report and the first browser test carry the reading.

## Output

The `orkestrel-falsify` verdict shape and nothing else, ending in one terminal line. For the
analyst lane, the report is the final message.
