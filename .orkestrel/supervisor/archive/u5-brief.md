# U5 — shell recomposition and the fleet signature

## Role and engine

`implementer`, engine **Opus 5** (subjective unit: shell composition, signature treatment,
notice copy). Sole serial writer in `/workspace/supervisor` from commit `5993301`. Perform
directly, spawn nothing, no commits/pushes/installs.

## Authority

`/home/user/scaffold/.orkestrel/supervisor/REDESIGN.md` rulings, all settled: permanent rail
≥ lg (Runs above Stack) with `offcanvas-lg` drawer below; mobile initial authed view is the
roster, drawer closes on open; the navbar's page-scoped Live/Idle badge becomes a fleet readout
derived from the roster facts (status/paused only — NO waiting indicator), and below `lg` it is
the control that opens the drawer; no continuous motion anywhere; restore lands the operator in
the run with the rail beside it (≥lg) or as content with the drawer closed (mobile); the
enterprise-bootstrap skill binds; the journey doctrine binds (real input, visible/reachable
targets, perception assertions, convergence waits).

## What this unit composes

1. **The rail into the shell** (`ApplicationView.vue`): mount `RunList` ONCE — the reviewer's
   recorded condition verbatim: the shell's dual-mount idiom (ContentPane is mounted twice) must
   NOT be used here or two `id="runs"` and two `role="status"` regions ship; use one
   `offcanvas-lg` element (static aside ≥lg, drawer below), `aria-labelledby="runs"`. Settle the
   shell on ONE disclosure idiom while recomposing (Bootstrap collapse vs `d-none` — your call,
   recorded).
2. **The signature readout**: replace the Workflow toggle / page-scoped badge with the fleet
   readout (counts from `operator.roster` facts; static marks, words beside color); below `lg`
   it opens the drawer. Contrast bars are the skill's (measured proof is U8's).
3. **The restore notice**: render `operator.notice` (RestoreNotice — reactive readonly) as the
   stated reason on the authenticated shell ("that run is gone" copy is yours within the writing
   rules; `reason` distinguishes gone/refused). Rename the shell's existing `const notice` local
   (the logout fault message) so the operator's noun wins — the recorded U3 condition.
4. **The caption-sweep patch** (carried, exact): `tests/app/browser/ApplicationView.test.ts:426`
   area — allow exactly `['Open by id']` as the one multi-word caption with the recorded comment
   (a ruled name for a technical disclosure, not authored control copy).
5. **The integration re-route**: with the rail composed, `openApplicationWorkflow` opens through
   a rail row when the run is live (the door stays the retained-ended path); add the two standing
   journeys — rail click-open and keyboard-only open (Tab to the row, Enter) — through the
   composed shell against the real server, doctrine-conformant (role/label targeting, no
   networkidle, convergence waits). Extract the shared leak-safe acquisition helper in
   `integration/setup.ts` and move the five `integration.test.ts` tests onto it (the recorded
   micro-round observation).
6. **Door nouns** (advisory, yours to settle within the writing rules): the shell's "Open a
   workflow" heading vs the door's "For a run that has already ended." — one noun for the thing
   in the reader's face; H6 later folds the door into History.

## Scope

**Owned:** `app/browser/components/ApplicationView.vue`, `tests/app/browser/ApplicationView.test.ts`,
`tests/app/browser/integration/setup.ts`, `tests/app/browser/integration/integration.test.ts`,
`tests/app/browser/integration/journey.test.ts`, and the mirrored shell test additions. If the
signature needs a small presentational component, it may be a new owned file under
`app/browser/components/` with its mirrored test.

**Off-limits:** `RunList.vue`, `RunItem`-anything, `OpenPanel.vue`, `LoginPanel.vue`,
`CommandBar.vue`, all controllers/stores/services, `app/browser/types.ts`, `app/core/**`,
`app/server/**`, `src/**`, vendored files, `package.json`, `configs/**`, `guides/**`.

Forbidden: the standing list (no `any`/`as`/`!`/suppressions/mocks/timers/polling/`style`
attributes/invented classes/new deps); no aria-live additions beyond what RunList owns; no
waiting indicator.

## Acceptance criteria

1. ≥lg: authenticated shell shows the permanent rail (Runs above Stack) beside the content;
   the run's pane and rail coexist; one `id="runs"`, one `role="status"` — proved in the
   component suite via the accessibility tree at both widths (the repo's viewport helpers).
2. Below lg: authenticated landing shows the roster as content/drawer per the ruling; opening a
   run closes the drawer and shows the run — proved.
3. The signature readout renders the fleet facts statically at both widths, opens the drawer
   below lg, and never animates — proved.
4. `operator.notice` renders its stated reason exactly once, clearing per the contract; the
   logout fault keeps its own surface under its new local name — proved.
5. The caption sweep passes with exactly the recorded allowance; the whole `app:browser` project
   is green.
6. The two journeys pass against the real server; the five re-based integration tests pass on
   the shared acquisition helper; `npm run test:app:browser:integration` green.
7. Converge scoped; static gates green; Orchestrator runs the full chain (guides parity stays
   U7's).

## Deviation contract

Stop and report if composition needs a change in an off-limits component (that is that unit's
fix round). Ancillary layout/copy/idiom choices are yours, recorded. Pixel proof: the
Orchestrator captures immediately after acceptance; U8 owns the measured matrix.

## Output

Touched files + diffstat; the full `ApplicationView.vue` diff; journeys' names; per-criterion
proofs; recorded calls; `git status --porcelain`; deviations or none. No diary.
