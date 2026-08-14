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
| Wire: delta events + rich entries (planner) vs complete snapshot of bare ids (Sol) | **Complete snapshot of rich entries.** Snapshot semantics from Sol; entry widened from bare id to `{ id, status, paused, created, updated }` | Bare ids force N inspect fetches to paint rows. `waiting` was priced by U1 (`HumanLedger` full-table ticket scan per publish, no in-memory count) and **dropped** — no unit may design against it. Timestamps mirror the snapshot's own names: the field is `created` (U1 audit: `started` asserted a fact the value does not carry) |
| Rail: permanent (planner) vs collapse-after-open (Sol) | **Permanent rail ≥ lg** (Runs above Stack, `offcanvas-lg` drawer below), Sol's mobile behaviours (initial authed view = roster; closes on open) | At ≤5 active the rail is cheap and delivers the owner's literal ask — "see them as they come up" — with nothing to press |
| Insertion: newest-first top + queue-and-notify (planner) vs append-bottom acquisition order (Sol) | **Append-bottom, acquisition order, no queue mechanism** | At ≤5 rows everything is on screen; stability beats recency; planner conceded the queue is dead weight at this size |
| aria-live on the list (Sol) vs dedicated status line (planner) | **Dedicated visible `role="status"` line; list carries no aria-live** | Deterministically serves the anti-spam constraint; sighted users get the same coalesced fact |
| Reload: land on roster (Sol) vs restore last-open run (planner) | **Restore last-open run** when live/retained, else land on rail with stated reason; pointer cleared on logout | Zero-step resume is the strongest reading of "automated"; the rail is visible beside the restored run, so the primary surface is not bypassed |
| Signature motion: one `spinner-grow` for waiting (planner) vs none (Sol) | **No continuous motion anywhere.** The signature readout derives from `status`/`paused` facts only — the waiting badge is struck with the `waiting` field (no data source ships) | Sol's refusal + planner's own R5; resolves reduced-motion by construction. U4/U5 must not design a waiting indicator |
| Refusal focus: password-selected (planner) vs username (Sol + research inference) | **Password, contents selected.** Full focus table (recorded at U6 audit round 1): an outstanding field on arrival and after empty submit; the password with contents selected after a refusal; the submit control after any other failure — nothing typed is in question there, so focusing a field would invite editing input the server never read | Fastest correct retry with values preserved; the transport-destination row was forced when refusal stopped marking fields, ruled principled by the U6 subjective lane; to be validated in capture round A |

## History (added by owner correction; two-lane design reconciled)

Lanes: planner (`tmp/redesign/history-planner.md`) and Sol analyst (`history-analyst.md`, thread
01a000d5), same brief, blind. Convergent on: store member `list` on `SupervisorStoreInterface`
with cursor paging over a first-page watermark (`(updated, id)` descending, exclusive boundary,
no totals); a transactional catalog record (`RunRecord`: id/created/updated/released?; takeover
preserves `created`, `renew` never reorders); join-not-denormalize — workflow store stays the one
authority for name/terminal status, one bounded **sequential** snapshot lookup per candidate
(SQLite shared-driver constraint); authorization before paging (named grants via
`RunListOptions.runs`, no unauthorized id in any response or cursor); id-prefix search only in
v1; no retention in v1 (append-only, limit stated under the History heading and in the guide;
coordinated deletion is a separate design); H3→H4→H5→H6 serial after U5.

Orchestrator rulings on the splits:

