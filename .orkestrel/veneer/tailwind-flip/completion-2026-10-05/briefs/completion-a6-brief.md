# Unit completion-a6: consumer rows for `./tailwindcss` linked alone and linked beside, with the guide's § Tailwind and § Compare hand fixes

Route: astra (implementation). You are the sole writer in your checkout `/home/user/.wave/veneer-a6` (veneer commit 4d21de7, built `dist/`, own `node_modules`). No other process writes there.

## Objective

Two readings in the integration suite pin what a consumer gets from the built `./tailwindcss` sheet without the recipe compile, and the guide's composition section tells that story with its cases cited. The same commit carries the § Tailwind compatibility sheet and § Compare hand fixes listed under "Guide hand fixes". Closes flip FV-X9 (linked-alone half), lanes TW-15, units consumer-rows, flip FV-D14 (guide half), units guide-consumer-owned, flip FV-D7 (guide half), units consumer-rows (adjacent drift), and lanes TW-36 of `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/completion-2026-10-05/re-triage.md` § A6 (lines 200-214) and § 4 "VENEER/guides/veneer.md" (lines 597-622; only the items named here).

## Governing texts (read first)

- The unit: `re-triage.md` § A6 and the § 4 guide items (paths above).
- The suite: `/home/user/.wave/veneer-a6/tests/integration.test.ts`. The compositions it reads: `tuned` (the built `./tailwindcss` sheet alone), `tuned + '\n' + recipeRecord.unexcluded` (the built sheet linked beside a Tailwind compile that excludes nothing, near line 385), and `recipeRecord.recipe` (the recipe compile). Read the `compiled Tailwind compatibility recipe` describe (near 548) and the `computed Tailwind class relationships` describe (near 771) and place each reading in the describe that fits; read `readClassLonghands` and the CSSOM readers the file already uses.
- The guide: `/home/user/.wave/veneer-a6/guides/veneer.md`. § Tailwind compatibility sheet holds the composition prose near 1234-1240 and the composition table near 1279-1294; the percentage-names paragraph near 1304-1313; the curation forms list near 1393-1408; § Compare near 2035-2038; the factory fence near 670-677.
- The flip verdict's § 2 row for the percentage names: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md` near line 46.
- Rules: `/home/user/scaffold/.claude/rules/tests.md`, `/home/user/scaffold/.claude/rules/typescript.md`, `/home/user/scaffold/.claude/rules/architecture.md` (no nested functions), `/home/user/scaffold/.claude/rules/names.md`, `/home/user/scaffold/.claude/rules/writing.md` (every guide sentence: `must`/`can`/`might`, no `should`, no `currently`/`now`/`new`/`latest`, a code token in backticks followed by a noun, `see` before a link), `/home/user/scaffold/.claude/rules/documentation.md` § Parity (a cited case title must exist verbatim under `tests/`; `npm run test:guides` runs `findDrift`).

## Scope

- **Owned.** `/home/user/.wave/veneer-a6/tests/integration.test.ts` (two cases); `/home/user/.wave/veneer-a6/guides/veneer.md` at the places named in "The readings" and "Guide hand fixes" only. The report folder `/home/user/veneer/tmp/units/completion/a6/`.
- **Off-limits.** Everything else: `src/**`, other tests, `package.json`, the lockfile, configs, `ROADMAP.md`, and every guide section not named here (§ Showcase in particular rides another unit).
- **Made false by this change.** Any test pinning the integration suite's case count; any `findDrift` row touching the edited sentences; the composition-table row count if a case pins it. Search before editing.

## The readings

1. **Linked alone.** Under `tuned` alone: `mt-3` reads no rule (read the CSSOM for a rule whose selector matches `.mt-3`, and the computed `margin-top` of an `mt-3` element equals that of a bare sibling), and the CSSOM holds no `@source` rule (walk every rule; no `CSSRule` has an `@source` prelude or a `cssText` opening with `@source`). Control: the recipe compile (`recipeRecord.recipe`) reads a `.mt-3` rule with Tailwind's `margin-top`, so the same reading over the recipe fails the "no rule" assertion; assert that control inside the case as the recipe reading. Title: `reads no shared utility rule and no source rule under the built sheet linked alone`.
2. **Linked beside.** Under `tuned + '\n' + recipeRecord.unexcluded`: `.collapse.show` reads `visibility: collapse`, because the built sheet's `@source` exclusion never ran and Tailwind's `collapse` utility wins. Control: the recipe compile reads `visible`; assert it in the case. Title: `hides collapse show under the built sheet linked beside an unexcluded Tailwind compile`.
3. Log each reading through `console.info` as one JSON line (composition, property, value).

## Guide text (exact; adjust only a value that the readings return differently, and say so)

- **After the composition table (near 1294), a second table** introduced by one sentence: "The two compositions that skip the recipe compile read as follows; the first is unsupported, and the second hides `.collapse.show`:"

  | Composition | Reading | Value | Case |
  | --- | --- | --- | --- |
  | `./tailwindcss` linked alone, Tailwind absent (unsupported) | a `.mt-3` rule; an `@source` rule in the CSSOM | none; none | `reads no shared utility rule and no source rule under the built sheet linked alone` |
  | `./tailwindcss` linked beside a separately compiled Tailwind sheet | `visibility` of `collapse` and `show` | `collapse` | `hides collapse show under the built sheet linked beside an unexcluded Tailwind compile` |

