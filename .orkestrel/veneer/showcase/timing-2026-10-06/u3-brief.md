# Unit task75-U3 — settle stray tip panels before the preservation count, then re-baseline

## Role and engine

`astra` implementation unit on `gpt-6-astra` (effort high) through the Codex CLI. You are the sole writer in the checkout `/home/user/.wave/veneer-containment` (a detached veneer worktree at `90b96bb`, `node_modules` installed, `dist` built). Owned files: `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/app/browser/integration.test.ts`. Commit nothing; the Orchestrator lands.

## Objective

Make the preservation case's open-state count deterministic. The row field `excluded` (`tests/app/browser/integration.test.ts`, the `collected − signatures` count before the summary) read 10766 in 15 of 18 tooltip rows at 390 px across nine full runs and 10763 in the other three, because an engine tip panel outside the bound state was still connected to `document.body` when the count ran. Unit U2 named the stray: a hover tooltip. The filtered case alone read 10763 three times (`runs/task75-u2-probe-2` to `-4`, no stray), and the unfiltered dark-390 project with a probe at the count (`runs/task75-u2b-full-dark-390`, 490.957 s, 24 passed) read 10766 at 390 px light with one stray, `tooltip11` (classes `tooltip bs-tooltip-auto fade show`, connected, no `aria-describedby` holder), while the `:hover` chain ended at `button.btn.btn-secondary` inside `section#tooltips` of `main#content`: Chromium's real pointer, left where earlier cases of the same project moved it, rests over a tooltip trigger once the 390 px layout puts one under it, and the engine shows a hover tooltip that the count then sees. At 1280 px the chain ends in the sidebar (`p.small.fw-semibold`), and at 390 px dark it ends at a bare `div`, so those rows read 10763. The branch is the hover branch: park the pointer, then wait. The reader waits for the stray-free state before counting, through a helper the proof file pins; then two full journey runs on this tree become the landing baseline pair for every later compare.

Governing verdict: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/timing-2026-10-06/design-verdict.md` § Rulings 3 and § Units U3 (read both first; the verdict's line numbers were read at veneer `90b96bb`; re-locate every target by its text in `/home/user/.wave/veneer-containment`).

## Context

- Engine tip panels append to `document.body` (`src/browser/Tip.ts:203`); the static tooltip and popover specimens sit inside `main`, so a direct-child query of `body` sees only engine panels. The tip's `panel` getter (`Tip.ts:141-143`) names the bound panel; `phase` can read `hidden` while a panel stays connected (`:312-320`), and `hidden.bs.tooltip` fires while hover keeps the panel connected (`:322-324`): neither is the signal. The signal is the panel's disconnection.
- `parkShowcasePointer` (`tests/setupBrowser.ts:3256`) moves the pointer to a neutral spot; `COMPONENT_WAIT` (`:3200`) is the per-condition budget; `waitForCondition` comes from `@orkestrel/test/browser`.
- The base class names come from `CLASS_NAMES` in `tests/setupBrowser.ts`; never hard-code `tooltip` or `popover`.
- Host rule: every Chromium command runs through `flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/task75-u3-NAME --kind KIND --cwd /home/user/.wave/veneer-containment -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND`, a fresh NAME per run (a reused folder exits 65); a file or filtered run takes `--kind command`; a full journey takes `--kind journey` with `CAPTURE=0 ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/task75-u3-NAME/report.json` (absolute output path, equal to the folder's report path); never `cd`; no bash, PowerShell, or Python scripts; a Vite dependency-optimizer reload failing a test file's import before any test body (`Cannot read properties of undefined (reading 'config')`) gets exactly one re-run, recorded with both folders; the journey host-bound set is empty, so any journey failure is a failure to report.

## Scope

- **Change.**
  1. Export `readStrayTipPanels(panel: Element | undefined): readonly Element[]` from `tests/setupBrowser.ts`: the direct children of `document.body` whose class list carries the tooltip or popover base class from `CLASS_NAMES`, other than `panel`.
  2. In the preservation reader, after the panel binding and its expectations and before the signature collection (`collected`): `await parkShowcasePointer()` (moves Chromium's real pointer to −1, −1 through CDP, so no trigger stays hovered and the engine hides the hover tooltip), then `await waitForCondition('no engine tip panel outside the bound state remains', () => readStrayTipPanels(panel).length === 0, COMPONENT_WAIT)`. When the wait is exhausted, throw an `Error` whose message names each remaining stray's `id` and class list and whose `cause` is the wait's error.
  3. Never wait on `hidden.bs.tooltip`, `hidden.bs.popover`, or the `phase` getter.
- **Off-limits (must not change).** The `excluded` field, the summary's keys or their order, the theme and state loops, the scenario selection, `buildJourney`, `buildComponent`, any other row or Journal entry, every file under `src/`, `tmp/units/journey-cost/compare.ts`.

## Acceptance criteria

1. Format and lint on the three owned files exit 0 (`./node_modules/.bin/oxfmt --config .oxfmtrc.json --check FILE`, `./node_modules/.bin/oxlint --config .oxlintrc.json --deny-warnings FILE`, absolute paths, run from `/home/user/.wave/veneer-containment`).
2. `./node_modules/.bin/tsc --noEmit --project tsconfig.json` through the queue (`--kind command`, NAME `check`) exits 0.
3. A queued `--kind command` run of the `setup:browser` project filtered to `setupBrowser.test` passes, with a new case that plants a direct child of `body` carrying the tooltip base class and a tooltip specimen inside a `main` element, and reads the helper returning the planted child only (the owned panel passed in is omitted too).
4. Two queued full journey runs (`--kind journey`, NAMEs `journey-1` and `journey-2`) pass 94 of 94. The Orchestrator compares each against `/home/user/veneer/tmp/units/journey-cost/runs/completion-b4-journey` (expected: differences only on the 390 px tooltip preservation rows) and the second against the first (expected: exit 0). You report the four 390 px and 1280 px tooltip rows' `excluded` values of both runs; the expected stray-free value is 10763 at both widths.
5. `git status --porcelain` lists only the three owned files.

## Output

Final message: the diff of the three owned files; `git status --porcelain`; each gate's command, run folder, exit, and bare result line; the tooltip rows' `excluded` values of both full runs; every deviation (expected, found, evidence, done or not, one hypothesis). Stop and report when the wait times out in a full run (name the strays), when a journey title outside the host-bound set fails, or when an edit outside the owned files seems needed. No process diary.