| Split | Ruling |
| --- | --- |
| Route + vocabulary: `GET /workflows` + "All runs"/catalog (planner) vs `GET /history` + completed-only (Sol) | **`GET /history`, completed-only.** The rail already owns live runs; a combined list re-blurs the boundary the design labors to communicate, and `catalog` collides with the ecosystem's package-catalog term. Rail header "Live runs", History heading "Completed history", overlap during decay labelled |
| Search interaction | **Compose both:** server-side case-sensitive prefix (both lanes), Sol's copy ("Filter by run ID"), planner's browser mechanics (debounced ~250ms, AbortController, cursor reset on change) |
| Placement | Sol's fully specified shape: first-class content-area destination from the rail footer; open run's state/subscription intact; "Back to run"; mobile full-width, drawer closes |
| Open-by-id door | Folds INTO History as the collapsed technical disclosure (satisfies the owner's never-primary ruling); History's empty state routes back to live runs |
| Terminal-open fact | `ApplicationTail.terminal` is computed server-side and discarded by handler+client today — H5 must surface it: a historical terminal run opens read-only with no live subscription |

Sol's closing question (a legal/operational retention deadline) is answered from the owner brief:
none stated; append-only v1 stands. Planner's (compare vs find-and-open): find-and-open, per the
one-run operator model. H3/H4/H5 route objective → Sol; H6 subjective → Opus; U7 gains the
History five-state × two-viewport × two-theme capture matrix plus a real restart journey
(process A creates, process B discovers and opens).

## Routing ledger

| # | Unit | Role · Engine | Owns (disjoint, serialized) |
| --- | --- | --- | --- |
| U1 | Roster-liveness capability, wire to browser client | `codex`→implementer · Sol | `app/core/types.ts`+`constants.ts`, `app/server/*` (broker/viewer/handlers/routes/SupervisorApplication), `app/browser/services/Client.ts`+`LiveStream.ts`, `CommandBar.vue` consumer move, server tests |
| U2 | Browser RosterManager + lifecycle | `codex`→implementer · Sol | `app/browser/types.ts`, new manager service, `Operator.ts`, tests |
| U3 | Reload/re-login restore | `codex`→implementer · Sol | `Operator.ts`, `StorageOperatorStore.ts` (queues behind U2 — same files) |
| U6 | Login ergonomics | `implementer` · Opus | `LoginPanel.vue` + its tests |
| U4 | Runs rail + ended door | `implementer` · Opus | new `RunList.vue`/`RunItem.vue`, `OpenPanel.vue` demotion, tests |
| U5 | Shell recomposition + signature | `implementer` · Opus | `ApplicationView.vue`, tests. Binds to the U3-fix contract: a reactive `operator.notice` (RestoreNotice), not a consuming read; the shell's existing `const notice` local (logout fault) must be renamed rather than colliding. Renders the stated reason for a failed restore |
| H1/H2 | History design lanes (parallel with U1–U3, read-only) | `planner` · Opus + `analyst` · Sol | — |
| H3+ | History implementation | routed after H reconciliation | `src/core` store contract, `app/*` |
| U7 | Guides, parity, seeders/showcase, capture harness | `builder` · Sonnet | `guides/**`, fixtures, `README.md` (route table + Live feed section gained `GET /roster/live`; guide example `supervisor.md:2139` and method tables move to the `client.roster` sub-entity; parity set at U1 close is 20 exports + 3 phantom rows incl. inherited `ViewerInterface.destroy` placement; regenerate the committed `demo/showcase.html` via `npm run show` — it still mounts the pre-U1 `client.roster()` call. Three guide PROSE sentences falsified by U3, outside any parity row, named explicitly: `supervisor.md:1884` "The one durable browser value is the reload view" (now two values), `:1886` the `VIEW_PREFIX` key claim (views are prefix+id; the pointer seam has its own key), `:1897-1899` the reload-answered-by-reopening limit (U3's purpose falsifies it) |
| U8/U9 | Capture review rounds A/B (`orkestrel-polish-surface`) | `reviewer` · Opus + `analyst` · Sol + `checker` | read-only; portfolio is the review input. Capture harness law post-U1: an authenticated page holds a permanently open roster SSE stream, so Playwright `networkidle` never fires — every wait is a concrete locator/UI condition |

Writers strictly serialized in `/workspace/supervisor`, committed checkpoint between units.
Serial order: U1 → U2 → U3 → U6 → U4 → U5 → (H3+) → U7 → U8 → fixes → U9 → gates.

Standing owner instruction for every remaining fix round: an audit's executed probe that proved a
real property is promoted into the permanent suite — mirrored unit file, or the integration files
when the property spans the real server — named for what it proves, never discarded with the
verdict.

Standing owner instruction for every surface unit (U4/U5/U6 fixes, H5/H6, U7): beside the
component proofs, land at least one HUMAN-INTERACTION journey in the integration files — real
keystrokes (`page.keyboard`/`fill`/`press`), real clicks, Tab/Enter reachability — through the
composed application against the real server, proving the surface's primary flow the way a human
drives it. The existing stack (Vitest browser mode on the Playwright provider + the Node-side
Playwright harness) is the vehicle; no new dependency. Not every behavior needs this class, but
each primary flow does: login type-refuse-retype-succeed (U6 fix), click-a-rail-row-to-open and
keyboard-open (U5, once the rail is composed), History load-older/prefix-typing/open-historical
(H6), and the restart journey (U7).

Owner refinement: a human journey interacts ONLY with what is visible and reachable for a human —
elements targeted by role/label as rendered, real typing and clicks, the user's freedoms AND
restrictions; it never reaches into JS objects, transports, or copied credentials. Transport-level
integration proofs remain a separate, declared class — and on the live wire their assertions are
CONVERGENCE-based (poll the fact until it contains/equals the expected state), never identity with
a captured frame: complete-snapshot semantics emit successive frames (pending→running in
milliseconds), so two observers of one stream legitimately differ by a frame at any instant.

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
