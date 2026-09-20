# Unit u7d-bounds — the paint readers after Test-paint, and the U7d round's bounds

## Role and engine

`opus` on Opus 5, reached as a native Claude Code subagent (the Agent tool, `subagent_type: opus`,
`model: opus`, high effort). You are a native subagent reading this brief: perform the assignment
directly and spawn nothing. Sole writer in the Veneer checkout at
`C:/Users/mikes/WebstormProjects/veneer`; commit nothing; install nothing; run no `scaffold repair`,
no tree-wide `format`, no lint `--fix`; never run `git checkout`, `git restore`, `git stash`,
`git reset`, `git clean`, or `git add`.

## Objective

Return the Veneer whole chain to green after the Test-paint tarball landed in `node_modules`, by
restating what the paint wrappers in `tests/setupBrowser.ts` add now that the installed reader
parses the modern colour spaces, and close the code bounds the U7d audit carried
(`.orkestrel/veneer/u7d-audit-verdict.md` § Bounds carried, items 15, 16, 17, 19, 20, 24).

## Context

**Evidence.** Taken 2026-09-20 in the Veneer checkout at HEAD `7da6bb1` (the U7d landing).

```text
$ npm test   (verifier lane, step 9)
 FAIL  |setup:browser (chromium)| tests/setupBrowser.test.ts:137:2 > browser setup > matches a mix against the modern color function it paints, where a computed read cannot
AssertionError: expected true to be false
    141|   expect(matchesColor(mix, recorded)).toBe(false)
 FAIL  |setup:browser (chromium)| tests/setupBrowser.test.ts:175:2 > browser setup > reads the channels a modern color function paints, where the installed reader reads none
AssertionError: expected [ 99.08607905681528, …(3) ] to be undefined
    188|   expect(parseCSSColor('oklab(0.5 0 0)')).toBeUndefined()
 Tests  2 failed | 17 passed (19)
$ node -e "console.log(require('./node_modules/@orkestrel/test/package.json').version)"   → 0.0.18 (the packed Test-paint build, digest 9a764548…)
$ grep -c "convertOKLab\|convertLab\|convertXYZD50\|convertRec2020\|convertDisplayP3" node_modules/@orkestrel/test/dist/src/browser/index.d.ts   → 10
$ grep -rn "readPaintedColor\|matchesPaintedColor" tests/ --include=*.ts | grep -v "^tests/setupBrowser" | cut -d: -f1 | sort | uniq -c
   1 tests/setupStyles.ts          (a doc-block mention at :683)
   2 tests/src/styles/elements/body.test.ts
  12 tests/src/styles/integration.test.ts
   5 tests/src/styles/mixins.test.ts
   9 tests/src/styles/theme.test.ts
   9 tests/src/styles/tokens.test.ts
```

The installed reader after Test-paint (read `node_modules/@orkestrel/test/dist/src/browser/index.d.ts`
and `guides/test.md` § Surface in the Test checkout at `C:/Users/mikes/WebstormProjects/test`):
`parseColor` reads computed `oklab()`, `oklch()`, `lab()`, `lch()`, and `color()` values through
the CSS Color 4 matrices and clips each channel to 0–255; it performs no gamut mapping.
`readPaintedColor` in `tests/setupBrowser.ts:216` paints the expression on a one-pixel canvas and
reads the pixel: the engine's own rendering, gamut-mapped by the engine. For an in-gamut colour
the two agree within `matchesColor`'s tolerance; for an out-of-gamut colour they can differ (the
Test-paint report measured `color-mix(in srgb, oklch(0.7 0.4 30) 90%, white)` computing to
`color(srgb 1.28764 -0.304819 -0.179053)`, which the reader clips to `[255, 0, 0, 1]`).

Sites of the carried bounds (line numbers at `7da6bb1`):

- `tests/setupConformance.ts:532-545` `collectShippedComponents` — `['selector', 'variable'].every(category => rows.some(... status === 'shipped'))`.
- `tests/setupConformance.test.ts:588-600` the chdir case expects `readFileSync(resolve(dirname(BOOTSTRAP_MANIFEST_PATH), 'dist/css/bootstrap.css'))`, the implementation's own expression; `BOOTSTRAP_CSS_DIGEST` is pinned at `tests/setupConformance.ts:200`.
- `tests/setupStyles.test.ts:736-747` reads `'node_modules/bootstrap/package.json'` and `BOOTSTRAP_CASCADE_PATH` relative to the working directory.
- `tests/setupConformance.ts:505` `throw new Error(\`Deferral row ${name}: missing required cell\`)` — empty when the name cell is the missing one.
- `tests/setupConformance.ts:170-177` the `Dispatches click` binding; `tests/setupConformance.test.ts:158-166` asserts step patterns only.
- `tests/setupConformance.test.ts:592` `process.chdir` in a case the `setup` project runs under the default `forks` pool (`vite.config.ts` sets no pool there).

