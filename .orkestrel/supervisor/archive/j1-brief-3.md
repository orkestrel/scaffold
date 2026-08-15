# J1 second fix round — the phase driver and the convergent autofocus

Successor to `j1-brief-2.md`. Carries the closing confirm's two BROKEN items
(`j1-confirm-verdict.md`, Orchestrator-verified in source): (2) both seeding calls remain
lexically inside their `driveApplication` journey callbacks and the `enter`/`observe` locals are
prohibited nested declarations; (3) `completeJourneyLogin`'s autofocus check is one-shot — a
late autofocus between the check and the first Tab makes that Tab skip past the username.
Items 1, 4, 5 are CONFIRMED and closed (resolver repairs, component corrections, the removed
test's coverage).

## Role and engine

`builder`. Sole serial writer in `/workspace/supervisor` from clean committed baseline
**4ba9e7d**. Perform directly, spawn nothing, no commits/pushes/installs.

## The changes

1. **`tests/app/browser/integration/setup.ts` — `driveApplication` becomes a phase driver.**
   Change its signature to accept one or more phase callbacks executed in order over ONE
   retained browser/context/page (`driveApplication(seam, ...phases)`), with the same
   leak-safe nested-finally teardown it has now. Every existing single-callback consumer
   (`integration.test.ts`, the refusal probe) keeps working unchanged — variadic with one
   argument is the current behavior. Update the TSDoc: journey phases and declared fixture
   phases are both direct anonymous arguments at the test level; a fixture phase is where
   transport-class calls (`startApplicationWorkflow` etc.) are admissible; a journey phase
   holds only the resolver and journey-class helpers. The boundary sentence from the prior
   round stays and becomes true.
2. **`tests/app/browser/integration/journey.test.ts` — the rail journeys restructure onto the
   driver.** Each becomes `await driveApplication(seam, <journey phase: goto + completeJourneyLogin>,
   <fixture phase: seed the workflow, assert 202>, <journey phase: observe and open>)` — three
   direct anonymous callbacks, no named locals inside any callback, no nested function
   declarations anywhere in the file, no transport call inside a journey phase. What each
   journey proves is unchanged (the run ARRIVES while logged in; the row is pressed by pointer
   in one, reached by bounded real Tabs in the other).
3. **`tests/app/browser/integration/setup.ts` — `completeJourneyLogin` converges on focus.**
   Replace the one-shot autofocus read with a bounded convergence poll on
   `hasJourneyFocus(username)` (the file's `expect.poll` idiom or an equivalent bounded loop);
   only after the poll's bound expires without focus does the Tab-from-start fallback run. No
   interleaving may leave the first Tab running from an already-focused username.

## Scope

**Owned:** `tests/app/browser/integration/setup.ts`,
`tests/app/browser/integration/journey.test.ts`, and `tests/app/browser/integration/integration.test.ts`
ONLY if the driver's signature change requires a call-site touch (measure first — variadic
should not). Everything else off-limits. Forbidden: the standing list; no assertion weakening;
no new capabilities beyond the named changes.

## Acceptance criteria

1. No function declaration or function-assignment local inside any test callback in
   `journey.test.ts`; no `startApplicationWorkflow` call inside a journey phase (it appears
   only in fixture-phase arguments).
2. `completeJourneyLogin` polls focus to a bound before any Tab fallback.
3. `npm run build:app` then `npm run test:app:browser:integration` green (10 tests).
4. Static gates green (`format:check`, `lint:check`, `check`).

## Output

The diff; per-criterion proofs with commands and tails; `git status --porcelain`; deviations or
none.
