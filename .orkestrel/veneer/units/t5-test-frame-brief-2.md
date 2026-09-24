# Unit T5 round 2 — TEST-FRAME: an element frame keeps the declared pane's geometry and hands everything back

Successor to `t5-test-frame-brief.md`, which stays in force for every section this brief does not restate. What
changed: the round-1 audit (`t5-audit-verdict.md`) broke claims 3, 4, 7, and 8, and the Orchestrator reproduced the
reviewer's R1: staging an element frame to its own bottom edge still resolves `vh` lengths against a taller pane for an
in-flow element below the fold.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent. Perform the assignment directly in `/home/user/test-tf` and spawn
nothing.

## Objective

Make an element frame no taller than the declared pane shoot at the declared pane's geometry, whatever the element's
position, and make `captureFrame` hand back the tester's scroll and the runner page exactly as it found them.

## Context

**Evidence.** The round-1 change is uncommitted in `/home/user/test-tf` over `80c419e` (`t5.diff`). Read these, all
under `/home/user/scaffold/.orkestrel/veneer/units/`:

- `t5-audit-verdict.md`, the reconciliation and the carried findings;
- `t5-audit-objective-verdict.md`, `t5-audit-subjective-verdict.md`, and `t5-audit-checker-verdict.md`, the three lanes;
- `t5-instruments/t5-r1-probe.log.txt`, the Orchestrator's R1 run. A `zzprobe` block appended to
  `tests/src/browser/helpers.test.ts` built `<div style="height: SPACERpx">` then `<div class="probe">` with
  `height: SHAREvh`, scrolled the tester to 300, and captured the probe at 390x844:

  ```text
  ZZPROBE 50vh: height=900 floor=rgb(0, 0, 255) declared=422 scrollAfter=0
  ZZPROBE 30vh: refused: ... never settled after 4 restagings: 1295 over a 1314 pane declared=253 scrollAfter=0
  ZZPROBE 30vh-1000: refused: ... never settled after 4 restagings: 1440 over a 1464 pane declared=253 scrollAfter=0
  ```

Your round-1 unknowns still hold: the provider shoots an element that fits the runner's window only where that window
shows it, and a fixed element that starts past the window's height is culled unless the tester is composited.

**Law, installed primitives, host, standing conditions.** As in `t5-test-frame-brief.md`. Write every log this round
produces under `/home/user/test-tf/tmp/units/`, never under a directory outside the checkout.

**Control identifiers.** `T5-FIT`, `T5-BACK`, `T5-SCOPE`. Keep them inside this brief; name tests for what they prove.

## Unknowns

- Whether scrolling the tester's own document brings an in-flow element into the declared pane before the shot, so the
  pane need not grow. Settle it with a run before choosing the mechanism, and report the reading.

## Scope

As in `t5-test-frame-brief.md`: owned `src/browser/helpers.ts`, `src/browser/types.ts` and `src/browser/constants.ts`
only if the contract needs it, `tests/src/browser/helpers.test.ts`, and `guides/test.md`. Everything else is off-limits.

## Execution

Perform the assignment directly and spawn nothing. Insert each failing proof before its fix, and record its red and
green runs in logs under `tmp/units/`.

1. `T5-FIT` (R1). An element frame whose element is no taller than the declared pane is shot with the pane at the
   declared height, so every viewport-relative length resolves against the declared height, whether the element is
   in flow above the fold, in flow below it, or fixed. Grow the pane only for an element taller than the declared pane,
   and state that case's geometry. Proofs:
   - a `50vh` in-flow element under a 900-pixel spacer reads 422 rows on its own color;
   - a `30vh` in-flow element under a 900-pixel spacer and under a 1000-pixel spacer each reads 254 rows and is not
     refused;
   - the round-1 fixed-panel and below-pane proofs stay green.
2. `T5-BACK` (claims 4 and 7). Save the tester's scroll before the capture moves it and restore it on every path,
   refusals included. Remove the offset and the compositing hint as soon as the screenshot settles, before the file
   verification. Prove the scroll comes back on the passing path and on a refusal path.
3. `T5-SCOPE` (claim 3, F2). The offset moves only the calling tester's frame, and anything it sets to find that frame is
   removed on every path. Place it beside the `stagePane` and `releasePane` functions or state, where it is written,
   that it overrides the placement `stagePane` makes and depends on that placement's fixed position. Prove that another
   tester frame in the runner page does not move during the shot, with a proof that reddens when the offset is widened
   to every tester frame.
4. R2. Make the fixed-panel proof place the panel's top past the runner's window on any host, reading the window as the
   below-pane proof does, so the offset and compositing mutations redden it everywhere.
5. Prose (claim 8, F1). Give the offset its own word, distinct from the lift `stagePane` makes. Follow every code token
   with its noun and never possessivize one. Limit the geometry sentences to what ships. Update the `@throws` for the
   element frame's refusal. Make "What the capture borrows it gives back" true. Keep prose short.

## Output

Write `tmp/units/t5-report-2.md` and return the same text: the unknown's reading; each change by symbol; each proof's
red and green command and count with its log path; for each proof, the mutation that reddens it and whether its
assertions distinguish it; the gate table with log paths; `tmp/units/t5-2.diff` (the whole change over `80c419e`) and
`tmp/units/t5-2-status.txt`.

## Deviation contract

As in `t5-test-frame-brief.md`. Settle the mechanism's shape and names yourself. Stop and report if an element no taller
than the declared pane cannot be shot at the declared geometry by any mechanism you can run.

## Acceptance criteria

1. The formatter check over the owned files, `npm run lint:check`, and `npm run check` exit 0.
2. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser
   tests/src/browser/helpers.test.ts` exits 0.
3. `npm run test:src:browser` exits 0, as an observation with its own reading.
4. Each new proof ran red on the round-1 code or on the base, with the run logged.
5. `npm run test:guides` needs a built `dist/`, which you may not build; the Orchestrator runs it after you exit.

## Review evidence

The Orchestrator supplies `t5-2.diff`, `t5-2-status.txt`, the report, and the logs to the round-2 lanes.
