# Audit A1b — falsify the U1c fix round (`@orkestrel/tool`) — successor of A1

## Successor note (what changed from A1)

A1 ran three lanes on U1b (`A1-audit-reviewer.md`, `A1-audit-analyst.md`, `A1-audit-checker.md`).
The Orchestrator reproduced claims 2 and 11 and the coercion facts (`P3-coercion-probe.md`,
`P4-a1-reproduction.md`), ruled R-coercion (forward `parse(args)` under a contract), and carried
every retained finding into U1c (`U1c-tool-fix-brief.md`, report `U1c-tool-fix-report.md`). This
round attacks U1c's own rulings first. Closed findings from A1 are listed under "Already
established"; do not re-report them.

## Role and lane

Two blind lanes; state which you hold in your first line.

- `reviewer` on Opus 5 (native; Read, Grep, Glob): SUBJECTIVE lane and the cross-engine lane (U1c
  was written on GPT-6 Astra) — adjudicate objective defects you can evidence. The analyst lane is
  not run this round: the fix adopted A1's prescriptions, the one departure (R-coercion) is the
  Orchestrator's ruling, and the Orchestrator's own mutation probes stand in for the executed half
  (their readings are supplied under "Already established").
- `checker` on Sonnet (native; Read, Grep, Glob): MECHANICAL lane — acceptance criteria met or not
  met with `file:line`, conformance, scope honesty, parity.

Perform the audit directly; spawn nothing; blind; no hedging. `CONFIRMED` names the failed attack;
undecidable is `UNRESOLVED`; writer's-report-only evidence is `UNRESOLVED`.

## Subject

The `tool` checkout at `main` (`17bba1c`) plus the uncommitted working tree after U1b and U1c
(GPT-6 Astra, threads `01a0a364-…` and `01a0a37f-df3f-…`). Chain: U1 (stopped, no edits) → U1b
(contract landed) → A1 (FAIL 2, 10, 12; F1–F4) → U1c (fix round). This is the second round at
this seam.

**Review evidence:** `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/A1b-diff.patch` (`git
diff` against `main` of the whole chain, the untracked `src/core/errors.ts`, and `git status
--porcelain`). Read the working tree for context.

