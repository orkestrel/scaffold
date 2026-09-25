# LEDGER-BOUNDARY design round — brief

One brief for both lanes of the design round, run blind to each other: the subjective lane on `planner` (Opus 5.5) and
the objective lane on `analyst` (GPT-6 Astra). Each lane performs the assignment directly, spawns nothing, edits nothing,
and returns a proposal. The Orchestrator reconciles.

## Role and engine

`planner` on Opus 5.5, a native Claude subagent reached through the harness's Agent tool, holds the subjective lane:
the shape and names of the boundary, where a consumer meets it, and the guide's statement of it. `analyst` on GPT-6
Astra, reached through `codex exec --sandbox read-only` rooted at `/home/user/veneer-lret`, holds the objective lane:
what the boundary must include for the gate's claims to be true, and what it may exclude. Each lane is the executor that
opens this brief, and each does the work itself.

## Objective

Rule the boundary of the ledger resolver's claim and the canonical scan's coverage: the invariant the code obeys, the
constraint that bounds it against over-correction, and the interface where the conformance gate and the guide's reader
meet the obligation, so that LEDGER-RETUNE's third round implements a ruling rather than a fourth repair.

## Context

**Evidence.** Every path is under `/home/user/scaffold/.orkestrel/veneer/units/` unless it is absolute.
- The subject: `/home/user/veneer-lret` (branch `unit/lret`) at `23b659b`, round 2 of LEDGER-RETUNE over Veneer
  `73326c7`. The resolver, the scans, and their helpers are in `tests/setupServer.ts` (`ValueResolver`, its `#substitute`
  and `#compute` members, `createValueResolver`, `collectContextElements`, `extractMatchedCompound`, `inferScopeMode`,
  `normalizeResolvedColors`, `RESOLVER_SETTINGS`, `PARENT_VALUES`, `UNVARIED_FUNCTIONS`, `PROBE_SYNTAXES`,
  `PROBE_PROPERTIES`, `scanCanonicalValues`, `scanWitnesses`, `classifyValueGaps`, `classifyDeparture`); the cases are in
  `tests/setupServer.test.ts` (`describe('ValueResolver')`) and `tests/conformance.test.ts` (`describe('cascade
  ledger')`); the guide's statements are `guides/veneer.md` § Tokens › § Departures (preamble and legend), § Reference
  map (preamble and comparison paragraph), and § Outside the ledger.
- The audit record: `lret-audit-verdict.md` (round 1), `lret-audit-2-verdict.md` (round 2, the reconciliation; it wins
  over the lane files), `lret-audit-2-objective-verdict.md`, and `lret-audit-2-subjective-verdict.md`.
- The Orchestrator's executed readings, in `lret-instruments/audit-2-probe/`:
  - `referrals.log.txt`: through the unit's resolver, `1cqw` against `1vw` on `width` reads alike (`12.7969px` both);
    `1ex` against `0.5em` reads apart; `SERIF` against `serif` and `Monospace` against `monospace` as custom properties
    read alike; the controls `1em` against `16px` (apart) and `16px` against `1pc` (alike) hold.
  - `custom-ident.log.txt`: in Chromium 141.0.7390.37, `<custom-ident>` computes `SERIF` and `serif` apart, and
    `font-family` computes both as `serif`.
  - `reachability.txt`: every real ledger pair (`gaps.txt`, the gaps the conformance hook collects) and every selector
    it reads (`selectors.txt`), grepped for each attack class the round-2 lanes named. No real pair reads a container
    unit, `vmin`, `vmax`, a small, large, or dynamic viewport unit, `ex`, `ch`, `cap`, `ic`, `attr()`, `env()`, a
    counter, `min()`, `clamp()`, `:has()`, `:is()`, or `:where()`. Real pairs reach `:not()`, `lh`, `currentColor`, and
    `max()`, and the file lists each such pair.
