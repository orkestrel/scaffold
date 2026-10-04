# Unit flip-fold-2 (F1c) — fold the probe-4 table from the documented specimens

## Role and engine

astra on GPT-6 Astra (effort high), reached as `codex exec` at `danger-full-access`, in `/home/user/veneer` on branch `ccr-d15a48b1-yyyll6`. You are the sole writer for tracked files; no other unit writes while you run. Paths are absolute or name a file under `/home/user/veneer` in prose.

This brief reuses the name of an earlier, finished run of the first fold. That run's brief and report are archived as `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/units/flip-sheet-2/brief-2.md` and `last-2.md`; cite them from the archive, never from `tmp/codex/`.

## Objective

Fold the rows that `flip-probe-4` derived from Bootstrap's documented markup, as the corpus rulings and the Orchestrator's rulings below trim them, into the production Sass, the guide's curation table, and the proofs, with the same mechanism, witness rules, and precedence invariant the first fold (`flip-sheet-2`, its two continuations) established. Re-pin the derivation counts and the conformance statement pins, and regenerate the recipe records through U3's writers. Commit nothing.

## State at launch

This unit launches after `flip-header`, `flip-fix-a`, `flip-specimens`, and `flip-probe-4` are accepted, the first three committed. Read `git log --oneline -3` and `git status --porcelain` first (re-read at launch); the tree must be clean apart from ignored `tmp/`. `flip-fix-a` renamed the Tailwind tokens to the switch names (`$withhold`, `$curated`, `$restored`, `$scoped`) and moved the Sass-literal pin and the barrel round trip from `tests/setup.test.ts` into `/home/user/veneer/tests/conformance.test.ts` § `Tailwind compatibility recipe`; locate both by their text. Every line number below was read at `473edd6` and is "(re-read at launch)".

## Context

