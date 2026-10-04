# Unit flip-sheet (U2) — the tuned Bootstrap-for-Tailwind sheet

## Role and engine

astra on GPT-6 Astra (effort high), reached as `codex exec` at `danger-full-access`. Executor: BENCH_ENGINE. You are the sole writer in `/home/user/veneer`. Paths are absolute or name a file under `/home/user/veneer` in prose.

## Objective

Implement unit U2 of the Tailwind flip in `/home/user/veneer` (branch `ccr-d15a48b1-yyyll6` at `d0603b4`, clean apart from ignored `tmp/`, dependencies installed, `npm run build` done): four Sass switches, the `reboot`, `curate`, `restore`, and `restrict` emitters, the tuned the tailwindcss face sheet built from the same Bootstrap source, the inverted and new Chromium and Node proofs, and the curation table in the guide. Commit nothing.

## Context

- **Evidence.** Read in this order, before editing:
  1. `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md`: § 1 R1 to R6, § 2 Mechanism, § 3 Surface (derivation pins 1 to 3), § 4 Curation, § 6 Records and proofs, § 8 item 2 (this unit), § 12 Corrections (they override the earlier text).
  2. `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design/proposal-consumer-proof.md` § 6 (the case list this unit inverts in the tailwindcss sheet test file).
  3. U1 probe outputs: `/home/user/veneer/tmp/probes/flip2/report.md`, `/home/user/veneer/tmp/probes/flip2/out/p1.json`, `the U1 curation table (do not use it; see the curation note)`. At brief time `report.md` and `curation.json` were not yet on disk. When `curation.json` is absent at start, take the seed from verdict § 4 and say so in your report; when `report.md` is absent, rely on `p1.json` and `p2.json`.
  4. The Sass prototype under the flip2 sass folder (`_mixins.scss`, `_tokens.scss`, `_reset.scss`, `_tokens.scss`, `index.scss`). It is a seed you may port into the tree after the corrections in Implementation; never edit it in place.
  5. Existing veneer conventions: `/home/user/veneer/src/bootstrap/_mixins.scss` (`layer`, `unlayer`), `/home/user/veneer/src/bootstrap/_tokens.scss`, `/home/user/veneer/src/bootstrap/_reset.scss`, `/home/user/veneer/src/bootstrap/_utilities.scss`, `/home/user/veneer/src/bootstrap/index.scss`, the tailwindcss source folder (all files), `/home/user/veneer/tests/src/tailwindcss/index.test.ts`, `/home/user/veneer/tests/src/bootstrap/index.test.ts` (how `readSequences` and `readPlacement` are used), `/home/user/veneer/tests/setupStyles.ts`, `/home/user/veneer/tests/setup.ts` (`readExemptions` is the shape for `readCuration`), `/home/user/veneer/tests/conformance.test.ts` (the `Tailwind compatibility recipe` describe), `/home/user/veneer/guides/veneer.md` § Tailwind compatibility sheet.
- **Law.** `/home/user/scaffold/AGENTS.md` (§ Project model admits the one cross-face Sass `@use` from the tailwindcss source folder to the the bootstrap source folder partials; the non-negotiables bind: no `any`, no `as`, no `!`, no `@ts-*` or lint-disable or formatter-ignore directives, no new npm package, no mocks, scripts as TypeScript run by Node, readonly interface properties, types before implementation in `types.ts`, no nested functions, `{verb}{Noun}` helpers). Rules: `/home/user/scaffold/.claude/rules/styles.md` (one emitter home in `_mixins.scss`; the framework-layer sentence with its derived-build clause; the order statement once per sheet), `typescript.md`, `tests.md`, `names.md`, `writing.md` in the same folder (prose in the guide and any comment: plain, present tense, `must`/`can`, no banned terms).
- **Installed primitives.** `sass`, `vitest`, `playwright`, `tailwindcss` in `/home/user/veneer/node_modules`. Reuse `readSequences`, `readPlacement`, and the sheet readers in `/home/user/veneer/tests/setupStyles.ts` and `/home/user/veneer/tests/setup.ts`; a local twin of an existing reader is a defect.
- **Host.** Linux POSIX. Run from `/home/user/veneer`. Put `/home/user/.wave/npm11/node_modules/.bin` first on `PATH` (npm 11). Chromium for the Vitest browser projects is Playwright's pinned path configured by the repository (the projects already run on this host). Sandbox `danger-full-access`; no network, installs, or commits. A nested `git` may report "not a git repository": do not diagnose that; your own `git status --porcelain` is the authority. Writers under veneer tmp/units are absent: do not look for them.
- **Standing conditions.** Tree clean at start. the ignored tmp folder is ignored and free for you. `npm run test:conformance` as a whole and `npm run test:integration` are expected to show failures this unit does not own (U3 and U4); they are observations.

