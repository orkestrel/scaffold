# Unit U6 — successor brief 4: the audit round 2 fixes

## What changed and why

This brief supersedes `tmp/codex/u6-brief-3.md` for the remainder of the unit; every section of
`tmp/codex/u6-brief.md` stands except where this brief says otherwise. Round 2 (objective lane on
Opus, subjective lane on Astra, verifier) confirmed every claim: the hold ordering, the release
keying, the unnamed-axis carry-through, the discriminating motion proofs, the documentation
repairs, the control receipts, the suite hygiene, the bounded waits, every round-1 contract, and
the gates on both engines. It found the defects under § Execution. The verdict is
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u6-audit-verdict-2.md`; the lane
reports sit beside it under `units/`.

The through-line is one mechanism: a media override reaches `matchMedia` a variable number of
frames after the protocol command returns. A single frame wait is not a settle, in either
direction.

## Role and engine

Unchanged: `sol` on `gpt-6-astra` inside `codex exec --sandbox workspace-write` rooted at
`C:/Users/mikes/WebstormProjects/test`. Perform the assignment directly and spawn nothing. You
are the sole writer in this checkout.

## Context

**The tree.** `HEAD` is `f49bc7f`; the working tree carries the U6 edits over `guides/test.md`,
`src/browser/constants.ts`, `src/browser/helpers.ts`, `src/browser/types.ts`, `tests/setup.ts`,
`tests/src/browser/helpers.test.ts`. Build on it.

**The primitive.** `waitForCondition(check, options)` from `@src/core` (`src/core/helpers.ts:190`)
takes a `budget` (default 1000 ms) and an `interval` (default 10 ms) and throws
`Condition "<description>" did not hold within <budget>ms (waited <n>ms)`. It is already imported
in `src/browser/helpers.ts`.

**Host.** Unchanged: `npm.cmd run <name>`, `npx.cmd <bin>`, no network, no `git` write, managed
Chromium runs the browser project here.

## Scope

**Owned.** `src/browser/helpers.ts`, `tests/src/browser/helpers.test.ts`, `guides/test.md`.
**Off-limits.** Everything else.

## Execution

1. **`releaseMedia` settles (analyst 11, reviewer 11, 16).** After sending
   `{ media: '', features: [] }`, wait for the engine's own readings to return rather than for one
   frame: read the three axes the stage carries (`print`, `prefers-reduced-motion`,
   `prefers-color-scheme`, `forced-colors`) before sending, and `waitForCondition` until
   `matchMedia('print').matches` is false and each feature reading equals what the engine reports
   with no emulation. You cannot know the engine's own values while an override is in place, so
   take the simpler settle: wait until `matchMedia('print').matches` is false and the readings
   stop changing across two consecutive polls, and refuse with
   `Media emulation did not clear from the tester` when the budget expires. Update the description
   paragraph, the guide `Summary` cell, the `Bounds` bullet, and the Patterns fence so each says
   what the helper now does, and make the fence open with `await releaseMedia()` before it records
   the engine's own preference (finding 16). Prove it: a case that stages, releases, and reads
   every axis on the line after the release with no wait of its own.
2. **`stageMedia` waits and does not clear on refusal (reviewer 12, 13).** Replace the single
   read-back with a bounded `waitForCondition` per staged query, keeping
   `Media emulation did not reach the tester: <query>` as the exhaustion voice. On that refusal do
   not call `releaseMedia`: re-send the effective features the call computed before it staged, so
   the tester returns to its pre-call state with the provider's overrides intact, then throw.
   Prove the refusal path leaves a provider-staged override in place: stage an override through
   `sendProtocol`, force a refusal (stage a query the engine cannot satisfy, or plant the
   refusal's condition), and read the override back.
3. **Axis cases stage the inverse (reviewer 14).** In the colour-scheme and forced-colors cases,
   record the host reading first, stage its inverse through `sendProtocol`
   (`dark ? 'light' : 'dark'`, `forced ? 'none' : 'active'`), assert the staged inverse arrived
   before calling `stageMedia`, then assert it survives the motion-only stage and returns to the
   recorded value after the release.
4. **`releasePointer` keeps the marker until the send resolves (reviewer 15).** Remove the
   attribute after the `mouseReleased` send resolves, in a `finally`, so a failed send leaves the
   marker for the next `afterEach` to retry. Keep the idle path silent and the unconditional
   `mouseMoved` to the origin. Add a case proving a release whose send rejects leaves the marker
   in place (drive it through a `sendProtocol` failure you can cause without a plant, or state in
   the report why that case cannot be driven and what you proved instead).
5. **`stageMedia` remarks (reviewer 17).** Narrow "Omitted axes stay unchanged" to name the axes
   the call carries (the print medium, reduced motion, colour scheme, forced colours) and to say
   that any other emulated feature the provider configured is cleared, matching the enumerated
   form already in the guide's `Bounds`.
6. **Gates.** `npx.cmd oxfmt --config .oxfmtrc.json --write` on the three owned files; then
   `npm.cmd run format:check`, `lint:check`, `check`, `build`, `test:src`, `test:policy`,
   `test:config`, `test:setup`, `test:guides`; record each command's final lines. Run
   `npm.cmd run test:src:browser` twice in a row and record both readings, so a settle that
   depends on machine load shows up as a difference.

## Output

Write `tmp/codex/u6-report-4.md` and return its content: the diff summary per owned file; the
readings your settle takes (how many polls each axis needed, recorded from a run); the new cases
and what each proves; each gate command's exit code and final lines, with both browser-project
runs; and every deviation with expected, found, exact evidence, done or not done, and at most one
hypothesis. Do not restate the earlier reports.

## Deviation contract

Stop and report on: a gate red after your own fix inside owned files; a need to edit an off-limits
file; an axis whose emulated value the engine refuses to report (name the axis and the reading).
Decide, record, and carry on from: the settle's poll shape, assertion wording, case order, and
TSDoc wording within the meaning this brief fixes.

## Acceptance criteria

1. A case reads every media axis on the line after `await releaseMedia()` with no wait of its own
   and passes.
2. A case proves a `stageMedia` refusal leaves a provider-staged override in place, or the report
   names why it cannot be driven and what stands instead.
3. The colour-scheme and forced-colors cases stage the inverse of the recorded host reading.
4. `format:check`, `lint:check`, `check`, `build`, `test:src`, `test:policy`, `test:config`,
   `test:setup`, `test:guides` exit 0, and both `test:src:browser` runs exit 0.
5. `git status --porcelain` lists the six U6 files and nothing else.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report; the two browser-run logs.
