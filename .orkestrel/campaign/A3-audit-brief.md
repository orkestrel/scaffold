# Audit A3 — falsify unit U3 (`@orkestrel/mcp` core: cancellation through the server's default execution and the client's wrapped tool; `title` and `annotations` on the wire; explicit refresh)

## Role and lane

One brief, three blind lanes; state which you hold in your first line.

- `reviewer` on Opus 5 (native; Read, Grep, Glob): SUBJECTIVE lane and the cross-engine lane (the
  unit was written on GPT-6 Astra) — adjudicate objective defects you can evidence.
- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at `C:/Users/mikes/WebstormProjects/mcp`):
  OBJECTIVE lane; **your engine wrote this unit** — attack it harder. Do not attempt a test run
  (the read-only sandbox refuses vitest's temp writes); name each vector as `UNRESOLVED` with its
  exact command and expected reading.
- `checker` on Sonnet (native; Read, Grep, Glob): MECHANICAL lane — acceptance criteria, conformance,
  scope honesty, parity.

Each lane performs the audit directly and spawns nothing; blind; no hedging. `CONFIRMED` names the
failed attack; undecidable is `UNRESOLVED`; writer's-report-only evidence is `UNRESOLVED`.

## Subject

The `mcp` checkout at `main` (`b6befbd`, clean before the unit) plus the uncommitted working tree
written by the chain U3 (GPT-6 Astra, thread `01a0a37f-b497-72b1-9263-43e13e1cc886`; landed the
substance, stopped on a prescribed form the lint rule refuses) → U3b (stopped on a clobbered
install, no edits) → U3c (thread `01a0a398-9acb-71a1-b984-4cc8c8eb6eb5`; bound-method form,
lint, guide parity, LF endings, all gates), against the tool contract installed as the U1c tarball
(`ToolContext` count 8) with the campaign agent installed beside it. The writer's report is the U3c
one at `.orkestrel/campaign/U3-mcp-core-report.md`; U3's deviation report is
`U3-mcp-core-astra-deviation.md`. Assume the chain has one more defect.

**Review evidence:** `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/A3-diff.patch` (also at
`C:/Users/mikes/WebstormProjects/mcp/tmp/codex/A3-diff.patch`): `git diff`, untracked files' full
text, `git status --porcelain`.

**Brief and report:** `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/U3-mcp-core-brief.md`;
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/U3-mcp-core-report.md` (writer's
report; establishes nothing here).

**Design record and law:** `.orkestrel/campaign/plan.md` (R1, R3, R4, R10, R11, X1, X3, X7, X11);
`D1b-design-astra.md` § Constraints 4; scaffold `AGENTS.md` and
`.claude/rules/{names,typescript,architecture,patterns,tests,documentation,writing,quality}.md`;
`.agents/skills/orkestrel-falsify/SKILL.md`. Pre-unit code: `src/core/MCPServer.ts:794`
(`buildToolCall(request, options.caller, args)`), `:940-956` (`#execute` default path
`tools.execute(call)`), `src/core/helpers.ts:651-665` (`buildToolCall`), `src/core/MCPClient.ts:774-802`
(`#tool`, `#execute` calling `call(name, args)` with no options), `src/core/types.ts:1217`
(`MCPToolDescriptor`), `:2142-2148` (the `execution` TSDoc claiming no cancellation seam).

## What this round decides

Whether the mcp core adoption is accepted and unit U4 (the browser face and WebMCP bridge) builds
on it, and whether `mcp` bumps on it.

## Already established — do not re-run

Verified by the Orchestrator: the pre-unit typecheck against the tool tarball reddened only
`tests/src/core/MCPClient.test.ts(1204,29)` and no source file (`M1-consumer-typecheck.md`); the
Orchestrator's own gate run after the unit is in flight.

## Numbered falsifiable claims

1. **The server's default execution path forwards the request signal.** `#execute` calls
   `tools.execute(call, { signal, caller? })` with the request's signal; a `notifications/cancelled`
   over a duplex transport aborts that signal so a parked handler observes it; the connection stays
   usable after; the JSON-RPC response for the cancelled request is what the protocol requires
   (state which). Falsify with an interleaving where the handler never sees the abort or the
   connection is left unusable.
2. **`caller` travels only in the context.** `buildToolCall` builds `{ id, name, arguments }`;
   `options.caller` reaches the handler as `context.caller`; a custom `execution` handler receives
   `caller` in its input; no code path still spreads `caller` onto a `ToolCall`. Falsify with
   `file:line`.
3. **The client's wrapped tool forwards the agent-side signal.** `#tool`'s `execute(args,
   context)` passes `{ signal: context.signal }` into `call`; aborting that signal cancels the
   in-flight `tools/call` (observed at the server as the handler's abort) and the wrapped promise
   rejects; the non-`complete` outcome still throws. Falsify with a path where the signal is
   dropped.
4. **`title` and `annotations` cross the wire both ways with the stated projection.** Server
   `tools/list` carries `title` and `annotations { readOnlyHint ← pure, destructiveHint ←
   consequential }` from each definition and never `untrusted`; the client's wrapped tool carries
   `title` and the inverse projection; `summary` is never advertised and the guide states the
   loss; the wire annotation shape is declared as this package's own wire type with the external
   field names and its TSDoc names the specification revision. Falsify with a field that does not
   round-trip or a projection that inverts wrongly.
5. **The refresh example is executed and does what it says.** The guide's refresh pattern is
   transcribed in `tests/guides.test.ts` against a real in-process pair and proves: add, replace,
   collision refused with the local tool kept, and failure keeping the last snapshot; nothing polls;
   no synchronization manager was added to the package. Falsify with an outcome the transcription
   does not drive.
6. **The guide is true and the non-goal wording is intact.** The `execution` TSDoc no longer claims
   the default path has no cancellation seam; server-initiated requests keep the guide's
   "modern-protocol non-goal" wording; nothing calls it a conformance gap; every changed public
   TSDoc and guide table is in parity. Falsify with a sentence the code contradicts.
7. **Nothing else moved.** Only owned files changed; `src/browser/**`, `tests/src/browser/**`, and
   `tests/fixtures/**` are untouched (any needed patch is in the report); `guides/tool.md` is
   byte-identical to the tool checkout's; no dependency, version, or vendored file changed.
8. **Rules and tests.** No `any`/`as`/`!`, no nested functions, no mocks, real transports, tests
   named for what they prove; every projection helper is exported from `helpers.ts` and tested.
   Name the three weakest new tests and the mutation that leaves each green.
9. **Coherent as mcp 0.0.31 for unit U4 to build on.** Would you ship it?

## Unknowns

- The Orchestrator's gate run is in flight, including `npm run test:src:browser`.

## Output

The `orkestrel-falsify` verdict shape and nothing else, ending in one terminal line. For the
analyst lane, the report is the final message.
