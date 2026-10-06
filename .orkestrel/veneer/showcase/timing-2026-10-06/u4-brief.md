# Unit task75-U4 — settle the modal bounce inside the refused act

## Role and engine

`astra` implementation unit on `gpt-6-astra` (effort high) through the Codex CLI. You are the sole writer in the checkout `/home/user/.wave/veneer-containment` (a detached veneer worktree at `bec0a38`, which carries unit U3; `node_modules` installed, `dist` built). Owned files: `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/src/browser/Modal.test.ts`. Commit nothing; the Orchestrator lands.

## Objective

Make the modal table's refused rows deterministic. A refused Escape or backdrop click on the static dialog runs the engine's bounce (`src/browser/Modal.ts`, the `#prevent` method: emit `hidePrevented`, write inline `overflow-y`, add `modal-static`, focus the host, wait a padded transition, remove `modal-static`, wait a second pad, restore `overflow-y`; the pad is 5 ms at `src/browser/helpers.ts:935-945`). The refusal observer (`tests/setupBrowser.ts`, `observeShowcaseStability`) watches for `readShowcaseWindow` plus one frame, 5 ms under reduced motion, so under load the class removal lands inside the observation and the row fails with `Refusal changed state: delayed class, ARIA, or connection mutation` (`jb2b-1`, `showcase statecharts > drives the 'modal' table through its controls with motion=false`). The act must settle the bounce before the observer starts, through a predicate the engine's own tests already use.

Governing verdict: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/timing-2026-10-06/design-verdict.md` § Rulings 2 and § Units U4 (read both first; line numbers there were read at veneer `90b96bb`; re-locate every target by its text in `/home/user/.wave/veneer-containment`).

## Context

- The engine's tests pin the settled state with inline predicates at `tests/src/browser/Modal.test.ts` (`:409-415` and `:464-470` at `90b96bb`): no `modal-static` class and no `overflow-y` in the `style` attribute. The static class name comes from `CLASS_NAMES` in `tests/setupBrowser.ts`; never hard-code it.
- `actOnOverlayControl` in `tests/setupBrowser.ts` treats `hidePrevented` as completion for a refused row (`:5164-5179` at `90b96bb`) and then calls `waitForAnimations(host)` (`:5180`). The offcanvas refusal writes no class (`src/browser/Offcanvas.ts:54-55`, `:68`), so the predicate holds at once for an offcanvas host.
- `guardShowcaseScenarios` (`tests/setupBrowser.ts:3584`) wraps the rows whose `from` equals `to` with the refusal observer. `readShowcaseWindow`, `REFUSAL_ATTRIBUTES`, and the observer's filter stay as they are.
- `COMPONENT_WAIT` (`:3200`) is the per-condition budget; `waitForCondition` comes from `@orkestrel/test/browser`; `stageMedia({ motion: false })` stages reduced motion.
- Host rule: every Chromium command runs through `flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/task75-u4-NAME --kind KIND --cwd /home/user/.wave/veneer-containment -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND`, a fresh NAME per run; a file or filtered run takes `--kind command`; a full journey takes `--kind journey` with `CAPTURE=0 ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/task75-u4-NAME/report.json`; never `cd`; no bash, PowerShell, or Python scripts; one re-run for a Vite optimizer import failure before any test body, recorded with both folders; the journey host-bound set is empty; the `src:browser` host-bound set is the six engine titles in `/home/user/veneer/tmp/units/journey-cost/host-bound.md`.

## Scope

- **Change.**
  1. Export `isModalSettled(element: Element): boolean` from `tests/setupBrowser.ts`: true when the element lacks the modal static class from `CLASS_NAMES` and its `style` attribute carries no `overflow-y`.
  2. Replace the two inline predicates in `tests/src/browser/Modal.test.ts` with `isModalSettled`.
  3. In `actOnOverlayControl`, when the row is refused, add `await waitForCondition('the modal bounce settles', () => isModalSettled(host), COMPONENT_WAIT)` after the `hidePrevented` completion and before the `waitForAnimations(host)` call. No branch on motion.
- **Off-limits (must not change).** `readShowcaseWindow`, `REFUSAL_ATTRIBUTES`, the observer's mutation filter, the order inside `observeShowcaseStability`, every file under `src/`, any row or Journal entry, `compare.ts`.

## Acceptance criteria

1. Format and lint on the three owned files exit 0; `tsc --noEmit --project tsconfig.json` through the queue exits 0.
2. New cases in `tests/setupBrowser.test.ts`, run through the queue as a filtered `setup:browser` file run: under `stageMedia({ motion: false })` on the mounted showcase's static dialog, one case for Escape and one for a backdrop click; each attaches a `MutationObserver` to the host before the input, records every mutation record until `isModalSettled(host)` holds, prints the record list (`console.info`, counts and attribute names) for the report, and asserts both the addition and the removal of the static class on the host. A third case drives the static-dialog Escape and backdrop rows through `guardShowcaseScenarios` and asserts `isModalSettled(host)` when the act returns.
3. A queued `src:browser` run filtered to `Modal.test.ts` fails on no title outside the host-bound set.
4. A queued full journey run (`--kind journey`) passes 94 of 94; the Orchestrator compares it against U3's baseline pair (expected: exit 0); the modal motion=false table passes.
5. `git status --porcelain` lists only the three owned files.

## Output

Final message: the diff of the owned files; `git status --porcelain`; each gate's command, folder, exit, and bare result line; the mutation record lists the two cases printed; every deviation (expected, found, evidence, done or not, one hypothesis). Stop and report when the bounce never settles within the budget (name the records observed), when a journey title fails, or when an edit outside the owned files seems needed. No process diary.
