# Design round 2 — subjective lane report (planner, Opus 5), 2026-08-21

Lane held: subjective. Blind to the objective lane. Preserved from the returned report; the
rulings, alternatives, unit split, tensions, and risks are kept in full; the reconciliation file
records which rulings the Orchestrator took.

## The vocabulary the adoption must land on

| Verb | Means | Existing evidence |
| --- | --- | --- |
| `resolve*` | Find the one element a person means | `resolveAccessible` `test/src/browser/helpers.ts:96`, `resolveRendered` `:44` |
| `read*` | Read one fact off a node or the page | `readPerception` `:369`, `readValue` `:451`, `readCascade` `:599`, `readInventory` `server/helpers.ts:109` |
| `describe*` | Render a multi-line description of a subtree | none yet — the adopted layer opens it |
| `waitFor*` | Wait for a named fact, bounded | `waitForDelay` `core/helpers.ts:9`, `waitForFrame` `browser/helpers.ts:473` |
| `create*` | Construct an entity that carries state | `createRecorder` `core/factories.ts:79`, `createPortfolio` `browser/factories.ts:30` |
| `is*`/`matches*` | Answer a question, never throw | `isOutsideViewport` `browser/helpers.ts:16`, `isExcluded` `server/helpers.ts:54` |

Package constraints: `src/browser` imports `vitest/browser` and DOM globals only (no core
import, `test/guides/test.md:605`); no exported signature names an `@orkestrel/*` type
(`test/guides/test.md:560` rule 9) — which kills supervisor's `waitForEvent` signature as
written and forbids importing `@orkestrel/process`.

## Family rulings (lane's own)

