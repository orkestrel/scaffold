# Unit u7-setup-tidy — the paint wrappers removed and the setup modules' pins made one

## Role and engine

`opus` on Opus 5, reached as a native Claude Code subagent (the Agent tool, `subagent_type: opus`,
`model: opus`, high effort). You are a native subagent reading this brief: perform the assignment
directly and spawn nothing. Sole writer in the Veneer checkout at
`C:/Users/mikes/WebstormProjects/veneer`; commit nothing; install nothing; run no `scaffold repair`,
no tree-wide `format`, no lint `--fix`; never run `git checkout`, `git restore`, `git stash`,
`git reset`, `git clean`, or `git add`.

## Objective

Close the bounds `.orkestrel/veneer/u7d-bounds-audit-verdict.md` § Bounds carried assigns to
this unit: remove the two paint wrappers the installed reader made superfluous and compare the
styles proofs through the installed `matchesColor`; pin the `setup` project's pool and point the
working-directory case's comment at the pin; keep one Bootstrap release pin and one CSS digest
across the setup modules and drop the workspace-relative cascade constant if nothing consumes it;
label an incomplete compatibility row by its position; make the binding reach assertion cover
fallback entries and the refusal name the binding; and land the wording bounds the verdict lists.

## Context

**Evidence.** RE-TAKEN AT LAUNCH (the dispatch message states HEAD, the U7a landing commit, and
whether U7a's new proofs added consumers of the wrappers). Readings at `2bc922d`, 2026-09-20:

```text
$ grep -rln "readPaintedColor\|matchesPaintedColor" tests/ --include=*.ts
tests/setupBrowser.test.ts  tests/setupBrowser.ts  tests/setupStyles.ts (a doc-block {@link} at :683)
tests/src/styles/elements/body.test.ts  tests/src/styles/integration.test.ts
tests/src/styles/mixins.test.ts  tests/src/styles/theme.test.ts  tests/src/styles/tokens.test.ts
$ (u7d-bounds probe, Chromium, @orkestrel/test 0.0.18 Test-paint build)
readPaintedColor('oklch(0.7 0.4 30)') → [255,0,0,1]   parseCSSColor(same) → [255,0,0,1]
readPaintedColor('oklab(0.5 0 0)')    → [99,99,99,1]  parseCSSColor(same) → [99.086…,99.086…,99.086…,1]
readPaintedColor('oklch(0.6 0.3 150)')→ [0,170,0,1]   parseCSSColor(same) → [0,169.67…,0,1]
(every pair agrees within matchesColor's half-step tolerance)
$ sed -n '297,308p' vite.config.ts        → the `setup` project: environment node, no `pool` key
$ grep -n "BOOTSTRAP_VERSION\|BOOTSTRAP_DIGEST\|BOOTSTRAP_CSS_DIGEST\|BOOTSTRAP_CASCADE_PATH" tests/setupStyles.ts tests/setupConformance.ts | cut -c1-120
tests/setupStyles.ts:273 (BOOTSTRAP_VERSION)  :276 (BOOTSTRAP_DIGEST)  :287 (BOOTSTRAP_CASCADE_PATH, workspace-relative)
tests/setupConformance.ts:188 (release pin)  :194-200 (BOOTSTRAP_CSS_DIGEST and the RTL and bundle digests)
$ grep -rn "BOOTSTRAP_CASCADE_PATH" tests/ configs/ vite.config.ts --include=*.ts | cut -d: -f1 | sort -u
tests/setupStyles.ts  tests/setupStyles.test.ts   (no browser config reads it: configs/src/vite.styles.config.ts:48 loads Veneer's built cascade)
$ sed -n '450p' tests/setupConformance.ts   → `Compatibility row ${component}: ${obligation}: missing required cell` (empty cells label nothing)
$ sed -n '164,171p;747,753p' tests/setupConformance.ts → the `btn | event` fallback with `events: []`; `scanOracleObligation` refuses through `recording contradicts obligation`
```

**Law.** `AGENTS.md` (§ Design laws: No superfluous wrappers, Minimal public API, Export and
test reusable logic); `.claude/rules/tests.md` (§ Shared test infrastructure, § Browser tests,
§ Runner configuration), `typescript.md` (§ TSDoc), `names.md`, `workspace.md` (the Vitest
project shape), `writing.md`; skill: none; guide: `guides/veneer.md` (you edit none of it; if a
§ Proofs sentence names a removed wrapper, report it as a bound for U7e). The findings this unit
closes are `.orkestrel/veneer/u7d-bounds-audit-verdict.md` § Bounds carried and the lane reports
it cites (`units/lane-u7d-bounds-reviewer.md` 12 to 22, `units/u7d-bounds-audit-analyst-report.md`
12 to 15).

**Installed primitives.** `@orkestrel/test` 0.0.18 (Test-paint build; browser entry
`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`: `matchesColor(first, second)` accepts
strings or channel tuples and resolves each string side through `parseCSSColor`; `readStyle`;
`parseColor`); `@orkestrel/contract` (`dist/src/core/index.d.ts`). A helper whose job an
installed export does is a defect; the audit's checker probes every helper name in the diff.

**Host.** Windows 11; the Bash tool runs Git Bash; `npm run <script>` resolves; Playwright's
managed Chromium and the `msedge` channel launch. Instruments under `tmp/u7-setup-tidy/`;
runtime probes under `tmp/probe/`.

**Measurements.** Take before editing: `npm run test:src:styles`, `npm run test:setup:browser`,
`npm run test:setup`, `npm run test:conformance` (all expected green at launch; record counts).

**Control identifiers.** `PLANT-POOL`: set `pool: 'threads'` on the `setup` project; the
working-directory case must red with the `process.chdir` refusal the comment names; restore.
`PLANT-REACH`: add a fallback binding for a component and category no ledger row carries; the
reach case must red naming it; restore. Name every test for what it proves, never for a control.

**Standing conditions.** `tmp/` is untracked and dirty; leave it. `scaffold audit` reports
`tests/setupListeners.ts` uncovered (accepted by the user) and three dependency majors behind the
registry (not yours). A whole-suite timing failure under your own exec is an observation.

## Unknowns

- Whether U7a's proofs (landed before this unit) consume the wrappers despite its brief; the
  dispatch message states the re-taken grep. Every consumer in `tests/src/styles/**` is owned
  here and moves to `matchesColor`.
- Whether any styles proof depends on the canvas's byte quantization (an assertion that passes
  only because `readPaintedColor` returns integers). Run the styles project after the swap; where
  a case reddens on a fractional channel, widen that assertion to `matchesColor` and report the
  case.