- **The sentence near 1236-1239** ("A built sheet you link beside a separately compiled Tailwind sheet, or compile through Sass, carries an `@source` statement the browser drops, so Tailwind's `collapse` rule hides `.collapse.show` there.") gains, after it: "The `reads no shared utility rule and no source rule under the built sheet linked alone` and `hides collapse show under the built sheet linked beside an unexcluded Tailwind compile` cases read both compositions." The bare-`h1` reboot reading in the composition table keeps its cited case.
- **The `h5.modal-title` row.** Search the guide for `h5.modal-title`; that row names `h1.modal-title.fs-5` instead and cites `reads every Tailwind reading the caption claims under the three faces in %s color mode`, because the specimens read `<h1 class="modal-title fs-5">` (`tests/setupBrowser.ts` near 684-701; `app/browser/sections/tailwindcss.html` near 224). Report the row's location.

## Guide hand fixes (same commit)

- After the `w-full` paragraph (near 1306-1312), add: "The percentage names follow that rule: under the recipe `w-25` reads `6.25rem`, `top-50` reads `12.5rem`, and `start-100` reads `25rem`, Tailwind's spacing multiples, where Bootstrap reads `25%`, `50%`, and `100%`, as the `partitions shared names, pins raw-composition incompatibility, and gives utilities to Tailwind and components to Bootstrap` case reads." Confirm the three values against that case's readings or the recipe record before writing them; report what you read.
- The composition table gains the flip verdict's § 2 row for `w-100`, `top-50`, and `start-100` (`design-verdict.md` near 46), in the table's own column shape, citing the `partitions shared names…` case; read the values from that case's output.
- After the curation forms list (near 1393-1408, the end of the three-form list), add one paragraph that names what stays the consumer's: the description-list margins (16 px and 8 px under `bootstrap`, 0 px under `tailwindcss`; the consumer sets `mb-2` or its own rule), the `.card > hr` residual, and the preservation case's admission of those rows (`tests/setupBrowser.ts` near 2022-2028), citing the case `attributes every component departure of the tailwindcss face to a declared cause other than preflight at both widths`. Then the sentence near 1395 ("every other bare element is Tailwind's, inside a component too.") names those exceptions in a trailing clause.
- Near 2037, "and under the `unexcluded` composition" becomes "and under the `./tailwindcss` sheet beside the compile without the Veneer import".
- Near 673, the fence's `engine.destroy()` becomes `veneer.destroy()` (the fence declares `const veneer`).
- Do not touch the sentence near 1835 (bundler path) or near 1535-1536 (the release); they wait on the user and on the desktop session.

## Host queue

Every command that launches Chromium or loads the CPU (check, lint, format, every Vitest run) runs only as:

```text
flock /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/a6-<name> --kind command --cwd /home/user/.wave/veneer-a6 -- <command>
```

Usage is in `/home/user/veneer/tmp/units/journey-cost/README.md`. Fresh `<name>` per run (a reused folder exits 65). Put `/home/user/.wave/npm11/node_modules/.bin` first on `PATH` for npm commands. If the lock cannot be taken within 30 minutes, report the holder and stop.

## Your acceptance before handing back (through the queue unless noted)

1. A scoped run of the integration file, then `npm run test:integration` (confirm the project name from `vite.config.ts`).
2. Each control fails: invert each control's expectation once (an uncommitted edit you restore), show the message, then `git diff --stat` after the restore.
3. `npm run test:guides`, `npm run test:policy`, `npm run lint:check`, `npm run format:check`, `npm run check`.
4. `git diff --check` (direct).

## Sandbox

