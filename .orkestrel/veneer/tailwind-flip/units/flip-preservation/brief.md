# Unit flip-preservation (F2) — the component-preservation gate and the unpinned caption readings

## Role and engine

astra on GPT-6 Astra (effort high), reached as `codex exec` at `danger-full-access`, in `/home/user/veneer` on branch `ccr-d15a48b1-yyyll6`. You are the sole writer for tracked files; no other unit writes while you run. Paths are absolute or name a file under `/home/user/veneer` in prose.

## Objective

Answer finding F2 of the falsify round: add a journey gate that reads every showcase element carrying a `CLASS_NAMES.bootstrap.components` name under the `bootstrap` and `tailwindcss` faces, attributes each departure through `attributeDeparture` with the probe's exclusions, and fails on any departure attributed to `preflight` or left `unattributed`. Add the `resolved` kind the gate needs. Pin the eight caption readings no case reads (reviewer F7) as `TAILWIND_READINGS` rows. Report the guide sentence that names the gate. Commit nothing.

## State at launch

This unit launches after `flip-header`, `flip-fix-a`, `flip-specimens`, `flip-probe-4`, and `flip-fold-2` are accepted and committed, one writer at a time. Read `git log --oneline -3` and `git status --porcelain` first; the tree must be clean apart from ignored `tmp/`. Every line number below was read at `473edd6` with `flip-header` running and is "(re-read at launch)": locate code by its text. The Orchestrator rules every residual `preflight` and `unattributed` group of `flip-probe-4`'s report before this launch; the rulings sit in § Rulings appended before launch.

## Context

