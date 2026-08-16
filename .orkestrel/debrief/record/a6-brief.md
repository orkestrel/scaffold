# A6 — viewer freshness: the run's own stream ending is the announcement

## Role and engine

`implementer`, engine **Opus 5**, native, high effort. Sole serial writer in
`/workspace/supervisor` from **311c9b5**. Perform directly,
spawn nothing, no commits/pushes/installs. Sol audits this unit afterward — your self-report is
not acceptance.

## The defect (E1 finding 3, filmed)

A run that self-completes leaves the open viewer's header saying `running` forever: the rail
says "Last seen · completed" two inches away, the feed holds the full streamed answer, and the
`Run finished` badge never renders. Root cause (both design lanes, independently):
`Operator.ts` re-inspects only on a `settlement` observation — which lands while the workflow
is still `running` — and when the live stream ends cleanly (`LiveBroker.close` →
`LiveViewer` EOF → the browser's `for await` ends normally) the `finally` sets `live = false`
and nothing refreshes. The fixture suites never saw it because they inject an explicit
terminal frame the real server does not send.

## The mechanism (ruled by the reconciled design round — build exactly this)

1. **On a current-generation, non-aborted, clean stream end**: perform ONE authoritative
   `inspect`, replace the snapshot, and let every fact follow from it. Check both the
   generation and `signal.aborted`: an aborted end (logout, navigation, fault) must NOT
   refresh — prove both directions with tests.
2. **Derive `terminal`** from `isTerminalStatus(snapshot.workflow.status)` as a computed —
   the stored `#terminal` flag written once at open is the drift this closes.
3. **The tail-field ruling**: `ApplicationTail.terminal` (app/core/types.ts) is a second home
   for a fact the snapshot carries. Measure its full ripple first (consumers, validators,
   client decode, handlers, tests, guide rows). If every consumer is inside your owned list,
   delete the field and update all of them in this change. If the ripple exceeds the owned
   list: STOP-REPORT the measured list — do not delete, do not widen scope. Either way
   `Operator.terminal` derives from the snapshot.
4. **Roster is never snapshot authority.** Do not wire the header to `RosterManager.departed`;
   the rail and the viewer may corroborate, never feed, each other.
5. **If the authoritative inspect can answer ABSENT** (the durable record gone before the
   refresh), the existing gone-run voice owns that case — assert which sentence renders and
   that it is not `Run finished`. If instead the inspect still answers `running` after a real
   self-completion, that is the server closure barrier being incomplete: STOP-REPORT with the
   evidence; never add retries or polling.

## The proof discipline (non-negotiable for this unit)

The red test drives a REAL workflow to self-completion through the real broker — no injected
terminal frame anywhere in it — and asserts the open viewer reports terminal. Record it red
(command + failing count), then green. A second pair proves the aborted-end negative. The
capture is the acceptance evidence: register a portfolio state showing the open viewer at
self-completion with `Run finished` rendered, generated in the capture run.

## Scope

**Owned:** `app/browser/controllers/Operator.ts`, `app/browser/types.ts`, `app/core/types.ts`
(the tail field, per the ruling), `app/server/SupervisorApplication.ts` (tail only),
`app/browser/services/Client.ts` + `app/browser/validators.ts` if they decode the tail shape,
`tests/app/browser/controllers/Operator.test.ts`, `tests/app/server/SupervisorApplication.test.ts`,
`tests/app/browser/portfolio.test.ts` + the registry, integration setup where the journey needs
a self-completing run. **Off-limits:** `app/browser/components/FeedItem.vue` (the next units
own it), `src/**`, configs, manifests.

## Acceptance criteria

1. The red/green pair for clean-end refresh, with the negative (aborted end does not refresh).
2. `Operator.terminal` computed from the snapshot; no stored terminal flag in the controller.
3. The tail-field ruling executed one way or the other, on the record.
4. The registered portfolio frame with `Run finished` at self-completion.
5. `npx vitest run --project app:browser` and `--project app:browser:integration` and
   `npm run test:app:server` green; `npm run check` green.

## Output

Touched files + diffstat; the ripple measurement and the ruling taken; per-criterion proofs
with commands and tails (red first); `git status --porcelain`; deviations or none. No diary.
