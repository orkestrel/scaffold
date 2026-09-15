# Audit A2 — falsify unit U2 (`@orkestrel/agent`: the run's abort signal into every tool execution; adoption of the tool contract)

## Role and lane

One brief, three blind lanes; state which you hold in your first line.

- `reviewer` on Opus 5 (native; Read, Grep, Glob): SUBJECTIVE lane and the cross-engine lane (the
  unit was written on GPT-6 Astra) — adjudicate objective defects you can evidence.
- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at
  `C:/Users/mikes/WebstormProjects/agent`): OBJECTIVE lane; **your engine wrote this unit** —
  attack it harder. The read-only sandbox refuses vitest's temp writes, so do not attempt a test
  run; name every vector as `UNRESOLVED` with its exact command and expected reading.
- `checker` on Sonnet (native; Read, Grep, Glob): MECHANICAL lane — acceptance criteria met or not
  met with `file:line`, conformance, scope honesty, parity.

Each lane performs the audit directly and spawns nothing; blind to the others; no hedging toward
consensus. `CONFIRMED` names the failed attack; undecidable is `UNRESOLVED` with what settles it;
writer's-report-only evidence is `UNRESOLVED`.

## Subject

The `agent` checkout at `main` (`8d8043c`, clean before the unit) plus the uncommitted working
tree written by unit U2 (GPT-6 Astra, thread `01a0a37f-ad61-7123-860c-cd389eb570c7`), against the
tool contract installed as the U0 tarball (`node_modules/@orkestrel/tool`, `ToolContext` present).

**Review evidence:** `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/A2-diff.patch` (also at
`C:/Users/mikes/WebstormProjects/agent/tmp/codex/A2-diff.patch`): `git diff`, any untracked file's
full text, and `git status --porcelain`.

**Brief and report:** `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/U2-agent-context-brief.md`;
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/U2-agent-context-report.md` (the
writer's report; its readings establish nothing here).

**Design record and law:** `.orkestrel/campaign/plan.md` (R1, R5, R6, X1, X8);
`D1b-design-astra.md` § Constraints 2 and 4; scaffold `AGENTS.md` and
`.claude/rules/{names,typescript,architecture,patterns,tests,documentation,writing,quality}.md`;
`.agents/skills/orkestrel-falsify/SKILL.md` (verdict shape). The dispatch path before the unit:
`src/core/Agent.ts:542` (`#authorize`), `:669-704` (both branches call `tools.execute` with no
context); `src/core/providers/RelayProvider.ts:84-129` (the `{ id, name, arguments }` projection).

## What this round decides

Whether the agent adoption is accepted, packed, and installed into `ollama` and into the `mcp`
distribution proof, and whether `agent` bumps on it.

## Already established — do not re-run

Verified by the Orchestrator: the pre-unit typecheck against the tool tarball reddened only three
test files (`tests/setup.test.ts`, `tests/src/core/integration.test.ts`,
`tests/src/core/providers/RelayProvider.test.ts`) and no source file (`M1-consumer-typecheck.md`);
the Orchestrator's own gate run after the unit is in flight.

## Numbered falsifiable claims

1. **Both dispatch branches pass the run's bound signal.** With and without an `authority`,
   `tools.execute(calls | allowed, { signal })` receives the signal that `AbortSignal.any` folds
   from the external `signal`, the `timeout`, and the `budget`; a handler that reads
   `context.signal` sees the abort from each of those three sources. Falsify with a branch or a
   source that does not reach the handler.
2. **Denied calls are never entered.** An authority denial synthesizes the result and no handler
   runs; a fail-closed denial (a throwing `evaluate`) likewise. Unchanged from before — falsify by
   a hunk that changes it.
3. **A handler observing its signal changes nothing about the run's settlement.** Abort during a
   tool's execution still commits `partial: true` after the handler settles; a deadline likewise;
   a handler that ignores the signal settles the run exactly as before. Falsify by a changed
   settlement or a new provider turn after the abort.
4. **No `caller` remains.** Nothing in `src/**` builds a `ToolCall` with `caller` or reads one;
   `RelayProvider`'s projection is unchanged and its stale comment is gone; the wire snapshot is
   still validated by `providerRequestContract`. Falsify with `file:line`.
5. **Every second-argument handler use was migrated by reading, not by the compiler.** Every tool
   authored in `src/**` and `tests/**` with a second parameter re-points at `context.caller` or
   drops the parameter; none still treats the second argument as the caller value (audit A1 claim
   12's hazard). Falsify with a handler that still does.
6. **The guide's placement claims are true and bounded.** Node-alone names the `src:core` project
   and a real test title; page-alone and the relay name the `mcp` distribution proof as where the
   receipt will live without asserting it passed; the relay section states which half runs where;
   the cancellation passage sits under an executed fence whose transcription asserts the fence's
   values. Falsify with a sentence the code or the campaign state contradicts.
7. **Nothing else moved.** The diff touches only the owned files; no mirror other than
   `guides/tool.md` changed; `guides/tool.md` is byte-identical to the tool checkout's (the
   Orchestrator will `cmp`); no dependency, version, or vendored file changed. Falsify with
   `file:line`.
8. **Rules and tests.** No `any`/`as`/`!`, no nested functions, no mocks, `waitForDelay` for timing,
   tests named for what they prove, every changed public TSDoc opens with an `-s` verb. Pick the
   three weakest new tests and name the mutation that leaves each green.
9. **Coherent as agent 0.0.23.** Would you ship it to `ollama` and `toolbox` consumers?

## Unknowns

- The Orchestrator's gate run is in flight (`format:check`, `lint:check`, `check`, `test`).

## Output

The `orkestrel-falsify` verdict shape and nothing else, ending in one terminal line. For the
analyst lane, the report is the final message.
