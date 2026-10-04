# Unit flip-sheet-2 (U2b) — fold the derived curation table with the `scoped` form

## Role and engine

astra on GPT-6 Astra (effort high), reached as `codex exec` at `danger-full-access`, in `/home/user/veneer` on branch `ccr-d15a48b1-yyyll6`. You are the sole writer for tracked files. The `flip-probe-3` lane may still write `/home/user/veneer/tmp/probes/flip4/**`; list its entries as not yours and change none. Paths are absolute or name a file under `/home/user/veneer` in prose.

## Objective

Fold the curation table that `flip-probe-3` derived, as the audit and the Orchestrator's rulings below trim it, into the production Sass, the guide's curation table, and the proofs, adding the third row form `scoped` (`:where(.ROOT) TAG` copies of reboot rules). Prove every folded row on its witness, prove no copy outranks a component rule it could meet, and regenerate the recipe records through U3's writers. Commit nothing.

## State at launch

HEAD at brief time is `54c05ff` ("Regenerate the Tailwind recipe records for the tuned sheet"). U4 `flip-integration-2` was running when this brief was written and edits `/home/user/veneer/tests/integration.test.ts`, `/home/user/veneer/tests/fixtures/tailwindcss/preflight.json`, `/home/user/veneer/tests/fixtures/tailwindcss/incompatible.json`, `/home/user/veneer/tests/setupStyles.ts` and `/home/user/veneer/tests/setupStyles.test.ts`, and the `PreflightRecord` guard in `/home/user/veneer/tests/setup.ts` and `/home/user/veneer/tests/setup.test.ts`. This unit launches after U4 is accepted and committed: read `git log --oneline -3` and `git status --porcelain` first (re-read at launch); the tree must be clean apart from ignored `tmp/`. Every line number below for those files is from `54c05ff` and is re-read at launch. Keep U4's additions intact.

## Context