**Briefs and reports:** `tmp/units/U1b-tool-contract-brief.md`, `tmp/units/U1c-tool-fix-brief.md`,
`.orkestrel/campaign/U1-tool-contract-report.md`, `.orkestrel/campaign/U1c-tool-fix-report.md`
(writer's reports; their readings establish nothing here). The three A1 verdicts and the two
probes are under `.orkestrel/campaign/`.

**Law:** scaffold `AGENTS.md`;
`.claude/rules/{names,typescript,architecture,patterns,tests,documentation,writing,quality}.md`;
`.agents/skills/orkestrel-falsify/SKILL.md` (verdict shape). Installed contract declarations:
`tool/node_modules/@orkestrel/contract/dist/src/core/index.d.ts`.

## What this round decides

Whether tool is accepted as the contract every consumer adopts, re-packed, re-installed into
agent, mcp, and ollama, and bumped to 0.0.15. A finding here costs one fix unit; after publication
it costs a version and every consumer's re-pin.

## Already established — do not re-run

Verified by the Orchestrator directly (2026-09-15):

- A1 claims 1, 3, 4, 5, 7, 8, 9, 11(guide tables) held and their code is unchanged by U1c except
  where a carrier names it.
- The Orchestrator's gate run after U1c (`format:check`, `lint:check`, `check`, `test`) and the
  three mutation probes (remove the `explain` call; remove the parsed forwarding; leave
  `parameters` unassigned) are in flight; their readings arrive with the reconciliation. Treat
  claims that rest on them as `UNRESOLVED` unless you can settle them from source.
- P4: an asynchronous abort by an earlier call lets a later sibling enter; a synchronous one
  refuses it; `parse` returns an owned copy, coerces, and drops undeclared keys.

## Numbered falsifiable claims (the fix round's own rulings first)

1. **R-coercion is implemented as ruled and nowhere else.** With `contract`, `Tool.execute`
   validates with `explain` and forwards `contract.parse(args)`; without `contract`, the raw record
   is forwarded by identity. The `parse`-returns-`undefined` fallback throws `ToolError`
   `ARGUMENTS` with message `: parse` and is reachable only through a changing argument getter (the
   report says so — attack that: is there a stable input where `explain` is clean and `parse` is
   `undefined`?). The guide states the coercion and the dropped-keys consequence in the main flow.
   Falsify with an input that reaches the handler un-normalized or with a stated behaviour the
   code contradicts.
2. **The batch-abort semantics are stated as measured, and the tests are named for what they
   pin.** The guide says the manager checks the signal as it dispatches each call in one pass and
   that an abort raised after dispatch reaches only handlers that observe the signal; the test
   formerly named `checks the signal again before entering each batch handler` is renamed for the
   synchronous case; the asynchronous case is executed and records entry and success; no code
   change serialized the batch or added a post-`await` re-check. Falsify with a sentence or a test
   name that still overstates.
3. **The constraint message carries its bound and only the constraint arm changed.** A
   `numberShape({ min: 1 })` fault reads `amount: constraint; expected number; received 0;
   constraint min; limit 1`; the `type`, `missing`, `variant`, and `oneOf` messages are byte-equal
   to U1b's; `limit` is appended only when defined. Falsify with an arm whose message moved.
4. **The typed error context is exact.** `ToolErrorContext { readonly faults?: readonly Fault[] }`
   is declared in `types.ts` with `Fault` imported as a type and never re-exported; `ToolError.context`
   is typed as it; `name` is a `readonly` literal field with `override`; the guide's Types table
   carries the row and the barrel-parity proof sees it. Falsify with `file:line`.
5. **The migration hazard is named where a consumer reads.** The guide's Execution context
   section states that `caller` moved onto `ToolContext`, that an `unknown`-annotated second
   parameter still compiles and now receives the context, and that such a handler re-points at
   `context.caller`; `ToolOptions.execute` and `ToolInterface.execute` carry the one-sentence
   `@remarks`; the test named for it drives an `unknown`-annotated handler and asserts what it
   receives. Falsify with a missing site.
6. **The three weak tests now bind.** (a) the context test asserts the handler received the exact
   context object at runtime; (b) the derivation test asserts the independent projection is defined
   with `type: 'object'` and that two reads return the same reference; (c) the coercion test asserts
   the contract's `explain(args)` is empty AND the handler received the parsed value (so removing
   either the `explain` call or the parsed forwarding reddens it); (d) the fault-arm test asserts
   `isToolError`, `code === 'ARGUMENTS'`, and handler non-entry per arm. For each, name the
   mutation that would still leave it green, if any.
7. **The registry transcription is complete.** `tests/guides.test.ts` executes `tools.tool('add')`
   (exact instance by reference) and `tools.definitions()` (order and projected fields) as the
   fence claims; every fence is byte-equal to its transcription (the unit says a test named
   `keeps every fence byte-equal to its transcription` proves this — attack that instrument: what
   fence change would it miss?).
8. **The guide's running transcript is coherent.** Either the new fences use identifiers no
   earlier fence bound, or one sentence declares the later sections independent, applied
   consistently; the two long lines are re-wrapped; the Anatomy, registry, and calls fences are
   unchanged; the Tests rows for `validators.test.ts` and `helpers.test.ts` now name their proofs.
   Falsify with a remaining re-declaration or a stale row.
9. **Direct aborted execution is stated.** `ToolInterface.execute`'s TSDoc says `Tool.execute`
   refuses nothing on an aborted signal and that the manager checks before entry; the test named
   for it drives a direct call with an aborted signal and observes handler entry. Falsify with a
   contradiction.
10. **Nothing regressed and nothing else moved.** The A1-confirmed behaviours (claims 1, 3, 4, 5,
    7, 8) still hold on the U1c tree; only the owned files changed; no dependency, version, or
    vendored file changed; no `any`/`as` (other than `as const`)/`!`; no nested function; every
    changed public TSDoc opens with an `-s` verb.
11. **Coherent as tool 0.0.15. Would you ship it?** Name what you would still change and whether
    it blocks the release.

## Unknowns

- The gate and mutation readings (in flight).

## Output

The `orkestrel-falsify` verdict shape and nothing else, ending in one terminal line.
