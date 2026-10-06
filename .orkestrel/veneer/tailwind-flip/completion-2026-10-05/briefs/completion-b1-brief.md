# Unit completion-b1 — Journey observer repair

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with `--sandbox danger-full-access` in the checkout `/home/user/.wave/veneer-containment` at `96065a7` (both named by the Orchestrator in the launch message; `96065a7` descends from veneer `7e2792b` and carries the landed containment unit). Executor: BENCH_ENGINE. You are the sole writer in `/home/user/.wave/veneer-containment`.

## Objective

Remove the two host-bound journey failures from the host-bound set by repairing their observers, never by loosening an assertion, raising a wait, or skipping a case: (1) the disclosure observer's `{Enter}{Enter}` burst count in `actOnDisclosureControl`, which fails the `'accordion'` table at light-390 (and, sharing the observer, the `'collapse'` and `'navbar-390'` tables at dark-390), and the refusal recorder in `observeShowcaseStability`, which fails the `'tooltip'` table with motion=true at dark-390; (2) J8's toast read, which reads the region while `.toast.showing` still holds `opacity: 0`.

## Context

- **Definition.** `/home/user/scaffold/.orkestrel/veneer/tailwind-flip/completion-2026-10-05/re-triage.md:236-247` (unit B1); `/home/user/scaffold/.orkestrel/veneer/tailwind-flip/units/flip-journeys/seventh-diagnosis.md:12-16` (the diagnosis table); `/home/user/scaffold/.orkestrel/veneer/lanes.md` § Host-bound set (heading at line 59; the `journey` bullet at line 66) and the same bullet in `/home/user/veneer/tmp/units/journey-cost/host-bound.md`.
- **Current failures, quoted from `failureMessages`** (read with `node -e` over each `report.json`):
  - `/home/user/veneer/tmp/units/journey-cost/runs/land4d-journey-1/report.json` (92 tests, 2 failed): `showcase journeys J8 drives the engine through the component sections and opens nothing on arrival`: `Error: Named region "Uploads" is not visible` at `readPerception` (from `@orkestrel/test-browser`); `showcase statecharts drives the 'accordion' table through its controls with motion=false`: `AssertionError: Cancelling a plan through Adding seats {Enter}{Enter}: Condition "Adding seats completes {Enter}{Enter}" did not hold within 5000ms (waited 5021.800000000745ms): expected [ Array(1) ] to deeply equal []`.
  - `/home/user/veneer/tmp/units/journey-cost/runs/accept4-journey-1/report.json` (2 failed): accordion motion=false: `Shipping and delivery through Shipping and delivery {Enter}{Enter}: Condition "Shipping and delivery completes {Enter}{Enter}" did not hold within 5000ms (waited 5003.5ms)`, `Returns and exchanges through Returns and exchanges {Enter}{Enter}: ... (waited 5009.400000002235ms)`, `none through Billing cycle {Enter}{Enter}: ... (waited 5001.60000000149ms)`; tooltip motion=true: `AssertionError: Hint to the left through {Escape}: Refusal emitted a delayed lifecycle event: expected [ Array(1) ] to deeply equal []`.
  - `/home/user/veneer/tmp/units/journey-cost/runs/accept4-journey-2/report.json` (3 failed): J8 `Named region "Uploads" is not visible`; accordion `Billing cycle through Cancelling a plan {Enter}{Enter}: Condition "Cancelling a plan completes {Enter}{Enter}" did not hold within 5000ms (waited 5009.400000002235ms)`; tooltip `Hint to the left through {Escape}: Refusal emitted a delayed lifecycle event`. The tooltip title fails in both accept4 runs.
