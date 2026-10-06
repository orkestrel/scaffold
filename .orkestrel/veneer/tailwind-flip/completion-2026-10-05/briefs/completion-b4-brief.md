# Unit completion-b4 — TAILWIND_READINGS rows for the containers and tables captions

## Role and engine

`astra` implementation unit on `gpt-6-astra` (effort high), reached as Codex CLI (`codex exec`) through `.agents/skills/orkestrel-dispatch/scripts/launch.ts`. Executor: BENCH_ENGINE. You are the sole writer in the checkout `/home/user/.wave/veneer-containment`, based on `47c0765`.

## Objective

Add two rows to `TAILWIND_READINGS` in `/home/user/veneer/tests/setupBrowser.ts` (edit the same path inside `/home/user/.wave/veneer-containment`) so the showcase pins the "Container widths" and "Breakpoint scroll wrappers" captions per face, closing tree TW-22 (rows half).

## Context

- **Definition.** `/home/user/scaffold/.orkestrel/veneer/tailwind-flip/completion-2026-10-05/re-triage.md:280-290` (unit B4). Closing condition, tree TW-22 in `/home/user/scaffold/.orkestrel/veneer/tailwind-flip/completion-2026-10-05/open-items.json`: "Add two `TAILWIND_READINGS` rows following the description-list precedent: `.container-sm` `max-width` at 1280 px reading 1140px, 1140px, and 1280px, and `.table-responsive-sm` `overflow-x` reading `visible` wide and `auto` narrow, with per-face minimums of 576, 576, and 640 px. Record the caption-text reader as a later item." The caption-text reader is out of scope (`re-triage.md:650-652`). `/home/user/scaffold/.orkestrel/veneer/lanes.md` holds only lanes TW-22 (the D-4 `browse` run), which is a different item.
- **Evidence (read at veneer `7e2792b`; line numbers will shift after the containment unit, B1, B2, and B3 land, so locate by content).**
  - Row type `TailwindReading` (`git show 7e2792b:tests/setupBrowser.ts`, lines 161-169): `specimen`, `subject`, `property`, `values: Record<Face, string>`, optional `narrow`, `dark`, and `minimum: Record<Face, number>`. `resolveExpectation` (lines 1430-1445) returns `narrow ?? values` below `minimum[face]` (default `TAILWIND_MEDIUM`, 768) and `values` from it. The type expresses a per-width value as it stands: no type change, and no edit to the `setupBrowser.test.ts` proof.
  - Nearest model for a per-width row: the `'Mapped sm breakpoint'` row, the last entry of `TAILWIND_READINGS` (lines 992-999): `values`, `narrow`, and `minimum: { bootstrap: 576, unexcluded: 576, tailwindcss: 640 }`. Per-face values only: the description-list rows (`"Description list in Bootstrap's markup"`, lines 865-882), which the record names as the precedent for a specimen outside the Tailwind section.
  - Readers of every row: J4 (`/home/user/veneer/tests/app/browser/integration.test.ts`, `:400`, `it('J4 compares the three faces through the Stylesheets buttons'`) asserts `readTailwindSet(TAILWIND_READINGS)` equals `resolveExpectation(reading, face, OWN.width)` for each face at the variant's width, and the journey variant loop (`:1036-1042`) does the same. `/home/user/veneer/tests/setupBrowser.test.ts`, `:1112-1137` reads every row at 1280 and 390 px in light and dark under the three faces. `readTailwindSet` resolves the figure by accessible name (`getByRole('figure', { name, exact: true })`) and takes `figure.querySelector(subject)`.
  - Captions (`git show 7e2792b:app/browser/sections/containers.html`, `tables.html`): figure name `Container widths` (title span `:59`, caption text `:65-68`; subject `<div class="container-sm ...">` at `:18`); figure name `Breakpoint scroll wrappers` (title span `:291-292`, caption text `:299-300`; subject `<div class="table-responsive-sm">` at `:238`). The containment worktree `/home/user/.wave/veneer-containment` (uncommitted, on `7e2792b`) edits both files, but the caption, title, and subject lines are identical at the same line numbers (`grep -n` over both copies); its `containers.html` diff changes only the card-body wrapper classes at `:8-9`.
  - The containment worktree's diff of `/home/user/.wave/veneer-containment/tests/setupBrowser.ts` (201 added lines) does not touch `TailwindReading`, `TAILWIND_READINGS`, or `resolveExpectation` (`git -C /home/user/.wave/veneer-containment diff -- /home/user/.wave/veneer-containment/tests/setupBrowser.ts`).