**Law.** `AGENTS.md` (§ Design laws: No superfluous wrappers; Export and test reusable logic);
`.claude/rules/tests.md` (§ Shared test infrastructure, § Browser tests), `typescript.md`
(§ TSDoc), `names.md`, `architecture.md`, `writing.md`; skill: none; guide: `guides/veneer.md`
(you edit none of it). The U7d audit verdict `.orkestrel/veneer/u7d-audit-verdict.md` and the
reviewer's findings `units/lane-u7d-reviewer.md` items 15 to 24 are the findings this unit
closes.

**Installed primitives.** `@orkestrel/test` 0.0.18 (Test-paint build; browser entry
`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`: `parseCSSColor`, `parseColor`,
`matchesColor`, the `convert*` helpers, `readStyle`; core entry `dist/src/core/index.d.ts`);
`@orkestrel/contract` (`dist/src/core/index.d.ts`). A helper whose job an installed export does is
a defect; the audit's checker probes every helper name in the diff against those files.

**Host.** Windows 11; the Bash tool runs Git Bash; `npm run <script>` resolves; Playwright's
managed Chromium and the `msedge` channel launch. Instruments under `tmp/u7d-bounds/`; runtime
probes under `tmp/probe/`.

**Measurements.** Take before editing: `npm run test:setup:browser` (expect the two reds above),
`npm run test:setup` (expect 103 passed), `npm run test:src:styles` (expect green; it is the
population that consumes `matchesPaintedColor`).

**Control identifiers.** `PLANT-GAMUT`: make `readPaintedColor` return `parseCSSColor(value)`;
the out-of-gamut case must red (or, where the engine clips too, the case you wrote instead must
red on the reversal it names); restore. `PLANT-EVERY`: revert `collectShippedComponents` to the
`some` form; the split-category case must red; restore. Name every test for what it proves,
never for a control.

**Standing conditions.** `tmp/` is untracked and dirty; leave it. `scaffold audit` reports
`tests/setupListeners.ts` uncovered (accepted by the user) and three dependency majors behind the
registry (not yours). A whole-suite timing failure under your own exec is an observation.

## Unknowns

- Whether Chromium's canvas paints an out-of-gamut `oklch()` differently from the reader's clip.
  Run it first (`readPaintedColor('oklch(0.7 0.4 30)')` beside `parseCSSColor('oklch(0.7 0.4 30)')`)
  and report both readings verbatim. If they differ, the wrapper's added reading is the engine's
  gamut mapping and the case proves that difference. If they agree within tolerance, the wrapper
  adds a reading only for a `var()`-free canvas paint that the reader also gives; then report the
  readings, keep the wrappers (their consumers are the styles proofs and this unit does not own
  them), and write the case as agreement with the installed reader while the doc block states
  that the engine's paint and the reader's clip agreed on the measured colour on the recorded date.

## Scope

**Owned.** `tests/setupBrowser.ts` (the `readPaintedColor` and `matchesPaintedColor` doc blocks
and bodies only), `tests/setupBrowser.test.ts`, `tests/setupStyles.ts` (the `extractShadowLayers`
doc-block sentence at `:683` only), `tests/setupStyles.test.ts` (the manifest and cascade reads
at `:736-747` only), `tests/setupConformance.ts` (`collectShippedComponents`, the deferral-row
refusal label, and the binding table's doc block only), `tests/setupConformance.test.ts` (the
cases the items name), `u7d-bounds-report.md`.

**Shared (report-only).** None; no other unit is live in this checkout.

**Off-limits.** Everything else: `src/**`, `app/**`, `guides/**`, `package.json`,
`package-lock.json`, every `configs/**` file, `vite.config.ts`, `tests/src/**`, `tests/app/**`,
`tests/conformance.test.ts`, `tests/fixtures/**`, `tests/setupListeners.ts`,
`tests/setupPolicy.ts`, `tests/policy.test.ts`, every vendored path.