- **Evidence.** Read in this order before editing; cite by path and section.
  1. The reviewer verdict `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/units/flip-falsify/reviewer-verdict.md`: F2 (the gate), F7 (the eight unpinned captions), claims 50 and 51 (no `resolved` member in `DepartureCause`), and the Orchestrator's rulings at its end (F2 becomes a journey gate, one variant, per signature, through the existing `attributeDeparture`, cost measured against the partition's 53 s).
  2. The design verdict `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md`: R5 (the kinds in order `utility`, `resolved`, `preflight`, `inherited`, `unattributed`; the exclusions; the no-vanishing-box assertion that bounds the geometry exclusion; the component-element widening) and every § 12 entry on the partition (the same-page baseline; the winner model; the signature dedupe at 1665 signatures for 8112 elements in 53 s focused; the journey's budget re-recorded as the measured 449 s and 487 s).
  3. The probe report of `flip-probe-4` (report.md in tmp/probes/flip5 under `/home/user/veneer`): the exclusions it applied, the residual groups, the `resolved` tuples by declaring rule, the copy-induced hits, the signature counts.
  4. The journeys archive `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/units/flip-journeys/`: `brief-5.md` (the winner model), `brief-7.md` and `last-7.md` (the signature dedupe and the partition's cost), `brief-8.md` and `eighth-report.md` (the host-bound classification).
  5. The corpus `/home/user/scaffold/tmp/codex/documented-markup.md` § 3 and § Orchestrator rulings (the S7 description list is a departure the consumer owns; `.card > hr` a residual).
  6. `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md` § Host-bound set (the journey failures that do not count against you).
  7. Current code (re-read at launch): `/home/user/veneer/tests/setupStyles.ts` (`attributeDeparture` near :184, `matchesConditions`, `matchesLayoutDeparture`, `matchesTypographyDeparture`, `matchesInvisibleDeparture`, `matchesExcludedDeparture`, `DepartureCause` near :333, `AttributionOptions`) and `/home/user/veneer/tests/setupStyles.test.ts`; `/home/user/veneer/tests/setupBrowser.ts` showcase section (`TAILWIND_READINGS` near :286, `resolveSpecimen`, `readTailwind`, `resolveExpectation`, `collectPartition` near :1369 and its subjects and options, the signature grouping); `/home/user/veneer/tests/setupBrowser.test.ts` § `specimen readings` (`reads every Tailwind reading the caption claims under the three faces` near :848); `/home/user/veneer/tests/app/browser/integration.test.ts` (the partition case `partitions the shared names under the three faces at both widths` near :1082, its signature grouping near :1110, its light-1280 selection comment near :1080); `/home/user/veneer/app/browser/sections/tailwindcss.html` at the F7 lines `212-213, 233-235, 254-255, 278-279, 313-315, 337-338, 512-514, 542-543` (read at `473edd6`; re-read at launch, `flip-header` edits the fragment) and the S7 caption `flip-specimens` wrote in `typography.html` of the same folder; `/home/user/veneer/guides/veneer.md` § Faces, the "What the face proves" cell of the `Tailwind with the layer` row (:1893 at `473edd6`).
- **Law.** `/home/user/scaffold/AGENTS.md` non-negotiables: no `any`, no `as` beyond `as const`, no `!`, no `@ts-*`, lint-disable, or formatter-ignore directive, no new npm package, no mocks, readonly interface properties, types before implementation, no nested functions, `{verb}{Noun}` helpers, the environment boundary (`/home/user/veneer/tests/setupBrowser.ts` imports no value from the app folder, only types). Rules in `/home/user/scaffold/.claude/rules/`: `tests.md` (one behavior per case; a planted or removed control that fails each new or amended case; browser tests), `typescript.md` (update each TSDoc contract your change makes false), `writing.md` (titles: plain, present tense, saying what the case reads; copy § 8 shape in `/home/user/scaffold/tmp/codex/flip-copy.md`).
- **Installed primitives.** `vitest` browser, `@orkestrel/test` (`requireValue`, `waitForCondition`), `@orkestrel/test/browser` (`readStyle`, `readClasses`). Reuse `attributeDeparture` and its helpers, `readLonghands`, `scanSheetRules`, the journey's mount and face helpers, and the partition case's signature grouping; a local twin of an existing reader is a defect.
- **Host.** Linux POSIX. Run from `/home/user/veneer` with `/home/user/.wave/npm11/node_modules/.bin` first on `PATH`. Chromium 141 under Playwright's configured path. Sandbox `danger-full-access`; no network, installs, or commits. A nested `git` may report "not a git repository": do not diagnose it; your own `git status --porcelain` is the authority. Create the folder tmp/units/flip-preservation under `/home/user/veneer` for scratch and logs.

## Implementation

1. **The `resolved` kind** in `/home/user/veneer/tests/setupStyles.ts`. `DepartureCause` gains `'resolved'`. `attributeDeparture` returns, first match in this order: `utility` (unchanged); `resolved` when a rule of the recipe in the `bootstrap` layer or unlayered (a non-withheld Bootstrap rule) matches the element, its conditions apply, and it declares the longhand (verdict § 12: the declaration is the same under both faces and only its resolved value moved); `preflight` when a `base` rule matches and declares the longhand and no such Bootstrap rule does; `inherited`; else `unattributed`. Update its TSDoc and example. `/home/user/veneer/tests/setupStyles.test.ts` gains a case for `resolved` with a control (the same element without the Bootstrap rule reads `preflight`), and the existing cases stay green.
2. **The gate** in `/home/user/veneer/tests/app/browser/integration.test.ts`, in the `showcase matrix` describe beside the partition case, under the same light-1280 selection (the default variant only), reading both widths itself (1280 and 390), titled in the § 8 shape, for example `attributes every component departure of the tailwindcss face to a declared cause other than preflight at both widths`:
   - **Population.** Every element carrying a `CLASS_NAMES.bootstrap.components` name, plus the widened component elements of R5 (an element a lifted-sheet rule matches through a selector whose earlier compound names a component class), read once per signature (tag, sorted classes, nearest `data-bs-theme`, open state) with the partition's grouping. The baseline is the same element under the `bootstrap` face, then under `tailwindcss` (verdict § 12: same page, never a scratch frame).
   - **Departures.** Every longhand that differs, after the exclusions: `matchesLayoutDeparture`, `matchesTypographyDeparture`, `matchesInvisibleDeparture`, `matchesExcludedDeparture`, `position-area`, the grid-track longhands, and the scrollspy state as the probe arranged it, each counted per exclusion. Bound the geometry exclusion by R5's assertion: no element in the population loses its box (zero width or height, or no client rect) under `tailwindcss` where it had one under `bootstrap`.
   - **Attribution.** Each remaining departure through `attributeDeparture` with the recipe's sheets, the lifted sheet, the 192 shared names, `TAILWIND_CLASSES` (passed as data the test reads, never an app import in `/home/user/veneer/tests/setupBrowser.ts`), and the ancestor departures map built in document order. The assertion: zero departures attributed to `preflight` and zero `unattributed`, except the admitted set of § Rulings appended before launch, each admitted entry keyed by specimen title, element, and longhand with its reason, and each required to occur (an admitted entry that no longer departs fails the case). Report the counts per kind (`utility`, `resolved`, `inherited`) and per exclusion, per width.
   - **Controls**, each failing the assertion alone: stripped curation (remove one curated copy from the recipe text in the page, for example every `h5:where(.card-title, …)` copy, and the `card-title` witness element departs as `preflight`); planted preflight (append a `@layer base` rule that sets a longhand the reboot declares on a component carrier, such as `h6 { font-weight: 300 }` under the `dropdown-header` specimen, and the element departs as `preflight`). Restore the page after each control.
   - **Cost.** Measure the case's wall time focused and inside the full journey run, and report it against the partition's 53 s focused and the journey's budget note (449 s and 487 s measured). Keep the case inside the project's per-case timeout; a case that cannot fit is a stop with the measured time.
3. **The caption readings** (reviewer F7). For each of the eight specimens whose caption claims a reading no case reads (`/home/user/veneer/app/browser/sections/tailwindcss.html` at `212-213, 233-235, 254-255, 278-279, 313-315, 337-338, 512-514, 542-543` at `473edd6`, re-read at launch by caption text), add a `TAILWIND_READINGS` row in `/home/user/veneer/tests/setupBrowser.ts` naming the specimen by its caption title, the subject selector, the longhand, the three face values, and the narrow values where the caption names a width. Add the S7 description-list caption's reading the same way. The existing specimen-readings case reads every row under the three faces; a planted wrong value in one new row fails it. Select by specimen and subject, never by index (reviewer F9).
4. **The guide sentence.** Write the sentence the "What the face proves" cell of the `Tailwind with the layer` row in `/home/user/veneer/guides/veneer.md` § Faces must carry to name the gate by its title, and report it; do not edit the guide (the Orchestrator applies it).

## Unknowns

- Whether the gate reads departures the probe did not (the gate reads the default variant at two widths through `attributeDeparture`, the probe its own attribution over 14 conditions): report every group with its key, longhand, A, F, and kind; a group outside the admitted set is a stop.
- The gate's cost against the 53 s partition.
- Whether a host-bound journey title moves.

## Scope

- **Owned.** `/home/user/veneer/tests/app/browser/integration.test.ts` (the gate case, and nothing else changes in that file); the showcase section of `/home/user/veneer/tests/setupBrowser.ts` (`TAILWIND_READINGS`, and any helper the gate needs, each with a case) and its describes in `/home/user/veneer/tests/setupBrowser.test.ts`; `/home/user/veneer/tests/setupStyles.ts` and `/home/user/veneer/tests/setupStyles.test.ts` (the `resolved` kind); the folder tmp/units/flip-preservation under `/home/user/veneer` (create it).
- **Off-limits.** `/home/user/veneer/app/**`, `/home/user/veneer/src/**`, both sheets, the records, `/home/user/veneer/guides/**`, the engine section of `/home/user/veneer/tests/setupBrowser.ts`, `/home/user/veneer/tests/integration.test.ts`, `package.json`, the lockfile, `vite.config.ts`, `configs/`, `tmp/probes/**`. No install, commit, push, credential, `git stash`, `git add`, `git reset`, `git checkout`, no destructive command, no tree-wide mutating gate (`npm run lint`, `npm run format`); if `format:check` fails, format only owned files with `npx oxfmt --config .oxfmtrc.json --write <files>` and say which.
- **Tools and limits.** `node`; the `npm run` scripts named here; `npx vitest run --config vite.config.ts --project <project> <file> -t "<title>"`; `sha256sum`; `git status --porcelain`; `git diff`.

## Execution

Perform the assignment yourself and spawn nothing. Order: state check; baseline (`npm run test:setup:browser` and the partition case focused, each exit and time); the `resolved` kind with its case; the gate with its controls, focused; the readings; the gates in order; the full journey run. Fix every failure in owned files before reporting.

## Output

Final message through the last-message file, no process diary:
1. Findings first: the gate's population (signatures and elements per width), the departure counts per kind and per exclusion per width, every admitted entry with its reading, each control's failing line, the box assertion's count, and the gate's seconds focused and inside the full journey against 53 s and the 449 s and 487 s budget note.
2. The `TAILWIND_READINGS` rows added, each with its caption text and the three readings.
3. The guide sentence for the "What the face proves" cell, quoted.
4. Per acceptance criterion: expected, measured, exit, and for each failed gate its exact output (bare, no truncation); every failing `test:journey` title ruled against § Host-bound set.
5. Edited files and final `git status --porcelain`.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when: a sandbox write is rejected (never try another write mechanism); the gate reads a `preflight` or `unattributed` departure outside the admitted set (give the key, longhand, A, F, kind, and the specimen; never widen an exclusion to pass it); a control does not fail; the gate cannot fit the per-case timeout; a journey title fails that § Host-bound set does not name; a file outside Owned must change; the tree at launch is not clean or HEAD does not carry `flip-fold-2`'s commit. Settle ancillary choices yourself and record them: test titles, helper names in `{verb}{Noun}` form, the planted-preflight rule.

## Acceptance criteria

Cheapest first; run each bare, from `/home/user/veneer`, each with its exit in the report.

1. `npm run check`
2. `npm run lint:check`
3. `npm run format:check`
4. `npm run test:setup:browser`
5. `npm run test:journey`: every failing title ruled against `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md` § Host-bound set; none new.
6. `npm run test:app:browser`
7. `git diff --check`

## Review evidence

The actual diff, the gate's counts and controls, the readings, the timings, and `git status --porcelain`.

## Rulings appended before launch

The driver sets these defaults from the evidence; the Orchestrator confirms or replaces each before launch.

- **Launch order.** After `flip-fold-2` is accepted and committed, on a clean tree.
- **Admitted set.** The S7 description list's departures the consumer owns: `margin-bottom` and `margin-block-end` on `dl.row` and on each `dd.col-sm-9` and `dd.col-sm-8` of the specimen `Description list in Bootstrap's markup` (corpus ruling: no row). Every other residual group of `flip-probe-4` is ruled here by the Orchestrator before launch; an unruled group is a stop.
- **Kinds.** `resolved` passes the gate, as `utility` and `inherited` do; the probe's copy-induced check is what keeps a copy defect out of `resolved`, and a copy-induced hit in `flip-probe-4`'s report is ruled before launch.
- **Sandbox** `danger-full-access`, as every Chromium-reading lane of this flip ran.
- **Cap.** 5400 s.

## Launch

From `/home/user/scaffold`:

```text
node .agents/skills/orkestrel-dispatch/scripts/launch.ts --journal tmp/codex/flip-preservation.jsonl --errors tmp/codex/flip-preservation.err --cap 5400 --status -- codex exec --json -C /home/user/veneer --sandbox danger-full-access --model gpt-6-astra -c model_reasoning_effort="high" --output-last-message /home/user/scaffold/tmp/codex/flip-preservation-last.md "Read /home/user/scaffold/tmp/codex/flip-preservation-brief.md from disk and execute it exactly. Your final message is the report it specifies."
```

Appended 2026-10-04 after `flip-fold-2`. Launch HEAD: veneer `bc35a3e` (the second fold committed); the tree is clean. The tuned sheet's digest is `b946eefe63628fa64183e8a1518cffb0b145ea6ccd083c69105ae1f6fe900662`; `./bootstrap` keeps `7932f7a5…`. The curation table holds 56 rows (38 reboot, 11 restore, 7 scoped); the derivation proof pins 8 scoped copies and 80 precedence pairs.

1. **Expected departures the gate admits by rule, not by listing**: the description list of the `typography-documented-description` figure (`dl.row`, `dd.col-sm-*`) reads a `margin-bottom` departure under the `tailwindcss` face that the consumer owns (the corpus ruling; the caption states it); the gate attributes it to the shared `row` and `col-sm-*` names through the partition's winner model, never to the curation. A border color of a zero-width border, and the `color` of an element with no rendered text, are invisible departures and attributed as such (`matchesInvisibleDeparture`); the `focus-ring-*` and `icon-link-hover` departures resolve through their companions' rows.
2. **A departure the gate cannot attribute is a finding, not a fix**: report each with its element, class names, longhand, and both readings, and stop after the gate's run; the Orchestrator rules whether it is a fold row (a third fold) or an admitted departure. Fold nothing in this unit.
3. **The caption readings** (reviewer F7): each `TAILWIND_READINGS` row you add carries its three measured values; where a caption's claim and the measurement disagree, report the pair and change neither the caption nor the fragment (the copy unit owns the caption).
4. **Budget**: record the gate case's wall time per variant beside the journey's total; the three-face journey reads 446 to 480 s on this host today (`flip-fix-a`, `flip-specimens`, `flip-header` runs); a gate that adds more than 60 s per variant is reported with its cost drivers, not trimmed.
5. **Host-bound set**: a failing journey title in § Host-bound set of `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md` (J8 and the accordion motion=false table at light-390; the tooltip motion=true, collapse motion=false, and navbar-390 motion=false tables at dark-390) is recorded, not repaired; any other failing title stops the unit.
6. **Labels after R12**: the Faces table row the guide sentence (Implementation item 4) targets is `Tailwind + layer`, and the face buttons read `Bootstrap`, `Tailwind, no layer`, and `Tailwind + layer`; `FACE_LABELS` in `tests/setupBrowser.ts` carries them. The sticky header reserves its height as the root's `scroll-padding-top`; a reading that scrolls an element into view lands it under the toolbar, and the paired engine states case centers each trigger before the act for that reason.
