# Supervisor redesign — reconciled plan

Owner brief: auth is good but complicated — automate what the system already knows; the typed
workflow id must go — workflows appear live once logged in. Owner rulings taken during design:
new server capability approved under repo law; ~5 concurrent active runs; **the growing collection
of completed workflows must be discoverable** (this overrules both lanes' deferral of history);
login security copy cut to one sentence under the button.

Evidence: `tmp/redesign/` — absorb-report (code map), capture-report + 40 captures (real server,
real Chromium, both viewports × both themes), research-report (cited constraints). Design lanes:
planner (Opus, subjective) and analyst (Sol via codex, journal `tmp/codex/design.jsonl`, thread
`01a00055-aea8-7891-88be-1e051877a35a`), same brief, blind.

## Settled by convergence (both lanes independently)

- The typed-id gate is deleted; a live Runs surface takes its seat. `LiveFrame` stays closed —
  roster liveness is a **separate channel with its own broker/viewer** composed into `LiveBroker`.
- Every stream event is a **complete roster snapshot** (Sol): coalescing, reconnect resync, and
  no gap semantics fall out for free. Dividend: the UI's "reconnected, may be missing" partial
  state vanishes — a reconnect delivers the whole truth.
- Login: uniform refusal marks **neither** field; one `role="alert"` region; values preserved for
  retry; autofill-only (`autocomplete` tokens already correct in code); no app-level username
  cache; help text cut to "This browser never stores your password."
- "Open by id" survives only as a collapsed technical disclosure, never primary anywhere — not
  even in the empty state (owner correction mid-campaign, on the baseline mobile captures: typing
  or recalling an id is never the normal experience; ids travel server↔browser on their own, and
  the "no durable record" refusal must be unreachable in the normal flow). The empty state shows
  the rail's own empty message; History is the discovery path for ended runs. Help text "For a run
  that has already ended." The H reconciliation rules whether the door folds into the History
  surface entirely. Row labels still display the run's name — display is fine, typing is the
  defect.
- Ended runs **decay in place** (never vanish); the open run's row is pinned while open; selection
  and detail pane survive the run ending; no auto-open, no auto-scroll, no reorder under the user.
- No polling, no timed reconnect — partial/error states offer keyboard-reachable Retry.
- Signature: the navbar's page-scoped Live/Idle badge becomes a **fleet readout** replacing the
  Workflow toggle; below `lg` it is the button that opens the drawer.

## Ruled by the Orchestrator where the lanes split

| Split | Ruling | Why |
| --- | --- | --- |
| Wire: delta events + rich entries (planner) vs complete snapshot of bare ids (Sol) | **Complete snapshot of rich entries.** Snapshot semantics from Sol; entry widened from bare id to `{ id, status, paused, started, updated, waiting? }` | Bare ids force N inspect fetches to paint rows — objectively worse than a wider entry. `waiting` is admitted only if U1's first step prices it cheap from in-memory state; if it needs journal reads per event it drops, and the design is told |
| Rail: permanent (planner) vs collapse-after-open (Sol) | **Permanent rail ≥ lg** (Runs above Stack, `offcanvas-lg` drawer below), Sol's mobile behaviours (initial authed view = roster; closes on open) | At ≤5 active the rail is cheap and delivers the owner's literal ask — "see them as they come up" — with nothing to press |
| Insertion: newest-first top + queue-and-notify (planner) vs append-bottom acquisition order (Sol) | **Append-bottom, acquisition order, no queue mechanism** | At ≤5 rows everything is on screen; stability beats recency; planner conceded the queue is dead weight at this size |
| aria-live on the list (Sol) vs dedicated status line (planner) | **Dedicated visible `role="status"` line; list carries no aria-live** | Deterministically serves the anti-spam constraint; sighted users get the same coalesced fact |
| Reload: land on roster (Sol) vs restore last-open run (planner) | **Restore last-open run** when live/retained, else land on rail with stated reason; pointer cleared on logout | Zero-step resume is the strongest reading of "automated"; the rail is visible beside the restored run, so the primary surface is not bypassed |
| Signature motion: one `spinner-grow` for waiting (planner) vs none (Sol) | **No continuous motion anywhere.** Waiting is a static warning badge + words | Sol's refusal + planner's own R5; resolves reduced-motion by construction |
| Refusal focus: password-selected (planner) vs username (Sol + research inference) | **Password, contents selected** | Fastest correct retry with values preserved; research's own label was "adapted inference"; to be validated in capture round A |

## History (added by owner correction)

Completed runs accumulate and must be discoverable without knowing ids. Requires: enumeration on
`SupervisorStoreInterface` (src surface — package unpublished, so no external blast radius), an
authorized paged endpoint, and a History surface reachable from the rail. Gets its own two-lane
design round (H-DESIGN) before implementation; neither lane designed it and improvising it would
be unreviewed design.

## Routing ledger

| # | Unit | Role · Engine | Owns (disjoint, serialized) |
| --- | --- | --- | --- |
| U1 | Roster-liveness capability, wire to browser client | `codex`→implementer · Sol | `app/core/types.ts`+`constants.ts`, `app/server/*` (broker/viewer/handlers/routes/SupervisorApplication), `app/browser/services/Client.ts`+`LiveStream.ts`, `CommandBar.vue` consumer move, server tests |
| U2 | Browser RosterManager + lifecycle | `codex`→implementer · Sol | `app/browser/types.ts`, new manager service, `Operator.ts`, tests |
| U3 | Reload/re-login restore | `codex`→implementer · Sol | `Operator.ts`, `StorageOperatorStore.ts` (queues behind U2 — same files) |
| U6 | Login ergonomics | `implementer` · Opus | `LoginPanel.vue` + its tests |
| U4 | Runs rail + ended door | `implementer` · Opus | new `RunList.vue`/`RunItem.vue`, `OpenPanel.vue` demotion, tests |
| U5 | Shell recomposition + signature | `implementer` · Opus | `ApplicationView.vue`, tests |
| H1/H2 | History design lanes (parallel with U1–U3, read-only) | `planner` · Opus + `analyst` · Sol | — |
| H3+ | History implementation | routed after H reconciliation | `src/core` store contract, `app/*` |
| U7 | Guides, parity, seeders/showcase, capture harness | `builder` · Sonnet | `guides/**`, fixtures |
| U8/U9 | Capture review rounds A/B (`orkestrel-polish-surface`) | `reviewer` · Opus + `analyst` · Sol + `checker` | read-only; portfolio is the review input |

Writers strictly serialized in `/workspace/supervisor`, committed checkpoint between units.
Serial order: U1 → U2 → U3 → U6 → U4 → U5 → (H3+) → U7 → U8 → fixes → U9 → gates.

## Exit criterion

1. Login per rulings — capture-proved (refused state marks neither field, one alert, five text
   elements not eight).
2. Roster liveness end-to-end — a run started via the bearer route appears as a row without
   reload or typed id; ending it decays the row; proved against the real server in captures.
3. Reload and re-login land the operator back in their run; gone-run fallback stated in UI.
4. Ended door: collapsed disclosure works against a retained ended id.
5. History: completed runs discoverable and openable without prior id knowledge, paged, authorized.
6. Signature readout live at both viewports/themes with measured contrast (≥4.5:1 text, ≥3:1 marks).
7. Full gates green in `/workspace/supervisor`; polish-surface rounds converged on one final
   portfolio; every unit's pixel proofs on file.