## Scope

**Owned.** `tests/setupBrowser.ts` (delete `readPaintedColor` and `matchesPaintedColor`),
`tests/setupBrowser.test.ts` (their cases and the export-set case), `tests/setupStyles.ts` (the
pins, the cascade constant, the `:683` doc sentence), `tests/setupStyles.test.ts`,
`tests/setupConformance.ts` (the pins, `readCompatibility`'s label, the binding table's refusal
and reach), `tests/setupConformance.test.ts`, `tests/src/styles/**` (the wrapper call sites
only), `vite.config.ts` (the `setup` project's `pool` key only), `u7-setup-tidy-report.md`.

**Shared (report-only).** None; no other unit is live in this checkout.

**Off-limits.** Everything else: `src/**`, `app/**`, `guides/**`, `package.json`,
`package-lock.json`, every `configs/**` file, `tests/app/**`, `tests/src/core/**`,
`tests/src/browser/**`, `tests/conformance.test.ts`, `tests/fixtures/**`,
`tests/setupListeners.ts`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, every vendored path.

**What asserts the state this change ends.** `tests/setupBrowser.test.ts` (the export-set case
lists the wrappers today); every `tests/src/styles/**` file naming a wrapper; `tests/setupStyles.test.ts`
and `tests/setupConformance.test.ts` (the pin and digest cases); `tests/config.test.ts` if it
asserts the `setup` project's shape. Bound: a word-boundary sweep over `readPaintedColor`,
`matchesPaintedColor`, `BOOTSTRAP_DIGEST`, `BOOTSTRAP_CSS_DIGEST`, `BOOTSTRAP_VERSION`, and
`BOOTSTRAP_CASCADE_PATH` across `tests/**`, `configs/**`, and `vite.config.ts`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No installs, no commits, no `git add`,
no tree-wide mutating command. `git diff` and `git status --porcelain` for evidence.

## Execution

**A native subagent, or a bench engine reading this brief inside its own CLI:** perform the
assignment directly and spawn nothing.

Red first where a case pins the change; record each pair with its command and counts.

1. **The wrappers.** Replace every `matchesPaintedColor(a, b)` call in `tests/src/styles/**` with
   the installed `matchesColor(a, b)` (import from `@orkestrel/test/browser`), and every
   `readPaintedColor(x)` with `parseCSSColor(x)`; delete both functions and their doc blocks
   from `tests/setupBrowser.ts`, their cases from `tests/setupBrowser.test.ts`, and the two names
   from the export-set case; rewrite the `:683` sentence in `tests/setupStyles.ts` to name
   `matchesColor`. Run `npm run test:src:styles` and read every case that reddens (see the
   unknown).
2. **The pool.** Set `pool: 'forks'` on the `setup` project in `vite.config.ts`, and rewrite the
   working-directory case's comment to name that pin and the real failure (`process.chdir` is
   unavailable in a worker thread). Run `PLANT-POOL` red first.