- Family 1: adopt `waitForCondition(description, condition, options?)` with
  `ConditionOptions { budget?, interval?, signal? }`; adopt
  `retryUntil<T>(description, produce, satisfied, options?)` with
  `RetryOptions extends ConditionOptions { attempts? }` — attempt and time bounds are ONE
  concept, whichever trips first, because each alone fails a real case; adopt
  `waitForEvent(source: OnceInterface, event, options?)`; adopt `waitForSocketClose`; exclude
  `waitForRecorder` (one-line delegate with a silent non-rejecting return), the
  `waitForApplication*` family (collapse to call sites or `@orkestrel/process`'s `waitForExit`),
  and the scratch destroy retry (a `retryUntil` call site). A throw from `produce` is an
  unsatisfied attempt with the last error as `cause`; a throw from `condition` propagates — the
  line between the two helpers, stated in the guide.
- Family 2: adopt `isRunning(pid)` (no `@orkestrel/process` export answers liveness for an
  unowned pid — `isExited` takes a child) and `readJSONLines(text)` (not `parse*`: that form is
  contractually `T | undefined`, and hiding a malformed line behind `undefined` is worse for a
  test than naming it); exclude `stopApplicationProcess`, `spawnApplicationCommand`, and the
  process interfaces on `@orkestrel/process` ownership.
- Family 3: one vocabulary, two jobs — the published act layer finds and drives; the adopted
  describe layer reports. Rename `resolveRole/Name/States` to `readRole/readName/readStates`
  and `collapseText` to `readText`; adopt `describeTree`/`describeFocus`; EXTRACT `isReachable`
  BEFORE adopting anything (four near-duplicate reachability filters measured inside the
  published layer at `browser/helpers.ts:58-69`, `:186-198`, `:234-244`, `:378-386` — landing a
  fifth is the defect tests.md names); `isRendered`/`isReachable` stand as a deliberate pair
  (announced vs clickable). Constants `IMPLICIT_ROLES` (membership as stated contract),
  `HEADER_ROLES`, `FIELD_ROLES`, `CONTENT_ROLES`, `FOCUSABLE_SELECTOR`. Exclude
  `describeSurface` (one workspace's digest format counting Bootstrap `data-row` controls).
- Family 4: adopt the `Color` family (`parseColor` returning `undefined`, never a transparent
  sentinel; `blendColor`; `readBackdrop(element, floor)` with floor REQUIRED — the browser
  canvas is not always white and an assumed white is a confident wrong number on a dark
  surface; `measureLuminance`; `measureContrast`); `contrast(element, floor?)` gains the
  optional floor rather than a sibling (datum, not mode, per the split-behavior law);
  `readRing(control, worn?)` measures and never acts (supervisor's version calls
  `userEvent.tab()` inside a measurement, violating the published no-acting contract);
  exclude supervisor's visual `readFocus` (name collision; its own TSDoc says delete),
  `Reading`, `STATUS_PALETTE`.
- Family 5: no new export — pane staging, release-in-finally, and byte readback land INSIDE
  `createPortfolio.place`, which gains an optional element. Publishing the runner-internal pane
  coupling in one home is right BECAUSE it will break on a Vitest release; publishing it loose
  would let each workspace break differently. The byte readback closes a real gap (`place`
  never proves the file was written).
- Family 6: adopt only `clearStorage()`; exclude the find/press/fill family (element+selector
  parameters the published contract forbids; near-duplicates of the accessible verbs),
  `buildElement` (`render` exists), `recordArrival`/`driveArrival` (compositions that become
  call sites), `extractControls` (`data-row` policy), `extractOrphans` (Bootstrap anatomy).
- Family 7: adopt the journal as `createJournal(): JournalInterface` with `JournalStep`,
  verbs `start`/`stop` per the fixed lifecycle vocabulary; `Channels` stays private; no
  `JOURNAL` singleton.
- Family 8: adopt the cookie jar as `createCookieJar(): CookieJarInterface` in CORE
  (`Response.headers.getSetCookie()` is a web standard), member `read(name)` matching the
  package's reader vocabulary.
- Family 9: exclude all three Vue-coupled helpers, each with its own sentence; the collapse
  buys supervisor a bounded wait where `waitForBrowserState` was unbounded.
- Family 10: no destroy change; the caller writes `retryUntil('the scratch directory was
  released', () => scratch.destroy(), () => true, { budget: 10_000, interval: 25 })`, which
  keeps the host's own last error as `cause`.

## Subject E rulings

`waitForCondition(description, condition, options?)`: async condition; reject (never silent
false); message `Condition "<description>" did not hold within <budget>ms (waited <elapsed>ms)`
(the elapsed reading separates genuine failure from a contended host); aborted waits reject
with `signal.reason`; description required and FIRST; defaults 1000/10 stated as chosen for a
test's patience; core placement (compiles under `lib: ["ESNext","WebWorker"]`, `types: []`);
loop order stated testably — read first, reject only after a false reading past budget, wait
one interval, read again, so a condition true during the final interval passes.

CONFLICT SURFACED: `test/guides/test.md:695` carries a Limits row excluding condition polling
on the no-polling architecture law, while `.claude/rules/tests.md:205-210` mandates this shape
for test code and the ROADMAP schedules it. The lane's ruling: the rule wins, the row is struck
and replaced with the distinction — the no-polling law governs a product's idle wakeup; a test
instrument waiting on a foreign process has no event to park on; where an event exists,
`waitForEvent` is the door.

## Unit split (lane's own)

U1 core waits (sol) → U2 cookie jar (sol) → U3 server process/socket (sol) → U4 reachability
consolidation (sol) → U5 a11y describe layer (implementer) → U6 color/contrast (sol) → U7
journal (implementer) → U8 portfolio pane+readback (sol) → U9 clearStorage (builder) → U10
guide narrative/Contract/Limits (implementer) → U11 gates (verifier). Each implementing unit
granted its own Surface/Voices/Tests guide rows (the parity bijection makes a rowless export
unable to reach green); U10 owns every narrative edit and deletes the counts its edits touch.

## Tensions (for the other lane / Orchestrator)

`resolve*`→`read*` rename cost; `contrast(element, floor?)` vs two exports; the whole process
family excluded on ownership; description as required leading parameter; `signal` in the
options; pane staging folded rather than exported; `OnceInterface`'s weak name and
assignability risk; `isRunning` vs `hasProcess`; `CANVAS_COLOR` vs `CANVAS`; striking the
Limits row rather than escalating the conflict.

## Risks (with settling evidence)

`Headers.getSetCookie` under core's lib (prove before U2); `OnceInterface` vs generic `once`
assignability (prove before U1); `commands.readFile` availability without consumer
registration (runtime probe before the capture unit); `stagePane`'s Vitest-internal coupling
(pin the version in the Contract; keep the loud pane-size check); `IMPLICIT_ROLES` partial
membership (exact-membership test + out-of-map control); `contrast` floor merge moving a
number (every existing case green + the guide fence re-run); U4 changing what
`clickDisclosure`/`readPerception` accept (per-helper before/after tables; every Voices row
still thrown by the same helper); Limits rows struck in name only (checker verifies each
against the Surface tables); round-1 moving `removeTree`'s budget (re-read the family-10
paragraph against the accepted outcome); guide-parity reddening for any unit whose grant is
withheld (grants stated in the Units preamble).

Finding recorded outside the adoption: `test/guides/test.md:51`, `:133`, `:677` state counts of
open sets; U10 deletes the ones its edits touch; the rest belong to a documentation-sweep unit.
