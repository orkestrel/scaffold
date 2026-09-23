# Unit B-FORMS-CLOSE-FORCED (`bff`) — the forms focus indicator under forced colours, the validated colour width, and the guide

## Role and engine

`opus` on Opus 5.5 (native Claude subagent), sole writer in `/home/user/veneer-bff` (a worktree
detached at `BFT_LANDED_SHA`, the session branch tip after B-FORMS-CLOSE-TABLES landed, with
`node_modules` installed by the Orchestrator). Perform the assignment directly and spawn nothing.
Use absolute paths under `/home/user/veneer-bff` for every command and file, and run every npm and
npx command from `/home/user/veneer-bff`. Do not commit, push, install, or run `git checkout`,
`git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`. Routing note for the
record: this unit is objective by work class and runs on the native lane because its proofs stage
forced colours in Chromium, which the Codex sandbox denies.

## Objective

Every forms control that draws a shadow ring draws a system-highlight outline under forced colours
through a `forced-ring` mixin extracted from `focus-ring`'s forced branch, with the button compile
byte-identical; the validated colour control's width reads `--vn-space-24`; the stale
forced-colours sentences in `mixins.test.ts` and the guide's § Compatibility are true; the guide's
ledger cells, Additions rows, and forms prose match the tree; and the gates in § Acceptance criteria
are green.

## Context

**Evidence.** The obligations are the `ROADMAP.md` § Carriers rows whose carrier cell names
`B-FORMS-CLOSE-FORCED` (grep it in `/home/user/veneer-bff/ROADMAP.md`): the forced-colours row
(D37, R3), the validated colour width row (R2), and the plaintext limit row (R3a, dropped on
evidence; the guide states it). The design ruling is
`/home/user/scaffold/.orkestrel/veneer/b-forms-close-design-verdict.md` (R2, R3, R3a, R3b, R8, R9,
R11, R12; read it first). The terrain is
`/home/user/scaffold/.orkestrel/veneer/units/b-forms-close-terrain-report.md` (pointers taken at
`53628aa`; locate each site by symbol). Decisions D37, D39a, D40, D40a are in
`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`.

Sites, from grep at `e0c901a` (locate by symbol; lines are approximate):

```text
src/styles/_mixins.scss:178-182   @mixin forced-colors { @media (forced-colors: active) { @content } }
src/styles/_mixins.scss:184-197   @mixin focus-ring($color, $width, $shadow, $highlight, $reset) { outline: none; box-shadow: $shadow; @include forced-colors { outline: $width solid $highlight; box-shadow: $reset } }
src/styles/components/_form-control.scss:128   .form-control-plaintext:focus { outline: 0 }   (R3a: leave it)
src/styles/components/_form-select.scss:54-58   .form-select:focus { border-color; outline: 0; box-shadow: 0 0 0 var(--vn-focus-width) var(--vn-focus-color) }
src/styles/components/_form-check.scss:75-79    .form-check-input:focus { border-color; outline: 0; box-shadow }
src/styles/components/_form-range.scss:23-25    .form-range:focus { outline: 0 }; :41-45 .form-range:focus#{$thumb} { box-shadow: layered }
src/styles/components/_validation.scss:89-92    .was-validated .form-control-color:#{$state}, .form-control-color.is-#{$state} { width: calc(3rem + calc(1.5em + 0.75rem)) }
tests/src/styles/mixins.test.ts:67-92   the forced-colors case stages the feature through sendProtocol and its comment says MediaOptions "carries a print axis and a motion axis and no forced-colors axis"
node_modules/@orkestrel/test/dist/src/browser/index.d.ts:1693-1700   MediaOptions { print?; motion?; forced? }
tests/src/styles/components/validation.test.ts:88-89,332-333   the 81px width readings; :407-416 the density-factor pattern (setProperty('--vn-factor-density','2') with removal in finally)
guides/veneer.md:803-805   "The color control's width is written as one sum" bullet
guides/veneer.md:1206-1208 "The validated color control's width is the validation partial's own `3rem` literal ... keeps that width while the resting one widens"
guides/veneer.md:2038-2040 the `focus-ring` paragraph ("In forced colors, the mixin replaces the shadow with an outline in the system highlight color")
guides/veneer.md:3140,3147,3156,3160   the four width ledger cells (`declared`; Bootstrap `calc(3rem + calc(1.5em + 0.75rem))`, Veneer `calc(3rem + 1.5em + 0.75rem)`)
guides/veneer.md:3523-3536 the `btn` Additions rows under `@media (forced-colors: active)` (the voice for the forms rows)
guides/veneer.md:3633-3635 § Compatibility: "Button's forced-colors browser reading remains open: the installed Test `MediaOptions` contract stages print and motion only ..."
```

