# Unit LEDGER-RETUNE round 3 — the resolver decides within a declared model, and says why it cannot

Successor to `ledger-retune-brief-2.md` and `ledger-retune-brief-3.md`, which stay in place unedited; their Host, Tools,
Off-limits, and Deviation contract still bind except where this brief overrides them. What changed: round 2 (`23b659b` on
`unit/lret`) was audited in `lret-audit-2-verdict.md` (FAIL 1, 2, 6, 8; F1, F2). That was the third round at the
resolver's faithfulness seam, so a design round ruled the boundary: `/home/user/scaffold/.orkestrel/veneer/ledger-boundary-design-verdict.md`,
which binds, over both lanes' proposals beside it (`units/ledger-boundary-design-planner-proposal.md`,
`units/ledger-boundary-design-analyst-proposal.md`). This round implements that ruling and carries every round-2
finding in its shape, and nothing else.

## Role and engine

`opus` on Opus 5.5, the same sole writer in `/home/user/veneer-lret` (branch `unit/lret` at `23b659b`), resumed. The
conformance project launches Chromium from a vitest worker, which a bench sandbox denies, so the unit runs on the native
writing lane. Read, in order: the design verdict; both proposals; `lret-audit-2-verdict.md` and its lane files
(`lret-audit-2-objective-verdict.md`, `lret-audit-2-subjective-verdict.md`); and the Orchestrator's readings in
`lret-instruments/audit-2-probe/` (`reachability.txt`, `referrals.log.txt`, `custom-ident.log.txt`). All record paths
are under `/home/user/scaffold/.orkestrel/veneer/units/` unless absolute. No skill applies.

## Objective

The resolver, the scans, and their proofs obey the design verdict's Invariant, Constraint, and Interface; every real pair
stays decided; every undecided line names its reason; and the guide states the model and its limits in place of the
sentences round 2's verdict found false.

## Context

**Evidence.** Measured at `23b659b`. Re-take each reading before editing, and report any that differs.
- `tests/setupServer.ts` holds `RESOLVER_SETTINGS`, `PARENT_VALUES`, `UNVARIED_FUNCTIONS`, `PROBE_SYNTAXES` (without
  `<custom-ident>`), `ValueResolver` and its `#substitute` and `#compute` members, `collectContextElements`,
  `extractMatchedCompound`, `inferScopeMode`, `scanCanonicalValues`, `scanWitnesses`, `classifyValueGaps`, and
  `LEDGER_TIMEOUT = 24_900`.
- `tests/conformance.test.ts` asserts the measured and repainted `undecided` lists empty and the canonical and witness
  scans empty.
- The guide sentences round 2's verdict lists under claim 8, and the `Resolution` doc block (F1).

**Law.** As `ledger-retune-brief-2.md`: `AGENTS.md`; `.claude/rules/{tests,names,typescript,architecture,documentation,writing,quality}.md`.

**Installed primitives.** As round 2's: `@orkestrel/test`, `@orkestrel/contract`, and the walkers and readers in
`tests/setupStyles.ts` (read-only here); `scanUndecidedTerms` reuses them and adds no tokenizer.

**Host.** As round 2's. Write every log, backup, probe, and script under `tmp/units/r3/`.

**Other units.** J-ORACLE-RECORD's hunks in `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/conformance.test.ts`,
and `tests/fixtures/oracle/` are on Veneer `main`; the landing merges them by hunk (D49). Do not anticipate them.

**Control identifiers.** The design verdict's reading labels (R1 to R9) and rule labels are this brief's. Name each test
for what it proves.

## Unknowns

- The model's tables: R1's census fills `units`, `functions`, and `keywords`; report each entry with the real pair or
  proof that reads it.
- The member drift the dark reading of unscoped pairs brings (R7): take it from the gate, never by hand, and report it.
- The resolver's time after the change, under contention: re-derive `LEDGER_TIMEOUT` by the `ORACLE_TIMEOUT` rule, and
  report every timing line with its load and whether it ran on the final code.

## Scope

**Owned.** As round 2's, unchanged: the named symbols of `tests/setupServer.ts` and every symbol this round adds, renames,
or retires there; `tests/setupServer.test.ts`; `describe('cascade ledger')` and its setup in `tests/conformance.test.ts`;
the `guides/veneer.md` sections round 2 touched and every row whose member changes; `tmp/units/`. **Off-limits.** As
round 2's; `src/**` changes nothing this round.

## Items