- **Evidence.** Read in this order, before editing; cite by path and section in your report.
  1. The audit `/home/user/scaffold/tmp/codex/flip-curation-audit-last.md`: the disposition table (keep/fold, trim, drop as redundant, drop as invisible, hold); item 2 (cascade order and specificity: the probe's scoped `.table tr` and `.table tbody` at (0,1,1) outrank `.table-VARIANT` and `.table-group-divider` at (0,1,0); the equal-specificity tie with `.table > :not(caption) > * > *`, where the later component rule wins); item 3 (scoped inventory, `tfoot` structural coverage); item 4 (no stored border widths); item 8 (the `$scoped` mechanism and the `readCuration` contract).
  2. The probe `/home/user/veneer/tmp/probes/flip4/`: `report.md`, `curation.json` (81 rows: 41 reboot, 26 scoped, 14 restore, per audit § Measured counts; each with witness, A and F values), `/home/user/veneer/tmp/probes/flip4/sass/bootstrap/_mixins.scss` (the scoped mode of `curate` near line 56 and the `scope` mixin near line 75), `/home/user/veneer/tmp/probes/flip4/sass/bootstrap/_reset.scss` line 541 (the emission after `restore`), `p3.ts` line 59 (the scoped-copy count). Read only; never edit.
  3. The design `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md`: § 2 Mechanism, § 3 Surface pins, § 4 Curation, § 12 Corrections (they override earlier text; the two newest entries are the `flip-records` and `flip-integration` readings).
  4. The sibling brief `/home/user/scaffold/tmp/codex/flip-sheet-brief.md` (U2: the switches, emitters, digests, and the proofs this unit extends) and its report `/home/user/scaffold/tmp/codex/flip-sheet-last.md` if present.
  5. Current code (re-read at launch): `/home/user/veneer/src/bootstrap/_mixins.scss` (U2's `reboot`, `restrict`, `curate`, `restore`; switches `$withhold`, `$reset`, `$curated`, `$restored`), `/home/user/veneer/src/bootstrap/_tokens.scss` (the `@use 'mixins' with (...)` block and the reset-requires-layered `@error`), `/home/user/veneer/src/bootstrap/_reset.scss` (every reboot rule wrapped in `curate`; where `restore` is included), `/home/user/veneer/src/tailwindcss/_tokens.scss` (`$shared`, `$curation`, `$defaults`, the `@use '../bootstrap/tokens' with (...)`, the `@source not inline`), `/home/user/veneer/src/tailwindcss/index.scss`; `/home/user/veneer/guides/veneer.md` § Tailwind compatibility sheet (the 28-row table near lines 1290 to 1317, columns Form, Class or selector, Longhands, Witness, Reading); `/home/user/veneer/tests/setup.ts` (`CurationRow` and `readCuration`, near lines 2077 and 2124), `/home/user/veneer/tests/setup.test.ts` (the curation reader cases and `pins the curation table and shared literals to their sources with planted and removed controls`), `/home/user/veneer/tests/setupStyles.ts` (`restrictSelector`), `/home/user/veneer/tests/setupStyles.test.ts`, `/home/user/veneer/tests/src/tailwindcss/index.test.ts` (five cases: order, 192 withheld, exclusion, the derivation proof expecting 73 originals and 72 copies, the witness case).
  6. U3's writers under `/home/user/veneer/tmp/units/flip-records/` and their config `vite.writers.config.ts` (re-read at launch).
- **Law.** `/home/user/scaffold/AGENTS.md` non-negotiables: no `any`, no `as`, no `!`, no `@ts-*`, lint-disable, or formatter-ignore directive, no new npm package, no mocks, readonly interface properties, types before implementation in `types.ts`, no nested functions, `{verb}{Noun}` helpers. Rules in `/home/user/scaffold/.claude/rules/`: `styles.md` (one emitter home in `_mixins.scss`; the framework-layer sentence with its derived-build clause), `tests.md`, `typescript.md`, `writing.md` (table cells: plain, present tense, no banned terms).
- **Host.** Linux POSIX. Run from `/home/user/veneer` with `/home/user/.wave/npm11/node_modules/.bin` first on `PATH`. Chromium for the Vitest browser projects is the repository's configured Playwright path. Sandbox `danger-full-access`; no network, installs, or commits. A nested `git` may report "not a git repository": do not diagnose it; your own `git status --porcelain` is the authority.

## The Orchestrator's rulings

1. **Scoped selector form `:where(.ROOT) TAG`**, specificity (0,0,1). It beats Tailwind's `base` by layer order and loses to every classed component rule in `bootstrap` (`.table-VARIANT`, `.table-group-divider`, `.table-active`, `.table > :not(caption) > * > *`) — this replaces the probe's `.ROOT TAG` at (0,1,1), which audit item 2 shows outranking the variant and divider rules. Add `$scoped: () !default` to `/home/user/veneer/src/bootstrap/_mixins.scss` (root class to tag list), configure it in `/home/user/veneer/src/bootstrap/_tokens.scss` as the other four switches, and keep default emission byte-identical. Add a `scope` mixin in `_mixins.scss` that, for each root and tag, copies every reboot rule whose final compound is exactly that tag (the probe's scoped mode of `curate`, audit item 8) under `:where(.ROOT) TAG`, with the reboot rule's whole normal declaration list, never re-emitting an `unlayer` declaration, and no copy for a rule without a normal declaration. Emit inside `@layer bootstrap` at the end of `/home/user/veneer/src/bootstrap/_reset.scss`, after `restore`, before the component partials load. Descending into a nested table without `.table` is accepted (in Bootstrap alone the reboot applies to every cell).
2. **Scoped rows folded:** root `table`, tags `thead`, `tbody`, `tfoot`, `tr`, `th`, `td` (six rows; `tfoot` by structural coverage from the reboot rule, audit item 3). Dropped as redundant: every `.table-VARIANT th|td`, `.table-group-divider th|td`, `.table-active th|td` scoped row, and the `table-group-divider` and `table-active` reboot rows (audit disposition table and item 3: every measured and documented carrier sits under `.table`). Dropped as invisible: `.carousel-indicators button { color }` (audit C[51]); no scoped restore form is therefore needed.
3. **Reboot rows folded** (class joins `$curation`): U2's 23 minus `accordion-button`, plus `lead`, `display-1`, `display-2`, `display-3`, `display-4`, `display-5`, `list-unstyled`, `focus-ring` (`offcanvas-title`, `popover-header` are already in U2) — 30 rows. Dropped as redundant: `focus-ring-primary` to `focus-ring-dark` and `icon-link-hover` (audit C[64] to C[71], C[73]: always paired with `focus-ring` and `icon-link`). Dropped: U2's `accordion-button` reboot row (an `h4.accordion-button` carrier the probe never derives; audit last row). `modal-title` keeps U2's `font-size, font-weight` and plain `<h5 class="modal-title">` witness (the probe's `fs-5` witness hid the size).
4. **Restore rows folded** (`$defaults`, 10 rows): `svg:where(.bi)` trimmed to `display`; `img:where(.figure-img)` `display`; `img:where(.img-fluid)` `display`; `img:where(.card-img)`, `img:where(.card-img-top)`, `img:where(.card-img-bottom)` `max-width`; `input:where(.form-check-input)` `color`; `input:where(.btn-check)` trimmed to `color`; `input:where(.form-range)` trimmed to `color`; `button:where(.accordion-button)` `font-weight` (audit C[80]). Dropped as invisible: the border-only restore rows `a:where(.card-link)`, `a:where(.icon-link)`, `a:where(.icon-link-hover)`, `a:where(.stretched-link)` (an anchor carries no border width in Bootstrap alone; a color on a 0px border paints nothing). Audit item 4 holds these for want of stored widths: measure one such anchor's four border widths under Bootstrap alone and under the recipe in the witness case's harness (a scratch run in the new folder /home/user/veneer/tmp/units/flip-sheet-2 is enough) and report the values as the evidence for the drop.
5. **Guide table** (rows only, no prose; U7 rewrites the prose): add the `scoped` form. The selector cell holds the full selector (for example `:where(.table) td`); the Longhands cell the border-color longhands the probe measured, `border-top-color, border-right-color, border-bottom-color, border-left-color` (logical aliases carry the same values). Witnesses, all in fictional descriptive data, exercise the hazard: `tr`: `<table class="table"><tbody><tr class="table-primary"><td>Archive row</td></tr></tbody></table>`, reading the `td` border color equal to Bootstrap alone (the variant color); `tbody`: a `.table-group-divider` tbody, reading its `border-top-width` and `border-top-color` equal to Bootstrap alone; `td` and `th`: a bare cell in a plain `.table`, reading its border color; `thead` and `tfoot`: plain markup. Each Reading sentence follows U2's style ("Keeps ..."). The table equals `$curation`, `$defaults`, and `$scoped` exactly.
6. **`readCuration`** accepts `scoped` beside `reboot` and `restore`; for `scoped` the selector is the full `:where(.ROOT) TAG` text. The Sass-literal pin case maps scoped rows to `$scoped` (root to tags) in both directions with planted and removed controls. The Node derivation proof's expected sequence gains the scoped copies after the restore rows; compute their count in the test from the lifted sheet (for each tag, the reboot rules whose final compound is that tag — `thead, tbody, tfoot, tr, td, th` is one rule naming six tags; `th` also has its own rule; compute, do not assume), pin it, and report the measured count. The Chromium witness case reads every row's witness, scoped rows included, against the lifted sheet, with the repair removed as the control (for a scoped row the control removes the `:where(.table) TAG` rule).
7. **Copy-induced departures are measured.** Add one Chromium case to `/home/user/veneer/tests/src/tailwindcss/index.test.ts`, titled `keeps every curated and scoped copy below the component rules it could outrank` or a title in that style. For every copy rule in the built tuned sheet (curated `TAG:where(...)` and scoped `:where(.ROOT) TAG`), read from the lifted sheet's CSSOM every `bootstrap`-layer rule whose selector shares a longhand with the copy and could match the same element (a class compound on the tag, or a descendant of the root), and assert the copy's specificity is lower, or equal with the copy earlier in source order. Also assert no copy carries a declaration that a higher-precedence component rule does not override on the measured witness. Planted control from the probe's hazard list: a `.table tr` copy at (0,1,1) must fail the case. Report the measured pairs.
8. **Probe residue (report-only, no edit):** the unattributed grid-track and `position-area` departures are geometry exclusions; the `a.nav-link` color channels are a scrollspy state consequence to snapshot; `-webkit-text-fill-color` is not invisible by definition. Repeat these in your report under Observations.

## Implementation

1. Sass: `$scoped` switch, `scope` mixin, emission (ruling 1); `$curation`, `$defaults`, `$scoped` literals in `/home/user/veneer/src/tailwindcss/_tokens.scss` (rulings 2 to 4), each a list edit beside U2's. Pass `$scoped` through the `@use '../bootstrap/tokens' with (...)` block.
2. Builds and digests: the bootstrap face sheet default digest unchanged; the `$layered: false` compile digest measured before the first edit and after.
3. `/home/user/veneer/tests/setup.ts` and `/home/user/veneer/tests/setup.test.ts`: `CurationRow.form` gains `'scoped'`; reader and pin cases (ruling 6), declaring any new public type in the matching `types.ts` first.
4. `/home/user/veneer/tests/setupStyles.ts` and `/home/user/veneer/tests/setupStyles.test.ts`: only additions the proofs need (for example a scoped-selector twin of `scope` beside `restrictSelector`, or a specificity reader), each with a case. Reuse `readSequences`, `readPlacement`, and existing readers; a local twin is a defect.
5. `/home/user/veneer/tests/src/tailwindcss/index.test.ts`: derivation proof and witness case extended; the new precedence case (ruling 7).
6. Guide table rows (ruling 5).
7. Records: run U3's writers twice through `npx vitest run --config tmp/units/flip-records/vite.writers.config.ts`; both runs give equal digests for `/home/user/veneer/tests/fixtures/tailwindcss/recipe.json` and `/home/user/veneer/app/browser/recipe.json`.

## Unknowns

- The scoped copy count (ruling 6): measure and pin.
- Whether a `:where(.table) TAG` copy still ties or outranks a component rule: the precedence case settles it; a tie or win is a stop.
- Whether the new rows break U4's integration Tailwind describes: observe and report by title.

## Scope

- **Owned.** `/home/user/veneer/src/bootstrap/_mixins.scss`, `/home/user/veneer/src/bootstrap/_tokens.scss`, `/home/user/veneer/src/bootstrap/_reset.scss`; `/home/user/veneer/src/tailwindcss/_tokens.scss`; the curation table rows of `/home/user/veneer/guides/veneer.md` § Tailwind compatibility sheet (no prose); `/home/user/veneer/tests/setup.ts` (`CurationRow`, `readCuration`) and its cases in `/home/user/veneer/tests/setup.test.ts`; additions to `/home/user/veneer/tests/setupStyles.ts` and `/home/user/veneer/tests/setupStyles.test.ts` the proofs need; `/home/user/veneer/tests/src/tailwindcss/index.test.ts`; `/home/user/veneer/tests/fixtures/tailwindcss/recipe.json` and `/home/user/veneer/app/browser/recipe.json` through U3's writers only; a `types.ts` entry only where items 3 or 4 need a public type; the new folder /home/user/veneer/tmp/units/flip-sheet-2 (create it).
- **Off-limits.** Everything else, including `/home/user/veneer/tests/integration.test.ts`, `/home/user/veneer/tests/conformance.test.ts`, `/home/user/veneer/tests/setupServer.ts`, `/home/user/veneer/app/**` other than the record, `/home/user/veneer/src/bootstrap/components/**`, `/home/user/veneer/src/bootstrap/_utilities.scss`, `/home/user/veneer/src/tailwindcss/index.scss`, `package.json`, the lockfile, the guide's prose, U4's `PreflightRecord` guard, and `tmp/probes/**`. No install, commit, push, credential, `git stash`, `git add`, `git reset`, `git checkout`, no destructive command, no tree-wide mutating gate (`npm run lint`, `npm run format`); if `format:check` fails, format only owned files with the repository's per-file formatter and say which.

## Execution

Perform the assignment yourself and spawn nothing. Order: state check, digest baseline, Sass, builds, instruments with cases, sheet tests, guide rows, records, gates. Fix every failure in owned files before reporting.

## Output

Final message through the last-message file, no process diary:
1. Per acceptance criterion: expected, measured, exit, and for each failed gate its exact output (bare, no truncation).
2. The folded table by form with counts (expected 30 reboot, 10 restore, 6 scoped), and each scoped copy: original selector, copy selector.
3. The measured scoped-copy count and the derivation proof's pinned totals.
4. The precedence case's measured pairs (copy, component rule, both specificities, source order), and the planted control's failure.
5. The anchor border widths for the dropped border-only restore rows (ruling 4).
6. Digests: default bootstrap, `$layered: false` before and after, the new tailwindcss sheet, both records over two writer runs.
7. Observations: `npm run test:integration` Tailwind describes by title; the probe residue of ruling 8.
8. Edited files and final `git status --porcelain`, with `flip-probe-3` entries listed as not yours.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when: a sandbox write is rejected (never try another write mechanism); the bootstrap face sheet digest `7932f7a5...` changes and you cannot restore it; a folded row's witness does not read equal to Bootstrap alone under the recipe after the fold (give expected, found, the row); the `:where(.ROOT) TAG` form still outranks or ties-and-follows a component rule in the measured pairs; a file outside Owned must change; U3's conformance describe goes red and the fix lies outside Owned; the tree at launch is not clean or HEAD does not carry U4's commit. Settle ancillary choices yourself and record them: literal layout, test titles, helper names in `{verb}{Noun}` form, witness wording.

## Acceptance criteria

Cheapest first; run each bare, from `/home/user/veneer`.

1. `npm run build:src:bootstrap`; `sha256sum dist/src/bootstrap/index.css` equals `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`.
2. `npm run build:src:tailwindcss`; report the new `sha256sum dist/src/tailwindcss/index.css`. Then the writers twice: `npx vitest run --config tmp/units/flip-records/vite.writers.config.ts`; record digests equal across runs and the record's `sheet` equal to the new digest.
3. `npm run check:src:bootstrap`
4. `npm run check:src:tailwindcss`
5. `npm run check`
6. `npm run lint:check`
7. `npm run format:check`
8. `npm run test:src:bootstrap`
9. `npm run test:src:tailwindcss`
10. `npm run test:setup`
11. `npm run test:setup:browser`
12. `npx vitest run --config vite.config.ts --project conformance tests/conformance.test.ts -t "Tailwind compatibility recipe"`
13. `git diff --check`

**Observation, not a criterion.** `npm run test:integration`, U4's Tailwind describes (re-read at launch): a failure caused by the new rows is reported with its title and not fixed outside Owned, unless the failing case is a witness or derivation proof this unit owns.

## Review evidence

The actual diff, the folded table, the copy list, the precedence pairs, the digests, and `git status --porcelain`.

## Orchestrator rulings appended before launch

- **Longhands cells of reboot rows** take the probe's measured lists, because the Longhands cell names the departures the row repairs and the witness case reads every named longhand: `accordion-header` reads `font-size, font-weight`; `card-link`, `stretched-link`, and `visually-hidden-focusable` read `color, text-decoration-color, text-decoration-line`; `icon-link` reads `color, text-decoration-line`; `modal-title` keeps `font-size, font-weight` with its plain `h5` witness. Every other reboot row keeps U2's cell where the probe agrees and takes the probe's list where it is wider.
- **Border widths** are measured for the trims too: in the witness case's scratch frame, read the four border widths of the `svg.bi` icon, the `btn-check` input, and the `form-range` input under Bootstrap alone and under the recipe, beside the anchor's, and report them; a nonzero width on any trimmed row is a stop (expected 0px on every side; found; the row).
- **Sandbox** stays `danger-full-access`, as every Chromium-reading lane of this flip ran; the transport's `workspace-write` row is for a unit without a browser.
- **Launch order** stands: after `flip-integration-2` is accepted and committed, on a clean tree.