The forms Node cases in `tests/setupStyles.test.ts` compare their rows against the inventory's
keyed rules and look compiled blocks up by row (text control, select, check) or exclude a block
under a condition the inventory records for no rule of the key (range, per R9 as
B-FORMS-CLOSE-TABLES landed it), so a forced-colours block on a forms `:focus` rule needs no table
row; the additions reader reports it as a `declaration` addition under its condition, which the
guide's Additions table must carry. The `stageMedia` and `releaseMedia` exports of
`@orkestrel/test` stage `{ forced: true }`; `form-check.test.ts`, `form-select.test.ts`,
`form-range.test.ts`, and `validation.test.ts` already call `stageMedia({ motion: false })`.
`button.test.ts` reads no forced-colours state; that reading is B-PASSIVE-CLOSE-B's.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{styles,tests,typescript,names,writing,documentation}.md`.
Skill: none. Guide: `guides/veneer.md` (owned).

**Installed primitives.** `@orkestrel/test` (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`:
`stageMedia`, `releaseMedia`, `readStyle`, `readPixels`, `findRule`, `readRules`, `driveTraversal`)
and `@orkestrel/contract`. A helper, guard, wait, recorder, or deferred whose job an installed
export does is a defect; the audit's checker probes the diff for export names.

**Host.** Linux, bash, `/home/user/veneer-bff`. Run
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
as the first command of every shell. Never run `corepack use`. Chromium is installed;
`npm run test:src:styles` drives it (scoped form:
`npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache <files>`).
`npm run build:src` compiles the cascade to `dist/`.

**Measurements.** Take the baseline compile of the button blocks before editing the mixin
(`npm run build:src`, then copy `dist/src/styles/*.css` aside under `tmp/units/`), so criterion 2
compares against bytes rather than a belief. Read the resting and validated colour widths at
density 1 and 2 before writing their assertions. Under forced colours a colour reader cannot answer
(see the `mixins.test.ts` comment), so read `outline-style` and `outline-width`, never colour.

**Control identifiers.** R2, R3, R3a, R3b, R8, R11, R12, D37 are this brief's labels. Name a test
for what it proves, never for the label that specified it.

**Standing conditions.** The tree is clean at `BFT_LANDED_SHA`. `findRule('.form-range:focus')` is
a substring lookup and can return the forced twin; read the resting rule by its exact selector and
condition. `npm run test:guides` and `npm run test:conformance` read the guide's tables, so the
ledger cells and Additions rows must land in the same edit as the cascade change.

## Unknowns

- The compiled Veneer value of the tokenized width cell (Sass flattens the nested `calc`): read it
  from `dist/` after the build and report it; write the ledger cells from that reading.
- Whether the range's `.form-range:focus` forced block reddens any existing range assertion that
  iterates rules by selector; run the range proof and report.

## Scope

**Owned.** `src/styles/_mixins.scss`, `src/styles/components/_form-control.scss`,
`src/styles/components/_form-select.scss`, `src/styles/components/_form-check.scss`,
`src/styles/components/_form-range.scss`, `src/styles/components/_validation.scss`,
`tests/src/styles/components/form-control.test.ts`, `form-select.test.ts`, `form-check.test.ts`,
`form-range.test.ts`, `validation.test.ts`, `tests/src/styles/mixins.test.ts`,
`tests/src/styles/fixtures/mixins.scss` (only if the forced fixture must change), `guides/veneer.md`,
`tmp/units/bff-report.md`, `tmp/units/bff-button-compile.log.txt`.

**Shared (report-only).** `ROADMAP.md`, `tests/setupStyles.ts` and its proof (report a row the
change needs; none is expected), `tests/setupServer.ts` and its proof, `tests/conformance.test.ts`,
`tests/setup.ts`, `app/**`, `src/styles/elements/**`, `src/styles/components/_input-group.scss`,
`_form-floating.scss`, `_close.scss`, `_pagination.scss`, `README.md`.

**Off-limits.** `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`,
`configs/**`, `package*.json`, `vite.config.ts`, `tsconfig.json` (the paths `scaffold repair`
restores); `tests/fixtures/oracle/**`; `tests/fixtures/portfolio/**`; every file not named in Owned.

**What asserts the state this change ends.** `_mixins.scss` (the inline forced branch; Owned);
the forms `:focus` blocks with no forced outline (Owned); `_validation.scss` (the `3rem` literal;
Owned); `validation.test.ts` (comments naming the literal sum; Owned); `mixins.test.ts` (the
"no forced-colors axis" comment and the protocol staging; Owned); `guides/veneer.md` (the four
`declared` width cells, the "written as one sum" bullet, the "keeps that width while the resting
one widens" sentence, the `focus-ring` paragraph, the Additions table lacking the forms rows, the
§ Compatibility sentence; Owned); `tests/conformance.test.ts` (the additions equality reddens until
the guide carries the rows; Shared, closed by the guide edit); `ROADMAP.md` (the carrier rows;
the Orchestrator's fold). Search bounds: `grep -rn "forced" src tests guides`,
`grep -rn "3rem" src/styles/components guides/veneer.md`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or destructive
git. Runtime probes go under `tmp/probe/`.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Write `tmp/units/bff-report.md` in the worktree: the diff summary (`git status --porcelain` and
`git diff --stat`), each acceptance criterion with the exact command and its result line, the
compile comparison's exit code, the width readings, the unknowns' answers, the mutation evidence,
and the claims you flag as weakest. Return the same content as your final message. No process
diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — where the button compile is not byte-identical after the extraction, where a forms
Node case reddens on the forced block, or where a criterion needs a file outside Owned. Decide,
record, and carry on for the mixin's parameter names, the case titles, the Additions rows' Reason
wording in the `btn` rows' voice, and where each guide sentence sits.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files, `npm run format:check`, `npm run lint:check`, and
   `npm run check` exit 0.
2. `_mixins.scss` declares `forced-ring($width: var(--vn-focus-width), $highlight: var(--vn-focus-highlight))`
   emitting `@include forced-colors { outline: $width solid $highlight; @content; }`, and
   `focus-ring` includes it with `box-shadow: $reset` as content. `npm run build:src` exits 0 and
   every `.btn*` block of `dist/src/styles/*.css` is byte-identical to the baseline copy (`cmp` or
   `diff` over the extracted blocks, logged to `tmp/units/bff-button-compile.log.txt`, exit 0).
3. `.form-control:focus`, `.form-select:focus`, `.form-check-input:focus`, and `.form-range:focus`
   keep the release's `outline: 0` and shadow declarations and add `@include forced-ring;`;
   `.form-control-plaintext:focus` is unchanged; no shadow reset is authored on the forms rules.
4. `_validation.scss` writes `width: calc(var(--vn-space-24) + calc(1.5em + 0.75rem))` for the four
   validated colour selectors.
5. `npm run test:setup` exits 0 (no forms Node case reddens on the forced blocks).
6. The scoped styles run over `form-control.test.ts`, `form-select.test.ts`, `form-check.test.ts`,
   `form-range.test.ts`, `validation.test.ts`, and `mixins.test.ts` exits 0. Each control proof
   gains a case named for what it proves (for example
   `outlines the focused control in the system highlight under forced colours`) that drives
   keyboard focus on the existing markup's control, reads `outline-style` `none`, runs
   `await stageMedia({ forced: true })`, reads `outline-style` `solid` and `outline-width` equal to
   the resolved `--vn-focus-width`, runs `releaseMedia()`, and reads `none` again; the range case
   reads the host. `validation.test.ts` gains the same reading on a focused
   `.form-control.is-invalid` (R3b) and a density reading: the validated width minus the resting
   `.form-control-color` width is the same at `--vn-factor-density: 2` as at 1, with a direct
   `--vn-space-24` override read once; the existing `81` expectations stay and their comments name
   the token. `mixins.test.ts`'s forced case stages through `stageMedia({ forced: true })` and
   `releaseMedia()` with the "no forced-colors axis" explanation gone.
7. `guides/veneer.md`: the four width cells read the compiled Veneer value with departure
   `tokenized`; the "written as one sum" bullet and the `3rem` sentence in § Form control classes
   state that the resting and validated widths retune together; the `focus-ring` paragraph names
   `forced-ring` and its forms callers; each forms key's section carries a forced-colours
   sentence; the Additions table carries one `declaration` row per forms `:focus` rule under
   `@media (forced-colors: active)` (`form-control`, `form-select`, `form-check`, `form-range`,
   with `outline`) in the `btn` rows' voice, and a sentence states the plaintext limit (R3a);
   § Compatibility's forced-colours sentence states that the installed `MediaOptions` contract
   stages forced colours and that the forms proofs read the outline under it, and names the
   button's own reading as B-PASSIVE-CLOSE-B's.
8. `npm run test:conformance` exits 0 (no unrecorded addition, no stale departure) and
   `npm run test:guides` exits 0.
9. `npm run test:policy` exits 0.

**Observations, not criteria.** The whole `npm run test:src:styles`; `npm test`; the mutations
(remove one `@include forced-ring`: its forced reading is `none`; hoist the outline out of the
media block: the resting reading is `solid`; add `outline: 0` to a validated `:focus` rule: the
validated reading fails; revert to the `3rem` literal: the density-2 difference changes; emit the
button's reset in a second media block: the compile diff fails) — run each you can and report.

## Review evidence

The actual diff (`git diff`) and `git status --porcelain` from the worktree, the report, and the
button compile log.