- The design that governs the ledger: `/home/user/scaffold/.orkestrel/veneer/ledger-values-design-verdict.md` (Rulings 1,
  2, 3, and 7), and the round-2 briefs `ledger-retune-brief-2.md` and `ledger-retune-brief-3.md`.

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,names,typescript,architecture,documentation,writing,quality}.md`,
and in `quality.md` § Rounds and verdicts above all (the seam budget, reachability, and a ruling that states the
invariant, the constraint, and the interface); Veneer's `ROADMAP.md` § Tenets at `/home/user/veneer-lret/ROADMAP.md`.
No skill applies.

**Installed primitives.** `@orkestrel/test` and `@orkestrel/contract` (declarations under
`/home/user/veneer-lret/node_modules/@orkestrel/`). A helper whose job an installed export or an existing setup export
does is a defect.

**Host.** Linux. The `planner` lane reads only. The `analyst` lane runs in a read-only sandbox with no browser and no
network, and may run a read-only script that prints to standard output.

**Measurements.** The Orchestrator's, listed under Evidence, taken at `23b659b` on Chromium 141.

**Control identifiers.** None.

**Standing conditions.** The subject is a unit branch under audit; LEDGER-RETUNE lands only after its third round.

## Unknowns

- Whether a bounded context model can decide every real pair, and which real pairs it would leave undecided. Answer from
  `reachability.txt` and the code; where the answer needs a browser reading, name the exact pair and the reading that
  settles it, and the Orchestrator runs it.

## Scope

Read-only. Each lane writes nothing and returns its proposal as its final message.

## Questions to rule

1. **The claim.** What does the resolver claim a pair alike means, stated as an invariant a test can break? Choose
   between widening the settings until every context a consumer can set is varied, and bounding the claim to a declared
   model whose unsupported terms (units, functions, selector parts, keyword and identifier kinds, and combinations of
   settings) make a pair undecided. Rule on the round-2 inputs one by one: container units, `lh` and `rlh`, `vmin` and
   `vmax`, `ex` and `ch`, `min()` and `max()` over terms that read different settings, `:not()` and `:has()`, a
   custom-property identifier that differs only in case, and a custom-property `currentColor`.
2. **The constraint.** What keeps the ruling from over-correcting: the gate already fails when a real pair is undecided
   (`decides every measured value difference …`, `decides every repainted value difference …`). State which real pairs
   the ruled model decides, and what a future row outside the model does: fail the gate as undecided, with the model
   widened by the unit that brings the row.
3. **Selector construction.** Whether each built element must match the row's full selector, `:not()` included, and
   what happens to the real `:not()` rows (`reachability.txt`), `.list-inline-item:not(:last-child)` among them.
4. **The canonical scan.** Which sites and modes it compares: a `:root` declaration redeclared by a
   `[data-bs-theme=light]` scope, a selector naming both modes in one `:is()`, and any other shape the real cascade
   holds. Say whether each shape occurs in the shipped cascade (`/home/user/veneer-lret/dist/src/styles/index.css`).
5. **The probe syntaxes.** Whether `<custom-ident>` returns to `PROBE_SYNTAXES`, or an identifier pair that differs only
   in case is undecided, given `custom-ident.log.txt`.
6. **The interface.** The exported names and types the ruling adds or changes in `tests/setupServer.ts`, each named by
   `.claude/rules/names.md`, and the guide sentences that state the boundary in place of the false ones round 2's
   verdict lists under claim 8. Include the subjective lane's design notes: `base` found by position in
   `RESOLVER_SETTINGS`, and `inferScopeMode` returning a mode.
7. **The proofs.** For each rule the ruling adds, the case that proves it and the mutation that must fail that case with
   an `AssertionError`.

## Output

A proposal, and nothing else, under these headings: **Invariant**, **Constraint**, **Interface**, **Rulings** (one per
question, each with its evidence as `file:line` or a named log), **Proofs** (case, mutation), **Readings the
Orchestrator must run** (exact pairs and expected outcomes), and **Risks**. State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report if a question cannot be
ruled without a change to a file outside `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/conformance.test.ts`,
and `guides/veneer.md`. Settle the wording yourself.

## Acceptance criteria

1. Every question has a ruling with its evidence.
2. The invariant is stated so a named mutation breaks it.
3. Every real pair `reachability.txt` lists under `:not(`, `lh`, `currentColor`, and `max(` is named decided or
   undecided under the ruling, with the reason.

## Review evidence

The Orchestrator reconciles both proposals, runs the readings they name, and records the ruling in
`ledger-boundary-design-verdict.md` beside `/home/user/scaffold/.orkestrel/veneer/ledger-values-design-verdict.md`.