- **Seventh diagnosis (causes as recorded).** Accordion: real events on the seats panel show, shown, hide, hidden all complete within 49.5 ms with both Enter activations delivered, yet the observer times out; the observer infers an accepted click from the panel's `collapsing` class in a trigger capture listener, but the engine dispatches synchronously in document capture and sets `collapsing` before the trigger listener runs, so the observer undercounts accepted clicks. Tooltip: `observeShowcaseStability` records every tooltip lifecycle event on `document` without filtering to its roots; a sibling (`Hint to the right`) mouseover produced show/hide/hidden inside the window. Collapse at dark-390: the focused instrumented table passes; the failing burst was never captured, so its cause is undetermined. J8: `#toasts-live-toast.toast.fade.show.showing` is on-screen with opacity `0` because `.toast.showing { opacity: 0; }` wins; an early read during showing.
- **Code, as of `7e2792b`** (read with `grep -n` and `sed -n` on the tree at `/home/user/veneer`, HEAD `7e2792b`, branch `ccr-d15a48b1-yyyll6`; lines move after the containment landing, so locate by name):
  - `/home/user/veneer/tests/setupBrowser.ts` (edit the copy in /home/user/.wave/veneer-containment): `observeShowcaseStability` at line 3206 (as of `7e2792b`); its `document.addEventListener(name, recorder.handler, { capture: true, ... })` over the `.bs.${family}` lifecycle names at line 3229 (as of `7e2792b`) — the unfiltered refusal recorder; the throw `Refusal emitted a delayed lifecycle event` at line 3238 (as of `7e2792b`).
  - `/home/user/veneer/tests/setupBrowser.ts` (edit the copy in /home/user/.wave/veneer-containment): `actOnDisclosureControl` at line 3644 (as of `7e2792b`); the trigger capture listener `inputs.handler(!panel.classList.contains('collapsing'))` at line 3661 (as of `7e2792b`); the `waitForCondition(\`${context.control} completes ${event}\`, ...)` at line 3680 (as of `7e2792b`); `disclosureBursts` (`WeakMap<ComponentSpecimen, number>`) at line 3357 (as of `7e2792b`); `arrangeDisclosureVisibility` calls it at lines 3635 and 3639 (as of `7e2792b`); the scenario tables reference it at lines 3726, 3821, 5265 (as of `7e2792b`).
  - `/home/user/veneer/tests/app/browser/integration.test.ts` (edit the copy in /home/user/.wave/veneer-containment): J8 title at line 523 (as of `7e2792b`); the toast read `clickAccessible('button', 'Show the upload toast')`, `waitForPaint()`, `waitForText('the upload toast shows', () => readPerception('Uploads'), ...)` at lines 624-629 (as of `7e2792b`); `observeShowcaseStability` imported at line 82 and called at line 758 (as of `7e2792b`).