- **Evidence.** Read in this order, before editing; cite by path and section in your report.
  1. The probe folder tmp/probes/flip5 under `/home/user/veneer` (written by `flip-probe-4`): `report.md` (the derived table beside the current 46 rows and the corpus's 13 expected rows; the residuals; the `resolved` tuples; the copy-induced hits), `curation.json`, out/p4.json. Read only; never edit.
  2. The corpus `/home/user/scaffold/tmp/codex/documented-markup.md`: § 1 The 12 breaking classes, § 2 (S1 to S11, the 13 expected rows and the longhand note: margin rows list `margin-block-end` beside `margin-bottom`; the `scoped` row copies the reboot's `a` color, which `.navbar-text a` at (0,1,1) beats), § 3, and § Orchestrator rulings on the corpus.
  3. The design verdict `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md`: § 2 Mechanism, § 3 Surface pins, § 4 Curation, § 12 Corrections (the fold rulings, the witness rulings, the precedence invariant, the five switches).
  4. The fold archive `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/units/flip-sheet-2/`: `brief.md` (the first fold: the mechanism, the guide table's forms and columns, `readCuration`, the derivation and precedence proofs, the writers run after the sheet changes, its appended rulings on Longhands cells and border widths), `brief-2.md` (the scoped-witness ruling: every matched element read; plain and hazard elements for scoped rows), `brief-3.md` (the precedence ruling: no copy introduces a precedence its original lacks), and their reports `last.md`, `last-2.md`, `last-3.md`, `measurements.json`.
  5. The sibling U2 brief `/home/user/scaffold/tmp/codex/flip-sheet-brief.md` (the switches, emitters, digests, and the proofs this unit extends).
  6. The showcase mapping `/home/user/veneer/tmp/units/flip-showcase/curation.md` (report-only) and `flip-specimens`'s report flip-specimens-last.md in `/home/user/scaffold/tmp/codex/` (the specimen-to-row map).
  7. Current code (re-read at launch): `/home/user/veneer/src/bootstrap/_mixins.scss` (`reboot`, `restrict`, `curate`, `restore`, `scope`; the switches), `/home/user/veneer/src/bootstrap/_tokens.scss`, `/home/user/veneer/src/bootstrap/_reset.scss`, `/home/user/veneer/src/tailwindcss/_tokens.scss` (`$withhold`, `$curated`, `$restored`, `$scoped`, the `@use '../bootstrap/tokens' with (...)`, the `@source not inline`); `/home/user/veneer/guides/veneer.md` § Tailwind compatibility sheet (the curation table, 46 rows, columns Form, Class or selector, Longhands, Witness, Reading); `/home/user/veneer/tests/setup.ts` (`CurationRow`, `readCuration`); `/home/user/veneer/tests/setupStyles.ts` (`restrictSelector`); `/home/user/veneer/tests/src/tailwindcss/index.test.ts` (the derivation proof pinning 73 originals, 72 curated copies, 7 scoped copies; the witness case `pins every curation witness against the lifted sheet and rejects each removed repair`; the precedence case `keeps every curated and scoped copy at its original's specificity before the component rules` or its title as `flip-fix-a` left it); `/home/user/veneer/tests/conformance.test.ts` § `Tailwind compatibility recipe` (`pins the tuned-sheet statement sequence to the measured syntactic rewrites` with the rewrite counts `empty bootstrap` 215, `@layer bootstrap {` 46, `:where(.table) th {` 1, the media-block joins; the Sass-literal pin and the barrel round trip `flip-fix-a` moved there).
  8. U3's writers under `/home/user/veneer/tmp/units/flip-records/` and their config `/home/user/veneer/tmp/units/flip-records/vite.writers.config.ts` (re-read at launch).
- **Law.** `/home/user/scaffold/AGENTS.md` non-negotiables: no `any`, no `as`, no `!`, no `@ts-*`, lint-disable, or formatter-ignore directive, no new npm package, no mocks, readonly interface properties, types before implementation in `types.ts`, no nested functions, `{verb}{Noun}` helpers. Rules in `/home/user/scaffold/.claude/rules/`: `styles.md` (one emitter home in `_mixins.scss`; the framework-layer sentence with its derived-build clause), `tests.md` (a planted or removed control that fails each new or amended case), `typescript.md`, `writing.md` (table cells: plain, present tense, no banned terms; fictional descriptive data).
- **Host.** Linux POSIX. Run from `/home/user/veneer` with `/home/user/.wave/npm11/node_modules/.bin` first on `PATH`. Chromium for the Vitest browser projects is the repository's configured Playwright path. Sandbox `danger-full-access`; no network, installs, or commits. A nested `git` may report "not a git repository": do not diagnose it; your own `git status --porcelain` is the authority.

## The Orchestrator's rulings

1. **What folds.** Fold every row `flip-probe-4` derives outside the current 46 that its specimen element reads as a break, except:
   - `row`, `col-sm-9`, `col-sm-8` (and any other column class on `dd` or `dl`): no row (corpus ruling: the grid's look does not depend on the `dd` margin; R1 gives the bare `dd` to Tailwind; S7 shows the departure the consumer owns);
   - a row the first fold dropped as redundant or invisible (`focus-ring-*` modifiers, `icon-link-hover`, variant-scoped table rows, `table-group-divider` and `table-active` reboot rows, the border-only anchor restores, `.carousel-indicators button`, `accordion-button` as a reboot row) stays dropped;
   - a row outside the corpus's 13 expected rows that is not one of the preceding: stop and report it with its specimen element, A, and F for the Orchestrator's ruling.
   Expected folds, confirmed by the probe's measurement and not by this ruling: reboot `alert-heading`, `card-subtitle`, `card-header`, `dropdown-header`, `display-6`, `list-inline`, `figure`, `placeholder-wave`; restore `img:where(.img-thumbnail)` `display`; scoped `:where(.navbar-text) a` only if the probe derives it. A corpus row the probe does not reproduce is not folded; report it.
2. **Mechanism.** No new form: reboot rows join `$curated`, restore rows `$restored`, a scoped row `$scoped` (root `navbar-text`, tag `a`). Change `/home/user/veneer/src/bootstrap/_mixins.scss` only if a new form is needed (none expected; a need is a stop). Default emission stays byte-identical: `npm run build:src:bootstrap` keeps `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`.
3. **Longhands cells** take the probe's measured lists, as the first fold's appended ruling set them; margin rows list `margin-bottom, margin-block-end`; the `:where(.navbar-text) a` cell names `text-decoration-line, text-decoration-color`.
4. **Witnesses**, in fictional descriptive data and Bootstrap's documented markup (no masking companion), read by the witness case over every element the row's selector matches (`querySelectorAll`: `.NAME` for a reboot row, the row's selector for a restore or scoped row), equal to Bootstrap alone on every matched element, the removal control differing on at least one. Reboot witnesses: `alert-heading` on `h4` inside `.alert`; `card-subtitle` on `h6` with `mb-2 text-body-secondary`; `card-header` on `h5` in `.card`; `dropdown-header` on `h6` in a `.dropdown-menu`; `display-6` on `h1`; `list-inline` on `ul`; `figure` on `figure`; `placeholder-wave` on `p`. The restore witness `img.img-thumbnail` in normal flow (not a flex item). A scoped `:where(.navbar-text) a` witness carries a plain element and a hazard element (a `.navbar-text` link beside a `.navbar-text` link that a component rule colors, so the component's color still wins at (0,1,1) over the copy at (0,0,1), and the plain link exposes the removal). A witness that matches no element fails the case with the row named.
5. **Precedence.** The precedence case covers every added copy unchanged in form: same `bootstrap` layer, the original reboot compound's specificity, a position before the first component rule. Report the measured pairs for the added copies, and quote the `h6:where(.card-subtitle, …)` and `:where(.navbar-text) a` pairs if present.
6. **Counts.** The derivation proof's pinned totals (73 originals; curated and scoped copy counts) are re-measured in the test from the lifted sheet and pinned; report each. The conformance pins in `pins the tuned-sheet statement sequence to the measured syntactic rewrites` (the rewrite counts) and any statement count in the § `Tailwind compatibility recipe` describe that the added rows move are re-measured and re-pinned; the Sass-literal pin follows the literals in both directions with its planted and removed controls.
7. **The showcase mapping** is report-only: report each folded row with the specimen and element that carries it (from `flip-specimens`'s map); the specimen captions that name a row stay; `/home/user/veneer/tmp/units/flip-showcase/curation.md` is not edited.

## Implementation

1. Sass literals in `/home/user/veneer/src/tailwindcss/_tokens.scss` (rulings 1, 2), each a list edit.
2. Builds and digests: the bootstrap default digest unchanged; the `$layered: false` compile digest measured before the first edit and after; `npm run build:src:tailwindcss` and the new digest.
3. `/home/user/veneer/tests/src/tailwindcss/index.test.ts`: derivation proof counts (ruling 6), witness case over every row (ruling 4), precedence case (ruling 5).
4. `/home/user/veneer/tests/conformance.test.ts` § `Tailwind compatibility recipe`: the rewrite and statement pins and the Sass-literal pin (ruling 6).
5. Guide table rows (rows only, no prose; the Orchestrator applies prose): each added row with Form, Class or selector, Longhands, Witness, Reading in the table's style ("Keeps …"); the table equals `$curated`, `$restored`, and `$scoped` exactly.
6. Records: run U3's writers twice through `npx vitest run --config tmp/units/flip-records/vite.writers.config.ts`; both runs give equal digests for `/home/user/veneer/tests/fixtures/tailwindcss/recipe.json` and `/home/user/veneer/app/browser/recipe.json`, and the record's `sheet` equals the new tuned digest.
7. `/home/user/veneer/tests/setup.ts`, `/home/user/veneer/tests/setupStyles.ts`, and their tests change only if a proof needs an addition (none expected; each addition gets a case).

## Unknowns

- Which corpus rows the probe reproduces, and with which longhands: the probe's report settles it.
- Whether an added copy moves a statement count other than the rewrite counts in the conformance describe: measure and pin.
- Whether the added rows move a `test:integration` or journey reading: observe and report by title.

## Scope

- **Owned.** `/home/user/veneer/src/tailwindcss/_tokens.scss`; `/home/user/veneer/src/bootstrap/_mixins.scss` only under ruling 2; the curation table rows of `/home/user/veneer/guides/veneer.md` § Tailwind compatibility sheet (no prose); `/home/user/veneer/tests/src/tailwindcss/index.test.ts`; `/home/user/veneer/tests/conformance.test.ts` inside the `Tailwind compatibility recipe` describe (the rewrite counts, the statement pins, the Sass-literal pin); `/home/user/veneer/tests/setup.ts`, `/home/user/veneer/tests/setup.test.ts`, `/home/user/veneer/tests/setupStyles.ts`, `/home/user/veneer/tests/setupStyles.test.ts` under item 7; `/home/user/veneer/tests/fixtures/tailwindcss/recipe.json` and `/home/user/veneer/app/browser/recipe.json` through U3's writers only; the folder tmp/units/flip-sheet-3 under `/home/user/veneer` (create it).
- **Off-limits.** Everything else, including `/home/user/veneer/src/bootstrap/_reset.scss`, `/home/user/veneer/src/bootstrap/_tokens.scss`, `/home/user/veneer/src/bootstrap/components/**`, `/home/user/veneer/src/bootstrap/_utilities.scss`, `/home/user/veneer/src/tailwindcss/index.scss`, `/home/user/veneer/src/tailwindcss/_mixins.scss`, `/home/user/veneer/app/**` other than the record, `/home/user/veneer/tests/integration.test.ts`, `/home/user/veneer/tests/app/**`, `/home/user/veneer/tests/setupBrowser.ts`, the guide's prose, `preflight.json` and `incompatible.json`, `package.json`, the lockfile, `tmp/probes/**`. No install, commit, push, credential, `git stash`, `git add`, `git reset`, `git checkout`, no destructive command, no tree-wide mutating gate (`npm run lint`, `npm run format`); if `format:check` fails, format only owned files with the repository's per-file formatter and say which.

## Execution

Perform the assignment yourself and spawn nothing. Order: state check, digest baseline, Sass, builds, sheet tests, conformance pins, guide rows, records, gates. Fix every failure in owned files before reporting.

## Output

Final message through the last-message file, no process diary:
1. Per acceptance criterion: expected, measured, exit, and for each failed gate its exact output (bare, no truncation).
2. The folded rows by form with counts (expected up to 8 reboot, 1 restore, 1 scoped; the table from 46 rows to as measured), each with its specimen element; the probe rows not folded with the ruling that excludes each.
3. The per-row element counts the witness case reads, and the plain and hazard readings of a scoped row.
4. The derivation proof's measured totals; the conformance rewrite and statement counts before and after.
5. The precedence case's measured pairs for the added copies.
6. Digests: default bootstrap, `$layered: false` before and after, the tuned sheet before and after, both records over two writer runs.
7. Observations: `npm run test:integration` by failing title.
8. Edited files and final `git status --porcelain`.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when: a sandbox write is rejected (never try another write mechanism); the bootstrap default digest `7932f7a5…` changes and you cannot restore it; a folded row's witness does not read equal to Bootstrap alone under the recipe on every matched element; a copy introduces a precedence its original lacks; the probe derives a row ruling 1 does not cover; a new row form is needed; a file outside Owned must change; the tree at launch is not clean or HEAD does not carry `flip-specimens`'s commit. Settle ancillary choices yourself and record them: literal layout, witness wording, helper names in `{verb}{Noun}` form.

## Acceptance criteria

Cheapest first; run each bare, from `/home/user/veneer`, each with its exit in the report. The list is the first fold's final list (`flip-sheet-4`, archived as `brief-3.md`, which takes the `brief-2.md` list), plus the conformance pins:

1. `npm run build:src:bootstrap`; `sha256sum dist/src/bootstrap/index.css` equals `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`.
2. `npm run build:src:tailwindcss`; report the new `sha256sum dist/src/tailwindcss/index.css`. Then the writers twice: `npx vitest run --config tmp/units/flip-records/vite.writers.config.ts`; both record digests equal across runs, the record's `sheet` equal to the new digest, `git status --porcelain` equal after both runs.
3. `npm run check:src:bootstrap`
4. `npm run check:src:tailwindcss`
5. `npm run check`
6. `npm run lint:check`
7. `npm run format:check` (format only owned files first)
8. `npm run test:src:bootstrap`
9. `npm run test:src:tailwindcss`
10. `npm run test:setup`
11. `npm run test:setup:browser`
12. `npx vitest run --config vite.config.ts --project conformance tests/conformance.test.ts -t "Tailwind compatibility recipe"`
13. `git diff --check`

**Observation, not a criterion.** `npm run test:integration`, with every failing title; a failure the added rows cause outside Owned is reported and not fixed.

## Review evidence

The actual diff, the folded rows, the copy list, the precedence pairs, the counts, the digests, and `git status --porcelain`.

## Rulings appended before launch

- **Launch order.** After `flip-probe-4` is accepted and `flip-specimens` committed, on a clean tree; `flip-preservation` follows this unit.
- **Sandbox** `danger-full-access`, as every Chromium-reading lane of this flip ran.
- **Cap.** 5400 s.

## Launch

From `/home/user/scaffold`. The journal, error, and last-message files of the earlier `flip-sheet-3` run sit at the same paths; the Orchestrator moves them aside (they are archived as `last-2.md` in the fold archive) before launch:

```text
node .agents/skills/orkestrel-dispatch/scripts/launch.ts --journal tmp/codex/flip-fold-2.jsonl --errors tmp/codex/flip-fold-2.err --cap 5400 --status -- codex exec --json -C /home/user/veneer --sandbox danger-full-access --model gpt-6-astra -c model_reasoning_effort="high" --output-last-message /home/user/scaffold/tmp/codex/flip-fold-2-last.md "Read /home/user/scaffold/tmp/codex/flip-fold-2-brief.md from disk and execute it exactly. Your final message is the report it specifies."
```

Appended 2026-10-04 after `flip-probe-4` (`/home/user/veneer/tmp/probes/flip5/report.md`, two byte-identical runs, Chromium 141.0.7390.37). Launch HEAD: veneer `03b21b4` (`flip-specimens` committed); the tree is clean.

1. **Fold these 10 rows**, so the table grows from 46 to 56 (38 reboot, 11 restore, 7 scoped):
   - reboot `alert-heading` (`font-size, font-weight, margin-bottom, margin-block-end`), `card-subtitle` (`font-weight`), `card-header` (`font-size, font-weight`), `dropdown-header` (`font-weight`), `display-6`, `list-inline`, `figure`, `placeholder-wave` (each `margin-bottom, margin-block-end`): derived by the fixed point from their specimen representatives.
   - restore `img:where(.img-thumbnail)` (`display`): the fixed point's signature deduplication did not select the thumbnail specimen, and the direct specimen reading (`report.md` § Corpus comparison: A `inline`, F `block`) is the measurement; fold it on that reading, and the witness case reads the thumbnail specimen itself.
   - scoped `:where(.navbar-text) a` (`text-decoration-line`): derived; the cell takes the measured list, which corrects ruling 3's `text-decoration-color` (the probe did not derive it). The copy still carries the whole scoped reboot declaration, as every scoped copy does.
2. **Fold none of these 19 derived rows**, each with the ruling the first fold applied and the probe re-derived against: `row`, `col-sm-9`, `col-sm-8` (the corpus ruling: the consumer owns the `dd` margin); `table-group-divider`, `:where(.table-group-divider) td`, `table-active`, `a:where(.card-link)`, `a:where(.icon-link)`, `a:where(.icon-link-hover)`, `a:where(.stretched-link)` (border colors of zero-width borders: invisible); `:where(.carousel-indicators) button` (`color` on a textless indicator: invisible); `focus-ring-primary` to `focus-ring-dark` (8 rows, `color`: redundant, because every such element also carries `focus-ring`, whose row holds `color`); `icon-link-hover` (redundant with `icon-link`, which Bootstrap's markup always pairs with it). If the specimen reading of one of these shows a visible break (a longhand other than a zero-width border color, on an element with text), stop and report it with A and F.
3. **Keep the 2 current rows the probe did not reproduce**, `:where(.table) tfoot` and `:where(.table) tr`: fix unit A's hazard witnesses (`thead`, `tfoot`, and the `tr` rows read a plain and a hazard element) are their derivation evidence; the witness case proves them, and the derivation proof's counts include them.
4. **Counts to pin by measurement, not by this ruling**: the curated copies (72 plus the new reboot and restore copies), the scoped copies (7 plus one), the joined `bootstrap` blocks, the statement count of the conformance rewrite pin, and the derivation proof's row totals; record each before and after.
5. **The guide table** gains the 10 rows in the fold's column shape with the specimens' witness markup from `app/browser/sections/*.html` (the documented specimens), and no prose changes.