**What asserts the state this change ends.** `tests/setupBrowser.test.ts` (the two cases and the
export-set case); `tests/setupConformance.test.ts` (the shipped-set, chdir, deferral-refusal, and
binding cases); `tests/setupStyles.test.ts` (the pinned-release case). Bound: a word-boundary
sweep over `readPaintedColor`, `matchesPaintedColor`, `collectShippedComponents`,
`BOOTSTRAP_CASCADE_PATH`, and `BOOTSTRAP_MANIFEST_PATH` across `tests/**`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No installs, no commits, no `git add`,
no tree-wide mutating command. `git diff` and `git status --porcelain` for evidence.

## Execution

**A native subagent, or a bench engine reading this brief inside its own CLI:** perform the
assignment directly and spawn nothing.

Red first for every case: run it red, implement, run it green; record each pair with its command
and counts.

1. **The paint wrappers.** Run the unknown's probe and record both readings. Rewrite the two
   failing cases: the mix case asserts `matchesPaintedColor(mix, recorded)` and the installed
   `matchesColor(mix, recorded)` agree (both `true`), titled for that agreement; the channels
   case keeps its painted-channel assertions and replaces the `toBeUndefined()` with the
   installed reader's channels matching the painted ones through `matchesColor`. Add one case
   on the out-of-gamut colour per the unknown's outcome. Rewrite the `readPaintedColor` and
   `matchesPaintedColor` doc blocks so every sentence is true of the installed reader after
   Test-paint: name what the wrapper adds (the engine's paint, gamut-mapped, against the reader's
   clip; or the agreement, if measured), keep the `var()` caveat and the placement remark, and
   delete the claim that a modern colour function comes back unread. Update the sentence at
   `tests/setupStyles.ts:683` only if it repeats that claim.
2. **`collectShippedComponents`.** For each of `selector` and `variable`, the component has at
   least one row of that category and every such row is `shipped`. Add a case with a split
   category (one `selector` row shipped, another `accepted`) that reports the component not
   shipped, beside the existing cases.
3. **The chdir case.** Assert the digest of `readBootstrapCascade()` against
   `BOOTSTRAP_CSS_DIGEST` instead of re-deriving the path; add one comment naming that the case
   mutates the working directory and depends on the `setup` project's `forks` pool.
4. **The pinned-release case.** Read the manifest through `BOOTSTRAP_MANIFEST_PATH` and the
   cascade through the same manifest-rooted path `readBootstrapCascade` uses (import the
   constant or the reader from `tests/setupConformance.ts`, whichever the module graph admits
   from a Node project without pulling a browser import; report which).
5. **The refusal label.** Label an incomplete deferral row by its one-based position in the
   table and its first non-empty cell (`Deferral row 2 (Passive): missing required cell`, or
   `Deferral row 2: missing required cell` when every cell is empty); add the case for a missing
   name.
6. **The binding reach.** In the binding-table case, assert that every `ORACLE_BINDINGS` entry
   with a defined `obligation` matches a `readCompatibility()` row by component, category, and
   obligation text; where `Dispatches click` matches no row, either the entry is a fallback
   whose `obligation` is `undefined` and whose `events` are `['click']` (if the design needs it)
   or the entry is deleted — decide from the two cases that use it
   (`tests/setupConformance.test.ts:214-256`), record the decision, and keep those cases green.
7. **Controls.** Run `PLANT-GAMUT` and `PLANT-EVERY` red and restore each with a byte comparison.
8. **Gates.** `npm run format:check`, `npm run lint:check`, `npm run check`,
   `npm run test:setup`, `npm run test:setup:browser`, `npm run test:src:styles`,
   `npm run test:conformance`, `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser`; record each
   command's final lines.

## Output

Write `u7d-bounds-report.md` in the Veneer checkout and return its content as your
final message: the probe readings verbatim; the diff per owned file; each red-then-green pair;
each control's red reading and restore proof; each gate's final lines; the item 6 decision;
deviations in the shape § Deviation contract names.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. Stop and report (expected, found, exact
evidence, done or not done, one hypothesis) on: a gate red after your own fix inside owned files;
a need to edit an off-limits file; an import in item 4 that pulls a browser module into the Node
project. Decide, record, and carry on from: case titles, doc-block wording within the truth the
brief fixes, the label form in item 5, the item 6 choice.

## Acceptance criteria

1. `npm run check`, `npm run lint:check`, and `npm run format:check` exit 0.
2. `npm run test:setup:browser` passes on Chromium and Edge with the two rewritten cases and the
   out-of-gamut case green; `npm run test:src:styles` stays green.
3. `npm run test:setup` passes with the split-category, digest, refusal-label, and binding-reach
   cases green.
4. The two controls reddened and are restored byte-for-byte.
5. `git status --porcelain` shows only the owned files and the report.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