## Implementation

Each item is acceptance-checkable.

1. **Four switches.** `/home/user/veneer/src/bootstrap/_mixins.scss` declares `$withhold: ()`, `$reset: false`, `$curated: ()`, `$restored: ()` with `!default`. `/home/user/veneer/src/bootstrap/_tokens.scss` configures them exactly as it configures `$layered` (the `@use 'mixins' with (...)` block grows four entries) and raises `@error` when `$reset` is true and `$layered` is false. `/home/user/veneer/src/bootstrap/index.scss` keeps `@forward 'tokens' show $layered` alone. Default emission stays byte-identical: the built bootstrap sheet keeps SHA-256 `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` after `npm run build:src:bootstrap`, and the `$layered: false` compile keeps its digest (U1 P1 read both equal on the prototype; measure the `$layered: false` digest before your first edit and again after).
2. **Emitters in `/home/user/veneer/src/bootstrap/_mixins.scss`** (the one emitter home): mixins `reboot` (wraps `@content` in `@layer reset` when `$reset`, else in `layer`), `curate`, `restore`, and the function `restrict`, following the prototype with these corrections:
   - `curate` emits a copy only when the rule carries at least one normal declaration (a rule whose declarations are all `unlayer` importants, the datalist indicator rule, gets no copy, so the important declaration is never duplicated) and only when `restrict` returns a satisfiable selector.
   - `restrict` returns null for a compound that carries `:not([class])` (the `a:not([href]):not([class])` rules), keeps every class compound, restricts every element compound to `TAG:where(.CLASS, ...)` through `selector.unify`, keeps a pseudo-element after the `:where()` (the prototype's `*:where(...)::before` form), and keeps descendant and child combinators as the prototype does.
   - `/home/user/veneer/src/bootstrap/_reset.scss` swaps `@include layer` for `@include reboot`, wraps each rule's declarations in `@include curate`, guards the `[hidden]` rule with `@if not $reset`, and ends with `@include restore`.
   - `/home/user/veneer/src/bootstrap/_utilities.scss`: the `utility` mixin skips the exact `.NAME` rule of each `$withhold` name and its `local-vars` half; infixed, print, state, and non-shared rules stay.
   - The tuned `reset` block holds exactly the 73 normal reboot rules (U1 P1 measured 73); the datalist important rule stays unlayered; `[hidden]` is absent; no `.mt-3` rule and none of the 199 withheld rules (192 unlayered importants and 7 layered `--bs-*-opacity: 1` halves) remain; every copy sits directly after its original and before every component rule.
3. **the tailwindcss face sources.** `/home/user/veneer/src/tailwindcss/_tokens.scss` declares `$shared` (the 192 shared utility names sorted by code unit, derived once from `/home/user/veneer/tests/fixtures/tailwindcss/comparison.json` `.shared` filed under `CLASS_NAMES.bootstrap.utilities`; write the literal list), `$curation` and `$defaults` (from `curation.json` or the verdict § 4 seed), then `@use '../bootstrap/tokens' with ($withhold: $shared, $reset: true, $curated: $curation, $restored: $defaults)`, then the `@source not inline("...")` statement naming the 1833 names (every `CLASS_NAMES.bootstrap` name except the 192, sorted by code unit). `/home/user/veneer/src/tailwindcss/index.scss` loads `tokens`, then the bootstrap reset partial, the bootstrap elements partial, the bootstrap components partial, the bootstrap utilities partial, then its own `elements`, `components`, `utilities` barrels. Delete `/home/user/veneer/src/tailwindcss/_reset.scss`. Adjust `/home/user/veneer/src/tailwindcss/_mixins.scss` only as the new composition requires. `npm run build:src:tailwindcss` emits `/home/user/veneer/dist/src/tailwindcss/index.css` whose first rule is the order statement.
4. **`/home/user/veneer/tests/src/tailwindcss/index.test.ts`.** Invert the three existing cases per verdict § 6 and the proposal § 6: owned layers `reset` and `bootstrap`, every important declaration unlayered, `--bs-*` declarations present; "declares every lifted class name except the 192 withheld names" with a planted `.mt-3` control; the exclusion equals the 1833 names with dropped and appended controls. Add the derivation sequence case (verdict § 3 pin 3: the tuned sheet's normal and important sequences equal the lifted sheet's transformed by the four steps, with the "nothing else" clause, and the three controls: a planted rule, an unwithheld `.mt-3`, a copy missing one curated class). Add the curation-against-the-sheet case: each table row's witness markup reads under the tuned sheet beside a scratch Tailwind compile what it reads under the lifted sheet, and departs with the row's class removed from every copy selector or its restore rule deleted. Reuse `readSequences` and `readPlacement`.
5. **`/home/user/veneer/tests/setupStyles.ts` and `/home/user/veneer/tests/setupStyles.test.ts`.** Add `restrictSelector` (the TypeScript twin of `restrict`, operating on selector text) and `attributeDeparture` (verdict R5 as corrected in § 12: `utility` only for a `utilities` rule whose selector is exactly `.NAME` with NAME in the shared set or a supplied Tailwind-class list, matching the element and declaring the longhand; `preflight` for a `base` rule; `inherited` for an inherited property with a departing ancestor; else `unattributed`; the exclusion predicates as separate pure functions). Each gets a case. Declare any new public type in the matching `types.ts` before the implementation.
6. **`/home/user/veneer/tests/setup.ts` and `/home/user/veneer/tests/setup.test.ts`.** Add `readCuration` (reads the guide's curation table: form, class or selector, longhands, witness; same shape as `readExemptions`) and `SHEET_LAYERS` naming `reset` and `bootstrap` for the tuned sheet, each with cases (planted and removed controls for the reader).
7. **Guide table.** In `/home/user/veneer/guides/veneer.md` § Tailwind compatibility sheet replace the exemption table with the curation table (one row per class or selector: form, longhands, witness markup in fictional descriptive data, reading), equal to `$curation` and `$defaults`. Touch the table only; the prose around it belongs to U7.

## Unknowns

- Whether Tailwind compiles the tuned sheet as it compiled the lifted one: the build and the scratch compile in the curation case settle it; report any Sass or Tailwind error with its exact message.
- Whether `curation.json` exists at start (see Evidence); say which source you used.
- Whether a pin needs a record that does not exist: stop and report instead of inventing one.

## Scope

- **Owned.** `/home/user/veneer/src/bootstrap/_mixins.scss`, `_tokens.scss`, `_reset.scss`, `_utilities.scss`; `/home/user/veneer/src/tailwindcss/_tokens.scss`, `index.scss`, `_mixins.scss`, and the deletion of `/home/user/veneer/src/tailwindcss/_reset.scss`; `/home/user/veneer/tests/src/tailwindcss/index.test.ts`; `/home/user/veneer/tests/setupStyles.ts` and `/home/user/veneer/tests/setupStyles.test.ts`; `/home/user/veneer/tests/setup.ts` and `/home/user/veneer/tests/setup.test.ts`; the curation table block in `/home/user/veneer/guides/veneer.md` § Tailwind compatibility sheet; a `types.ts` entry only where item 5 or 6 needs a public type. the ignored tmp folder is free.
- **Shared (report-only).** none.
- **Off-limits.** `/home/user/veneer/package.json`, the vendored files, `/home/user/veneer/src/browser/**`, `/home/user/veneer/src/core/**`, `/home/user/veneer/app/**`, `/home/user/veneer/tests/app/**`, and every file not listed as owned. The prototype under `/home/user/veneer/tmp/probes/flip2/sass/` is read, never edited. No install, commit, push, credential, `git stash`, `git add`, `git reset`, or `git checkout`, no destructive command, no tree-wide mutating gate (`npm run lint`, `npm run format`; format only the owned files with `npx oxfmt` or the repository's per-file formatter if `format:check` fails, and say which).
- **Made false by this change.** `/home/user/veneer/tests/conformance.test.ts` recipe cases and `/home/user/veneer/tests/integration.test.ts` Tailwind cases read the old mirror; do not edit them (U3 and U4 own them); list each that now fails.
- **Tools and limits.** `node`, `npm run` scripts named below, `npx vitest run --config vite.config.ts --project <project> <file> -t <title>`, Chromium through Vitest, `sass`.

## Execution

Perform the assignment yourself and spawn nothing. Order: digest baseline, Sass source, builds, `setupStyles`/`setup` instruments with cases, the sheet test file, the guide table, then the gates. Fix every failure in owned files before reporting.

## Output

Final message through the last-message file, no process diary:
1. Per acceptance criterion: expected, measured, and for each failed gate its exact output (bare, no truncation).
2. The table of copies: each reboot rule's original selector and its copy selector, and the rules that got no copy with the reason.
3. The `$layered: false` digest before and after, and the default digest.
4. Which curation source you used (`curation.json` or verdict § 4 seed).
5. Observations: `npm run test:conformance` as a whole and `npm run test:integration` (failures by title, none fixed).
6. `git status --porcelain`.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when: a sandbox write is rejected (never try another write mechanism); the default digest `7932f7a5...` changes and you cannot restore it; a verdict rule contradicts a measurement in `p1.json`; a file outside Owned must change. Settle ancillary choices yourself and record them: the literal list layout in `_tokens.scss`, test titles (in the verdict's wording where it gives one), helper names in the `{verb}{Noun}` form.

## Acceptance criteria

Cheapest first; run each bare.

1. `npm run build:src:bootstrap`; `sha256sum /home/user/veneer/dist/src/bootstrap/index.css` equals `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`.
2. `npm run build:src:tailwindcss`; the first rule of the built tailwindcss sheet is the order statement.
3. `npm run check:src:bootstrap`
4. `npm run check:src:tailwindcss`
5. `npm run lint:check`
6. `npm run format:check`
7. `npm run test:src:bootstrap` unchanged and green.
8. `npm run test:src:tailwindcss`
9. Conformance cases by `-t`, one run each: `proves link 1`, `proves link 2`, `recreates the literal regions`, `recreates the utilities pass`, `configures the drop-in through the published barrel` (`npx vitest run --config vite.config.ts --project conformance tests/conformance.test.ts -t "<title>"`).
10. `npm run test:setup`
11. `npm run test:setup:browser`

**Observations, not criteria.** `npm run test:conformance` as a whole (U3 inverts the recipe cases) and `npm run test:integration` (U4).

## Review evidence

The actual diff, the table of copies, the digests, and `git status --porcelain`.

## Curation note (added by the Orchestrator before launch)

U1's fixed point misattributed every withheld shared-utility declaration to preflight (a `span.border` losing its `--bs-border-color` reads preflight's `border: 0 solid` color), so its `curation.json` and its 194 rows are not the table. Take `$curation` and `$defaults` from the design verdict § 4 seed instead: reboot rows `modal-title`, `offcanvas-title`, `popover-header`, `card-title`, `card-text`, `accordion-header`, `accordion-button`, `pagination`, `placeholder-glow`, `stretched-link`, `visually-hidden-focusable`, `alert-link`, `card-link`, `icon-link`, and the `link-*` family (`link-primary`, `link-secondary`, `link-success`, `link-danger`, `link-warning`, `link-info`, `link-light`, `link-dark`, `link-body-emphasis`); restore rows `svg:where(.bi) { display }`, `img:where(.figure-img) { display }`, `input:where(.form-check-input) { color }`, `input:where(.btn-check) { color }`, `input:where(.form-range) { color }`. A later unit replaces this seed with the table a corrected fixed point derives (unit `flip-probe-2`, writing under `tmp/probes/flip3/`); design the `$curation` and `$defaults` declarations and the guide table so a later change is a list edit and nothing else. `attributeDeparture` in `tests/setupStyles.ts` takes the corrected `utility` rule: a departure is `utility` when the element carries one of the 192 shared names or a supplied Tailwind-class name and either Tailwind's exact `.NAME` rule in `utilities` or Bootstrap's withheld exact `.NAME` rule (its declared longhands, shorthands expanded, read from the lifted sheet) declares the longhand.