You run under `danger-full-access` so the queue lock and Chromium work. Treat the following as your only writable roots: `/home/user/.wave/veneer-a6` (the owned files, the worktree's `tmp/` and `node_modules/.vite`), `/home/user/veneer/tmp/units/completion/a6/`, and `/home/user/veneer/tmp/units/journey-cost/runs/`. Never write anywhere else.

## Forbidden

Installs, commits, pushes, credentials, destructive commands (`rm -rf`, `git reset`, `git checkout --`, `git clean`, `git stash`), edits outside the owned places, tree-wide mutating gates, mocks or spies, a second writer, CPU-loading commands outside the queue.

## Deviation contract

Stop and report when: a reading returns a value this brief did not predict (report it; do not write a guide value you did not read); a control does not fail; `test:guides` fails on a sentence outside your edits; a gate fails outside the change.

## Return shape

Report file `/home/user/veneer/tmp/units/completion/a6/report.md` with: the two case titles and their describes; each reading's logged JSON line; the two control messages; every guide edit (line, old text, new text); every queued command with its run folder and exit code; `git status --porcelain` and `git diff --stat` at the end; deviations. Your final message is a short summary naming the report path.

## Appended fix ruling (2026-10-05, after the Opus review of the first run)

The review confirmed the two cases, the citations, and the hand fixes, and found nine defects. Fix each, re-run the acceptance on the final bytes, and report. The ownership widens to the partition case `partitions shared names, pins raw-composition incompatibility, and gives utilities to Tailwind and components to Bootstrap` in `tests/integration.test.ts` for item 2 only.

1. **The `@source` reading cannot fail.** Chromium drops every unknown at-rule at parse, so the CSSOM filter returns `[]` for any input, and the recipe control reads the same. Add a presence guard beside the CSSOM reading: `expect(tuned).toMatch(/@source not inline\("[^"]+"\);/u)` (the statement is in the text and absent from the CSSOM). Control: a copy of `tuned` with the statement removed fails the guard; assert it in the case.
2. **Back the composition-table numbers with assertions.** In the partition case, beside its per-row delta loop, assert at width 640 on the alone, exposed, and restored readings: `w-25` width `160px` and `100px`; `w-100` width `640px` and `400px`; `top-50` top `50%` and `200px`; `start-100` inset-inline-start `100%` and `400px` (Bootstrap and the raw composition against the recipe). Then write the composition-table row (near 1296) with those computed strings "at 640 px", not the declared forms, and keep the rem equivalents in the percentage paragraph only as parenthesized conversions.
3. **The percentage paragraph** (near 1325) states what the case asserts: "Under the recipe, the `w-25` class reads `100px` (`6.25rem`), the `top-50` class `200px` (`12.5rem`), and the `start-100` class `400px` (`25rem`) at 640 px, Tailwind's spacing multiples, where Bootstrap reads `25%`, `50%`, and `100%`, as the `partitions shared names, pins raw-composition incompatibility, and gives utilities to Tailwind and components to Bootstrap` case reads." Every code token takes a following noun.
4. **The `h1.modal-title.fs-5` row** (near 1295): run the cited caption case `reads every Tailwind reading the caption claims under the three faces in %s color mode` through the queue (`./node_modules/.bin/vitest run --config vite.config.ts --no-cache --reporter=dot --project setup:browser -t 'reads every Tailwind reading the caption claims'`) and quote its `Tailwind specimen readings` line for the modal and offcanvas titles specimen in the report; the row's `20px` and `500` values must appear in that line. If the case cannot run, remove the row and report the absent `h5.modal-title` row as a deviation.
5. **The `.card > hr` residual** (near 1423): state it with its status instead of a bare name: "a direct-child `hr` element of a `.card` element keeps Bootstrap's vertical margins under the `bootstrap` face and reads preflight's `0px` margins under the `tailwindcss` face; no documented markup carries it and no case reads it."
6. **The `mb-2` remedy** (near 1425): `mb-2` is a shared utility and reads Tailwind's `0.5rem` under the recipe, so it restores the `dd` margin alone. Write: "you can set the `mb-2` class on each `dd` element and the `mb-4` class on the `dl.row` element, or your own rule"; confirm the `mb-4` value against the recipe record (`tests/fixtures/tailwindcss/comparison.json` or the record the file reads) before writing it, and cite `reads every Tailwind reading the caption claims under the three faces in %s color mode` for the 16 px, 8 px, and 0 px values, because that case asserts them (the preservation case admits the rows but does not read the values).
7. **The table intro** (near 1298): "The two compositions that skip the recipe compile read as follows; the `./tailwindcss` sheet linked alone is unsupported, and the sheet linked beside a separately compiled Tailwind sheet hides a `.collapse.show` element:".
8. **The exceptions clause** (near 1411): "..., inside a component too, except the description-list margins and the `.card > hr` residual, which stay yours."
9. **Gates on the final bytes.** The earlier `test:guides` and `test:policy` runs predate the formatter pass. After every edit above, run through the queue: the scoped integration file, `npm run test:integration`, `npm run test:guides`, `npm run test:policy`, `npm run lint:check`, `npm run format:check`, `npm run check`, then `git diff --check`; cite the new run folders. Keep the npm cache under the worktree's `tmp/` as your later runs did.

Report over `/home/user/veneer/tmp/units/completion/a6/report.md`, keeping the first as `report-1.md`.

## Second appended ruling at relaunch (2026-10-05, after the fix pass's timeout stop)

- **A 15 s timeout of an untouched case is a load reading, not a stop.** `reads equal witness longhands in both raw composition orders and rejects a planted difference` passed in this lane's earlier full run (60 of 60) and timed out once at 15 000 ms in the final scoped run while five other lanes shared the host. When an untouched case times out at its budget, record the run folder and re-run the same gate once through the queue; a second timeout of the same case is the stop; a pass continues. The clause "a gate fails outside the change" means an assertion failure or a repeated timeout, not one timeout under load.
- **Finish the acceptance on the final bytes** through the queue: the scoped integration file (re-run), `npm run test:integration`, `npm run test:guides`, `npm run test:policy`, `npm run lint:check`, `npm run format:check`, `npm run check`, then `git diff --check`. Cite each run folder.
- **Report path.** Keep the fix report as `report-2.md` and write the resumed run's report over `report.md`.