3. **One pin, one digest.** Keep the release pin and the CSS digest in one module (the one whose
   consumers are wider; report which) and import them in the other; delete the duplicate names.
   Delete `BOOTSTRAP_CASCADE_PATH` and its assertion if no consumer outside its own case remains;
   otherwise name the consumer in its doc block and keep it.
4. **The row label.** `readCompatibility` labels an incomplete row by its one-based position and
   its first non-empty cell with the column named (`Compatibility row 3 (Component: btn): missing
   required cell`); `readDeferrals` takes the same column-named form. Cases for both.
5. **The fallback reach.** The reach assertion requires every binding, named or fallback, to
   answer at least one ledger row of its component and category; the refusal a binding with an
   empty `events` requirement produces names the binding (`binding btn | event names no events`)
   rather than the recording. Run `PLANT-REACH` red first. Where the surviving `btn | event`
   fallback answers no ledger row, delete it and rewrite its cases over a fixture table, or keep
   it with the ledger row it serves — decide from the ledger, record the decision.
6. **Wording.** The collector's summary reads `Collects component keys carrying only shipped
   selector and variable obligations.`; the deferral label names its column (item 4).
7. **Gates.** `npm run format:check`, `npm run lint:check`, `npm run check`,
   `npm run test:setup`, `npm run test:setup:browser`, `npm run test:src:styles`,
   `npm run test:conformance`, `npm run test:config`, `PLAYWRIGHT_CHANNEL=msedge npm run
   test:src:styles`; record each command's final lines.

## Output

Write `u7-setup-tidy-report.md` in the Veneer checkout and return its content as your
final message: the diff per owned file; every styles case the swap reddened and how it was
widened; the pin module decision; the item 5 decision; each control's red reading and restore
proof; each gate's final lines; deviations in the shape § Deviation contract names.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. Stop and report (expected, found, exact
evidence, done or not done, one hypothesis) on: a gate red after your own fix inside owned files;
a need to edit an off-limits file; a styles case that reddens on the swap for a reason other than
byte quantization. Decide, record, and carry on from: which module keeps the pins, the label's
exact wording, the item 5 choice, case titles, doc-block wording.

## Acceptance criteria

1. `npm run check`, `npm run lint:check`, and `npm run format:check` exit 0.
2. `readPaintedColor` and `matchesPaintedColor` no longer exist anywhere under `tests/**`, and
   `npm run test:src:styles` and `npm run test:setup:browser` pass on Chromium and Edge.
3. `vite.config.ts` pins `pool: 'forks'` on the `setup` project; `npm run test:config` passes.
4. One release pin and one CSS digest exist across the setup modules; `npm run test:setup` and
   `npm run test:conformance` pass with the label and reach cases green.
5. The two controls reddened and are restored byte-for-byte.
6. `git status --porcelain` shows only the owned files and the report.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