- **J-B0 baselines.** `/home/user/veneer/tmp/units/journey-cost/runs/jb0-1/report.json` (4 failed, 86 passed) and `/home/user/veneer/tmp/units/journey-cost/runs/jb0-2/report.json` (3 failed, 87 passed); the Orchestrator compares your runs' rows against them.
- **Law.** `/home/user/scaffold/AGENTS.md` (its non-negotiables bind); `/home/user/scaffold/.claude/rules/tests.md`, `/home/user/scaffold/.claude/rules/typescript.md`, `/home/user/scaffold/.claude/rules/names.md`, `/home/user/scaffold/.claude/rules/writing.md` (TSDoc and comments); the `orkestrel-journey` skill (`/home/user/scaffold/.agents/skills/orkestrel-journey/SKILL.md`) for a journey case's shape.
- **Installed primitives.** `@orkestrel/test-browser` (`readPerception`, `isRendered`, `pressKeys`, `readStyle`, and the rest imported at the head of `/home/user/veneer/tests/setupBrowser.ts` (edit the copy in /home/user/.wave/veneer-containment)) and `@orkestrel/test`; read their exports before writing a helper. A local helper whose job an installed export does is a defect.
- **Host and queue.** Linux, Chromium 141 at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`, Node with type stripping. Every Chromium or CPU-loading command runs through the host queue `flock -w 1800 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/completion-b1-NAME --kind command --cwd /home/user/.wave/veneer-containment -- COMMAND` with npm 11 first on PATH inside the command (`env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH`); a reused folder exits 65, so each NAME is fresh; the journey suite runs as `env CAPTURE=0 ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=FOLDER/report.json` with `--kind journey`; never `cd`; no shell, PowerShell, or Python scripts (tooling in Node `.ts`); a suite whose test file fails to import on a Vite dependency optimization reload before any test body (`Cannot read properties of undefined (reading 'config')`) gets exactly one re-run, recorded with both folders; the only failures a gate may carry are titles in `/home/user/veneer/tmp/units/journey-cost/host-bound.md`, and this unit's objective is to remove the two journey titles from that set by repairing the observers, never by loosening an assertion or skipping a case.
- **Sandbox.** A nested `git` may report `not a git repository` while your own `git status` works; do not diagnose the checkout. If a write is rejected, stop and report; never try another write mechanism.
- **Standing conditions.** The containment unit has landed in `96065a7`: it adds instruments (`collectOverflows`) to `/home/user/veneer/tests/setupBrowser.ts` (edit the copy in /home/user/.wave/veneer-containment), two journey cases to `/home/user/veneer/tests/app/browser/integration.test.ts` (edit the copy in /home/user/.wave/veneer-containment), a Showcase case, and a section case (`/home/user/scaffold/tmp/codex/containment-proofs-brief.md` § Proofs). Leave those untouched. Run `npm run build` (through the queue) before any journey run, because the page reads `/home/user/veneer/dist/src/bootstrap/index.css` (in /home/user/.wave/veneer-containment, rebuilt).

## Unknowns

- The cause of the dark-390 `'collapse'` motion=false burst failure: never captured. Capture it first (Scope step 1) and report whether it is the same `collapsing`-before-listener undercount; if it is a different cause, stop and report.
- The origin of the incidental pointer crossing onto `Hint to the right` in the tooltip table: report what the trace shows; the repair is the root filter, not the pointer.
- Whether the J8 read should wait for `.showing` to clear or for the shown lifecycle event: settle it from the engine's toast lifecycle and record the reason.

## Scope

- **Steps.**
  1. Capture a failing collapse trace before any repair: input events, `.bs.collapse` lifecycle events, and the panel's class list over time, for the failing `{Enter}{Enter}` row, through the queue (iterate with `--project 'journey:dark-390*' -t PATTERN`, or the full suite if only load reproduces it). Save it under the unit folder (UNIT_FOLDER = /home/user/veneer/tmp/units/completion-b1, created by you).
  2. Repair the Enter-burst count in `actOnDisclosureControl` so an accepted activation is read from the engine's own ordering, not from `collapsing` seen after dispatch.
  3. Filter the refusal recorder in `observeShowcaseStability` to events whose target lies within `roots`.
  4. Repair J8's toast read so it reads the region after `.toast.showing` resolves, keeping the asserted text.
  5. Two full runs: two queued `test:journey` runs (`--kind journey`, fresh folders `completion-b1-journey-1` and `completion-b1-journey-2`) whose rows the Orchestrator compares against the J-B0 baselines.
- **Owned.** In `/home/user/.wave/veneer-containment`: the engine section of `/home/user/veneer/tests/setupBrowser.ts` (edit the copy in /home/user/.wave/veneer-containment) (`actOnDisclosureControl`, `observeShowcaseStability`, and the refusal recorder's root filter); the J8 toast read in `/home/user/veneer/tests/app/browser/integration.test.ts` (edit the copy in /home/user/.wave/veneer-containment). `/home/user/veneer/tests/setupBrowser.test.ts` for the proofs of the instruments you change (edit the copy in /home/user/.wave/veneer-containment), with a control from outside the population for each.
- **Shared (report-only).** `/home/user/scaffold/.orkestrel/veneer/lanes.md:59` (§ Host-bound set, journey bullet at line 66) and `/home/user/veneer/tmp/units/journey-cost/host-bound.md`: the Orchestrator edits them after two full passing runs; return the exact proposed patch.
- **Off-limits.** `src/**`, `app/**`, every other test file (`tests/setupBrowser.test.ts` is owned), `guides/**`, `ROADMAP.md`, the containment unit's additions, `package.json`, lockfiles, configs.
- **Made false by this change.** The host-bound journey bullet's titles for accordion, tooltip, collapse, navbar-390, and J8, once the two full runs pass; derived from the two runs' reports.
- **Tools and limits.** Read freely; write only owned files and the unit folder (UNIT_FOLDER = /home/user/veneer/tmp/units/completion-b1, created by you) and the queue's run folders. No installs, commits, pushes, credential reads, destructive commands, shared-file edits, or tree-wide mutating gates (`npm run format`, `npm run lint` with `--fix` over the tree); format owned files only. Scoped validation only.

## Execution

Perform the assignment yourself and spawn nothing.

## Output

Report file the file report.md in the unit folder: the collapse trace's finding with its folder; each repair and the cause it answers; every queued command with its folder and exit; the two journey runs' failed titles; the proposed patch for the Shared files; `git diff` saved as candidate.patch in the unit folder and `git status --porcelain`. Your final message is that report. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when the collapse trace shows a cause other than the observer, when a repair would require editing `src/**` or loosening an assertion or wait, when a failure outside `host-bound.md` appears, or when an installed primitive's semantics differ from this brief. Settle naming, comment wording, and the J8 wait signal yourself and record them.

## Acceptance criteria

1. Through the queue: `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. Through the queue: `npm run test:setup:browser` exit 0 (scoped to the setup project).
3. Through the queue: the failing collapse trace exists (step 1) before the first repair edit.
4. Through the queue: the focused tables pass: `--project 'journey:light-390*' -t "accordion"`, `--project 'journey:dark-390*' -t "tooltip|collapse|navbar-390"`, and `--project 'journey:light-390*' -t "J8"`.

**Observations, not criteria.** The two full `test:journey` runs (`completion-b1-journey-1`, `-2`): failed titles, counts, and wall time; the Orchestrator reads them against `jb0-1` and `jb0-2` and decides the host-bound set edit.

**Measurement.** The 390 px variants under the full three-face journey load; readings through the queue, never beside another Chromium run.

## Review evidence

The diff, `git status --porcelain`, the collapse trace, and the two journey reports.