1. **Readings first (design verdict § Readings the implementation takes first).** Run R1, R3, R4, R5, R7, R8, and R9
   through the round-2 resolver, each logged to `tmp/units/r3/lret-reading-<label>.log.txt` with its expectation beside
   its result. Stop and report if R3, R4, R5, R8, or R9 contradicts its expectation.
2. **The model and the indecision (Invariant, Constraint, Interface).** Add `ResolverModel`, `RESOLVER_MODEL`,
   `ResolverScenario`, `ResolverMode`, `Indecision`, `scanUndecidedTerms`, `collectSelectorModes`, and `ValuePair.mode`;
   retire `RESOLVER_SETTINGS`, `PARENT_VALUES`, `UNVARIED_FUNCTIONS`, and `inferScopeMode`; change
   `extractMatchedCompound`, `collectContextElements`, the `:root` reading, `PROBE_SYNTAXES`, and the same-text
   shortcut as the verdict states. Each table holds only what R1 or a proof reads, and each `parents` entry decides a pair
   only it decides.
3. **The canonical scan (Q4)** and the **dark reading of unscoped departure pairs** (the T4 ruling).
4. **The proofs (§ Proofs).** One case per listed rule, each with its mutation in a successor driver
   `tmp/units/r3/lret-mutations-3.sh` that logs vitest's full output per mutation and restores each file byte-identically
   with the restoring `git diff --stat` in the log. Re-run every round-2 mutation and plant against the final code, and
   convert each whose target this round renames or retires; a kill counts only where the log shows an `AssertionError`
   for its case.
5. **F1 and F2.** The `Resolution` doc block names the reading order; the probe-syntax case is named for what it proves.
6. **The guide (claim 8).** Replace each false sentence round 2's verdict lists with the model, its readings, the
   homogeneous-branch and product bounds, the full-compound construction, the canonical site and mode rules, the
   `<custom-ident>` rung, the narrower witness rule, and the stated limits. Split the § Departures preamble into three
   paragraphs: the mechanism; the readings and the model with the row rationales; the site and probe rules. Apply every
   row whose member the gate now prints differently.
7. **Timing.** Measure the resolver under the contention round 2 used, re-derive `LEDGER_TIMEOUT`, and state in its doc
   block the run it rests on.
8. **After the change,** run the design analyst's reading table and R6, each logged with its expectation.

## Execution

Perform the assignment directly and spawn nothing. Item 1, then failing proofs for Items 2 and 3 (record each command and
its failing count), then the implementation, then Items 4 to 8, then every Acceptance gate, each logged to
`tmp/units/r3/lret-<gate>.log.txt` with the command echoed first and `echo "exit=$?"` appended.

## Output

Write `tmp/units/r3/lret-report-4.md` and return the same text: the readings with expectations and results; per Item,
what changed by symbol and the failing-first and green readings; the model's tables with the pair or proof behind each
entry; the rows whose member changed, as the gate printed them; the mutation and plant table (case, mutation, log, the
`AssertionError` line); the timing lines with loads and the derived timeout; the guide sentences changed; the gate table;
`tmp/units/r3/lret-3.diff` (`git diff 23b659b`), `tmp/units/r3/lret-3-full.diff` (`git diff 73326c7`), and
`tmp/units/r3/lret-3-status.txt`. State no count in prose.

## Deviation contract

As round 2's. Stop and report when an Item 1 reading contradicts its expectation, when a real pair turns undecided under
the model, when the design verdict leaves a choice this round needs and the proposals disagree on it, or when a change
needs a file outside Owned. Settle yourself the helpers' internal shape, the case titles, and the prose wording.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` leaves the owned files unchanged.
2. `npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts tests/setupStyles.test.ts`
   passes.
3. After `npm run build:src`, `npm run test:conformance` exits 0, with no undecided line.
4. Every mutation and plant fails its case with an `AssertionError`, per its log, and restores byte-identically.
5. `npm run test:guides` and `npm run test:policy` exit 0; after `npm run build:src:styles`,
   `tests/src/styles/tokens.test.ts` passes.

**Observations, not criteria.** The resolver's time inside the conformance project, and `npm run test:src:styles`, each
with its load reading.

## Review evidence

The diffs and status, the readings, the mutation and plant logs, and the gate logs. The audit runs `analyst` on GPT-6
Astra, `reviewer` on Opus 5.5, and `checker` on Sonnet for guide-row parity, on claims written from the design verdict.