- **Readings to confirm live first.** These are the definition's claims, not measurements: `.container-sm` `max-width` at 1280 px reads `1140px` (bootstrap), `1140px` (unexcluded), `1280px` (tailwindcss); `.table-responsive-sm` `overflow-x` reads `visible` at 1280 px and `auto` at 390 px with minimums 576, 576, 640. The definition gives no 390 px value for `.container-sm`, but the setup case and the 390 px journey variants read every row at 390 px: read `.container-sm` `max-width` at 390 px under the three faces in both color modes and state it as `narrow` with `minimum: { bootstrap: 576, unexcluded: 576, tailwindcss: 640 }` (the sm threshold per face) if the 390 px value differs from the 1280 px value. Read both rows in dark mode too; add `dark` only if a value differs. If any live value differs from the definition, stop and report.
- **Law.** `/home/user/scaffold/AGENTS.md` (non-negotiables: no `any`, no `!`, no `as`, no suppression directives, no new packages, readonly interface properties, finish the work, scripts in Node `.ts` only); `/home/user/scaffold/.claude/rules/tests.md` (§ Shared test infrastructure: a `setup*.ts` file holds no `describe`, `it`, or `expect`; § Browser tests); `/home/user/scaffold/.claude/rules/typescript.md`; `/home/user/scaffold/.claude/rules/names.md`; `/home/user/scaffold/.claude/rules/writing.md`. Follow the existing row style (`Object.freeze` on the row and each face record). Guide: none for this unit (`guides/**` is off-limits).
- **Installed primitives.** none needed; the readers `readTailwindSet`, `resolveExpectation`, and `resolveSpecimen` already exist in `/home/user/veneer/tests/setupBrowser.ts`.
- **Host.** Linux, Chromium 141 at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`, Node with type stripping; every Chromium or CPU-loading command runs through the host queue `flock -w 1800 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/completion-b4-NAME --kind command --cwd /home/user/.wave/veneer-containment -- COMMAND` with npm 11 first on PATH inside the command (`env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH`); a reused folder exits 65, so each NAME is fresh; the journey suite runs as `env CAPTURE=0 ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=FOLDER/report.json` with `--kind journey`, filtered to the J4 case with `-t` for the unit's own gate, and the Orchestrator runs the full journey and compares its rows against the J-B2 baselines (`tmp/units/journey-cost/runs/jb2-1` and `jb2-2`, 94 registered, 0 skipped, taken on `47c0765`); never `cd`; no shell, PowerShell, or Python scripts (tooling in Node `.ts`); a suite whose test file fails to import on a Vite dependency optimization reload before any test body (`Cannot read properties of undefined (reading 'config')`) gets exactly one re-run, recorded with both folders; the only failures a gate may carry are titles in `/home/user/veneer/tmp/units/journey-cost/host-bound.md`.
- **Sandbox.** Codex `danger-full-access`: nothing enforces the scope below, so keep to it; `launch.ts` records `git status --porcelain` before and after, and any change outside the owned file is a deviation. A nested `git` can report `not a git repository` while your own `git status` works; do not diagnose the checkout.
- **Standing conditions.** The containment unit, B1, B2, and B3 have landed in `/home/user/.wave/veneer-containment` before you start; B3 also wrote the owned file, so re-read the file and do not revert its changes. Known host-bound failures: the titles in `host-bound.md` only. The Orchestrator repairs anything else.

## Unknowns

- `.container-sm` `max-width` at 390 px and both rows' dark values: read them live and report them with the run folder.
- Whether the landed units changed the figure names or subjects: re-run `grep -n` for `Container widths`, `Breakpoint scroll wrappers`, `container-sm`, and `table-responsive-sm` in the sections folder (`/home/user/veneer/app/browser/sections` at `7e2792b`; the same relative folder in `/home/user/.wave/veneer-containment`); if either differs from the Context, stop and report.

## Scope

- **Owned.** The `TAILWIND_READINGS` constant in `/home/user/veneer/tests/setupBrowser.ts` (edit the same path inside `/home/user/.wave/veneer-containment`) (append the two rows after the last row, so the index-based readers in the setup proof keep their current rows). The `TailwindReading` type stays as is; edit the `setupBrowser.test.ts` proof only if a live reading proves the type cannot express a value, and then stop and report before editing.
- **Shared (report-only).** none.
- **Off-limits.** Everything else, in particular `app/**`, `src/**`, `tests/app/**`, `guides/**`, `package.json`, the lockfile, and configs.
- **Made false by this change.** none expected; J4 and the setup case read the new rows through existing code. Confirm with the gates below.
- **Tools and limits.** Read freely; edit with the patch tool. No installs, commits, pushes, branch changes, credentials, destructive commands (`rm -rf`, `git reset`, `git checkout --`, `git clean`), shared-file edits, or tree-wide mutating gates (`npm run format`, `npm run lint` over `.`). Spawn no subagents.

## Execution

Perform the assignment yourself and spawn nothing.

1. Re-read `TAILWIND_READINGS` and the two figures in `/home/user/.wave/veneer-containment`.
2. Read the values live under the three faces at 1280 and 390 px in light and dark, through the queue (for example a temporary scoped run of the setup case, whose `console.info('Tailwind specimen readings', ...)` prints every row once the rows are added). Compare with the definition; stop on any difference.
3. Append the two rows, modelled on `'Mapped sm breakpoint'`.
4. Run the acceptance criteria in order.

## Output

Final message (the `--output-last-message` file): the diff of the owned file in `/home/user/.wave/veneer-containment`; `git status --porcelain`; the live readings table (row, face, width, theme, value); each gate command with its run folder and its bare result line; every deviation. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when: a live value differs from the definition; a figure name or subject is missing or not unique; the row type cannot express a reading; a gate fails on a title outside `host-bound.md`; a write outside the owned file seems needed; the sandbox rejects a write (never try another write mechanism). Settle yourself and record: row order within the two appended rows, whether a row needs `narrow` or `dark` given the live readings.

## Acceptance criteria

1. Format: `./node_modules/.bin/oxfmt --config .oxfmtrc.json --check /home/user/veneer/tests/setupBrowser.ts` with the path replaced by the owned file inside `/home/user/.wave/veneer-containment` exits 0 (run in `/home/user/.wave/veneer-containment` via the exec's working directory, no `cd`).
2. Lint: `./node_modules/.bin/oxlint --config .oxlintrc.json --deny-warnings /home/user/veneer/tests/setupBrowser.ts` with the path replaced by the owned file inside `/home/user/.wave/veneer-containment` exits 0.
3. Check: `./node_modules/.bin/tsc --noEmit --project tsconfig.json` exits 0, through the queue (`--kind command`, NAME `check`).
4. Scoped `test:setup:browser`: through the queue (NAME `setup`), `env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH ./node_modules/.bin/vitest run --config vite.config.ts --no-cache --reporter=dot --project setup:browser setupBrowser.test` passes (a Vitest file filter, resolved inside `/home/user/.wave/veneer-containment`), including `reads every Tailwind reading the caption claims under the three faces` at 1280 and 390 px in both modes.
5. J4 through the queue (`--kind journey`, NAME `j4`): the journey command in Context with `-t "J4 compares the three faces through the Stylesheets buttons"` passes in every variant, or fails only on `host-bound.md` titles.
6. `git status --porcelain` lists only the owned file beyond the state at launch.

**Observations, not criteria.** The full journey suite and its comparison against the J-B2 baselines (`tmp/units/journey-cost/runs/jb2-1` and `jb2-2`, 94 registered, 0 skipped, taken on `47c0765`), and the tree-wide gates: the Orchestrator runs them. Report the wall time of each queued run from its folder.

**Measurement.** none; the unit makes no cost claim.

## Review evidence

The actual diff of the owned file in `/home/user/.wave/veneer-containment` and `git status --porcelain`, with the run folders under `/home/user/veneer/tmp/units/journey-cost/runs/completion-b4-*`.
