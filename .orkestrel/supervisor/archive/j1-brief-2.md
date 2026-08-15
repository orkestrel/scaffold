# J1 fix round — the resolver's admission truth and the pure journey body

Successor to `j1-brief.md`. Carries ten findings from J1's audit round (verdicts on disk:
`j1-analyst-verdict.md`, reviewer report in the campaign record; claim 2 CONFIRMED by both —
the retrofit's instruments are honest). Reconciliations taken: Sol's keyboard-click finding
stands over the reviewer's CONFIRMED (Orchestrator verified the pointer act at
journey.test.ts:128); Sol's cascade reading stands on the RunList comment (halfmoon defines no
list-group focus outline; the ring is the browser default). The present-but-hidden instant
refusal stays as designed (documented fast-refusal-vs-convergence tension; recorded flake
suspect). Two SK1 canonization stances recorded by the Orchestrator, not this unit's work.

## Role and engine

`builder` (ten fully specified sites). Sole serial writer in `/workspace/supervisor` from clean
committed baseline **87e2dc9**. Perform directly, spawn nothing, no commits/pushes/installs.
Unlike the unit's bench writer, you CAN run the listener suites — do.

## The changes

In `tests/app/browser/integration/setup.ts` (the resolver):

1. Resolve ordinary textboxes by ROLE with accessible name; keep label-first resolution only
   for verified password inputs (an `<input type="search">` currently passes as `textbox`
   though its computed role is `searchbox` — setup.ts:218,237).
2. Add the accessibility-tree check beside the CSS visibility check in the existing `evaluate`
   (~246-248): `node.closest('[aria-hidden="true"]') === null`, with its own refusal sentence
   ("is removed from the accessibility tree"). Keep `includeHidden: true` for candidate
   discovery — the fast refusal survives, the admission rule stops being decorative.
3. Split the disabled case out of the conflated refusal (~249-251): its own check, its own
   sentence (`… is disabled`); `is not focus-reachable` keeps only the tab-order and inert
   cases.
4. Narrow the `name` parameter to `string` (the RegExp arm has no consumer — delete the ternary
   at ~220; messages use the string directly).
5. With item 9's extraction, add the one-sentence journey/transport boundary declaration in
   this file where both classes are visible: the resolver and the journey-class helpers are the
   only admissible instruments inside a journey body; `loginApplication`/
   `startApplicationWorkflow`/`openApplicationWorkflow` are the transport class, declared for
   the transport suites and for fixture seeding OUTSIDE journey callbacks.

In `tests/app/browser/integration/journey.test.ts`:

6. The keyboard journey drops `username.click()` (:128). First verify the application's own
   autofocus lands on the username field at arrival (poll `hasJourneyFocus(username)`); if the
   app does not autofocus, reach the field by real Tab from the page's start instead. Never a
   pointer act in this journey.
7. Both rail journeys move their bearer seeding (`startApplicationWorkflow` at ~101 and ~136)
   OUT of the journey callbacks: seed as a declared fixture step at the test level between
   journey phases, preserving what each journey proves — the pointer journey watches the run
   ARRIVE while logged in (seed after the login phase completes, then a second human-driving
   callback observes and opens), the keyboard journey may seed before or between phases the
   same way. The journey bodies touch only interface and perception.
8. Extract the triplicated login preamble (:18-26, :91-99, :126-134 — same nine steps) into ONE
   journey-class helper in `setup.ts` beside the resolver, named for the human act per
   `{verb}{Noun}`; the two rail journeys use it; the login journey KEEPS its inline sequence
   (there the login is the subject).
9. Rehouse the refusal probe honestly: it is the layer's own proof, not a login journey — its
   own describe/name saying what it proves, and a comment stating the viewport fact its target
   depends on (the Close control is hidden only at `lg` and up, per the offcanvas-lg header).

In `tests/app/browser/components/`:

10. `RunList.test.ts` (~377-384): correct the comment to the truth — the outline asserted is
    the retained browser default on `:focus-visible` (halfmoon suppresses non-focus-visible
    button outlines and authors no list-group focus ring); assertions unchanged.
    `OpenPanel.test.ts` (:113, :121): replace the `instanceof` ternaries with the established
    `?.checkVisibility()` idiom (undefined is neither false nor true, so the assertions still
    fail on null).

## Scope

**Owned:** `tests/app/browser/integration/setup.ts`, `tests/app/browser/integration/journey.test.ts`,
`tests/app/browser/components/RunList.test.ts`, `tests/app/browser/components/OpenPanel.test.ts`.
Everything else off-limits (no product code; `integration.test.ts` untouched — the transport
class keeps its instruments). Forbidden: the standing list; no assertion weakening; no new
capabilities beyond the named changes.

## Acceptance criteria

1. Resolver: role-based textbox resolution (searchbox no longer admitted as textbox); the
   aria-hidden refusal exists with its own sentence; disabled has its own sentence; `name` is
   `string`.
2. `grep -n "\.click()" tests/app/browser/integration/journey.test.ts` shows no pointer act in
   the keyboard journey; no `startApplicationWorkflow` call inside any journey callback; the
   preamble exists once in `setup.ts` and inline once in the login journey.
3. `npm run build:app` then `npm run test:app:browser:integration` green (10 tests);
   `npm run test:app:browser -- tests/app/browser/components/RunList.test.ts tests/app/browser/components/OpenPanel.test.ts`
   green.
4. Static gates green (`format:check`, `lint:check`, `check`).

## Deviation contract

Stop and report if the app does not autofocus the username and Tab-from-start cannot reach it
(a product finding), or if moving the seeding breaks a journey's premise in a way the two-phase
shape cannot express. Ancillary naming/housing calls are yours, recorded.

## Output

The diff; per-criterion proofs with commands and tails; the helper's name and the boundary
sentence verbatim; `git status --porcelain`; deviations or none.
