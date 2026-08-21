# Design round 2 — reconciliation, 2026-08-21

Lanes: subjective (planner report, preserved below as `design2-subjective-report.md`), objective
(`design2-objective-report.md`, thread in `tmp/codex/design2-objective.jsonl`). Rulings follow;
each divergence names the lane it takes from and why. Both lanes excluded the same large sets
(Vue-coupled helpers; the find/press family; `@orkestrel/process`-owned process wrappers;
supervisor-policy setup modules) — those exclusions are adopted without restatement.

## Family 1 — wait and retry (with subject E)

- `waitForCondition(description, condition, options?)` — description-first (subjective lane: it
  is half the contract and reads like the test framework's own idiom; it also matches
  `retryUntil` so the family presents one shape). Condition type
  `() => boolean | Promise<boolean>`. Rejection message
  `Condition "<description>" did not hold within <budget>ms (waited <elapsed>ms)`; an aborted
  wait rejects with the signal's reason. Immediate first read; a true reading during the final
  interval still passes; budget measured with `performance.now()`; defaults 1000/10; budget and
  interval validated finite and non-negative, zero budget permits the immediate read (objective
  lane's precision). Core placement.
- The shared options type is `WaitOptions` (objective lane's name — the three wait helpers share
  it, so it is not one helper's option bag) with members `{ budget?, interval?, signal? }`
  (subjective lane: `budget` is the vocabulary `.claude/rules/tests.md` itself uses; `signal`
  has named real consumers in supervisor's waiters).
- `retryUntil(description, produce, satisfied, options?)` with
  `RetryOptions extends WaitOptions { attempts? }` — the subjective lane's merged bounds:
  whichever of budget or attempts trips first ends the retry; attempts omitted means the budget
  alone bounds it. A throw from `produce` is an unsatisfied attempt whose last error becomes the
  rejection's `cause`; a throw from `satisfied` propagates (the predicate is broken). The
  objective lane's attempts-only shape loses because a hanging producer never terminates under
  it.
- `waitForEvent(subscribe, description, options?)` — the objective lane's subscriber-callback
  shape: `EventSubscriber<TArgs> = (listener: (...args: TArgs) => void) => (() => void) | void`,
  with the optional cleanup invoked on timeout. It dodges the structural-assignability risk the
  subjective lane's `OnceInterface` carried and gives timeout cleanup a seam. Description
  required.
- `waitForRecorder`, `waitForApplicationStderr`, `waitForApplicationResponse`,
  `waitForApplicationProcess`, `waitForBrowserState` — collapse or exclude, both lanes.
- `destroyScratch(scratch, options?)` — ADOPTED (objective lane), server helpers, defaults
  10000/25, retries `scratch.destroy()` with `performance.now()`, last host error as `cause`.
  A named helper beats a repeated `retryUntil` incantation for a defect class (Windows
  handle-release) that supervisor, scaffold, and probe all meet. `ScratchInterface.destroy`
  stays synchronous.
- The guide's Limits row excluding condition polling is struck and replaced with the distinction
  both lanes drew: the no-polling law governs a product's idle wakeup; a test instrument waiting
  on a foreign process has no event to park on, and where an event exists `waitForEvent` is the
  door.

## Family 2 — process and JSON Lines

- `isRunning(pid)` (subjective lane's name: a boolean reads as an assertion about its subject)
  in server helpers, with the Linux zombie branch kept and its unproven-here status recorded in
  the file's own comment idiom.
- `decodeJSONLines(text)` (objective lane's name: `parse*` is contractually `T | undefined` and
  this throws; `read*` is the fact-off-a-node verb) in core helpers; a malformed line rejects
  with an error naming the line number and carrying the native `SyntaxError` as `cause`
  (merging the subjective lane's message with the objective lane's fidelity).
- `waitForSocketClose(socket, options?)` in server helpers; tolerates only `ECONNRESET`;
  bounded by `WaitOptions`.
- Everything else in the family excluded on `@orkestrel/process` ownership (both lanes).

## Family 3 — accessibility

- The subjective lane's verb table governs: `readRole`, `readName`, `readStates`, `readText`
  (from `collapseText`), `describeTree`, `describeFocus`, `isRendered` — `resolve*` in this
  package returns elements, `read*` returns facts.
- `isReachable` extraction FIRST (subjective lane's U4): one predicate replaces the measured
  near-duplicate reachability filters inside the published layer, with per-helper before/after
  acceptance and every Voices message still thrown by the same helper. `readPerception` is left
  alone where unification would change what it accepts.
- Constants: `IMPLICIT_ROLES` (membership documented as contract; Chromium comparison in
  acceptance — both lanes), `HEADER_ROLES`, `FIELD_ROLES` (renames — they are role maps),
  `CONTENT_ROLES`, `FOCUSABLE_SELECTOR`.
- `describeSurface` EXCLUDED (subjective lane): its digest format is one workspace's policy,
  and under these rulings it would also depend on the excluded `extractControls`.
- `extractControls` EXCLUDED (its generalized form is a thin query wrapper the wrapper test
  kills). `extractOrphans` ADOPTED in the objective lane's parameterized form
  `(root, child, parent)` — class-ancestry orphan detection is mechanism once the Bootstrap
  names become parameters.
- `resolveText` EXCLUDED (subjective lane): the guide's contract that no browser helper takes a
  selector for its target wins over the salvage.

## Family 4 — visual measurement

- Type `Color` (plain English over `Tint`), constant `CANVAS_COLOR`, helpers `parseColor`
  (`undefined` on unsupported syntax — both lanes), `blendColor`, `readBackdrop(element, floor)`
  with the floor REQUIRED (subjective lane: the leaf never guesses a canvas),
  `measureLuminance`, `measureContrast`.
- `contrast(element, floor?)` — one export; omitted floor keeps today's strict refusal exactly;
  supplied floor composites (both lanes converged on the shape; parameter named `floor` for the
  role, not one instance).
- `readRing(control, worn?)` — measure-only, no acting inside (subjective lane; the published
  contract forbids helpers acting on handed elements), `undefined` when not `:focus-visible`;
  the implementing unit may make it frame-aware if measurement needs it and records the choice.
- Supervisor's visual `readFocus`, `Reading`, `STATUS_PALETTE` excluded (both lanes).

## Family 5 — pane and capture

- The objective lane's export shape: `stagePane(width, height)`, `releasePane()`,
  `captureFrame(options: FrameOptions)` (returns the verified written path; byte readback;
  release in `finally`), constant `CAPTURE_PANE`; `createPortfolio.place` delegates its enabled
  write to `captureFrame` and gains the optional element. The subjective lane's fold-into-place
  loses to the user's pull-in-all ruling and to supervisor's real non-portfolio call sites; the
  consolidation is preserved by the delegation.
- Pre-dispatch measurement owed: whether `commands.readFile` resolves from `vitest/browser`
  without consumer registration — the implementing unit takes it FIRST and stops on a refusal.
- The Vitest-runner-internal dependency is documented as contract with the pinned version (both
  lanes' risk rows).

## Family 6 — DOM

- `clearStorage()` (subjective lane's name; module helper `{verb}{Noun}`; `clear` is the fixed
  verb) adopted. Everything else excluded (both lanes where they agreed;
  `recordArrival`/`driveArrival` excluded — under these rulings their journal+surface coupling
  is gone and each is a short call site; no `render` widening lands because nothing adopted
  needs it).

## Family 7 — journal

- `createJournal(): JournalInterface` in browser factories (the package's `createRecorder`
  precedent), `JournalStep` in browser types. Verbs `start`/`stop` per the fixed lifecycle
  vocabulary (`start` clears and arms — "begin or restart"; `stop` hands the console back).
  `steps`/`output` return snapshots; the console channels stay a private detail; no singleton.
  Forwards every console call to the real channel and swallows nothing — contract line.

## Family 8 — cookies

- Server placement (objective lane: browser fetch cannot observe `Set-Cookie`, so core
  placement would advertise a capability that cannot work there), factory shape
  `createCookieJar(): CookieJarInterface` in server factories (fleet style), interface in
  server types with `header` getter, `read(name)` (the scratch `read` precedent; no synonym
  drift), `capture(response)`. The guide states the name-only controlled-fixture boundary.

## Families 9-10

- Vue-coupled: all excluded (both lanes). Scratch destroy retry: `destroyScratch` (family 1).

## Implementation units (H wave), serialized in the test checkout after A2/A3

| Unit | Owns | Role/engine |
| --- | --- | --- |
| H-core | `src/core/types.ts`, `src/core/helpers.ts`, `tests/src/core/helpers.test.ts`, own guide rows | `sol` (bench — Node-only proofs; A1's exec demonstrated Vitest runs there) |
| H-server | `src/server/types.ts`, `src/server/helpers.ts`, `src/server/factories.ts`, matching tests, own guide rows | Opus `implementer` (native — socket proofs bind loopback, which the bench sandbox denies) |
| H-browser-1 | `isReachable` consolidation + a11y layer: browser types/constants/helpers + tests, own guide rows | Opus `implementer` (native — browser project spawns Playwright, a grandchild the bench denies) |
| H-browser-2 | visual + capture + journal + `clearStorage`: browser types/constants/helpers/factories + tests, own guide rows | Opus `implementer` (native) |
| H-guide | `guides/test.md` narrative, Contract, Limits, count deletions; fence transcriptions in `tests/guides.test.ts` | Opus `implementer` (native) |

Each implementing unit is granted its own Surface/Voices/Tests guide rows (the parity bijection
makes a rowless export unable to reach green); H-guide owns every narrative edit. Audits: Sol
audits every Opus-written unit; Opus `reviewer` audits H-core.

## Findings carried

- The guide's count rows the subjective lane flagged (`test/guides/test.md:51`, `:133`, `:677`)
  → H-guide deletes the ones its edits touch; the rest go to a documentation-sweep row.
- The round-3 rulings round holds S12 (the mcp `createTeardown` mismatch); if it widens
  `createTeardown`, that lands as its own unit in `src/core/factories.ts` + `types.ts`, disjoint
  from H-core's files.
- Supervisor's eventual re-pin and local-deletion pass is downstream work in supervisor's own
  repo, not this campaign's scope beyond keeping every adopted shape usable there.
