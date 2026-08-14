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

| Split                                                                                             | Ruling                                                                                                                                                                                                                                                                                                                                               | Why                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Wire: delta events + rich entries (planner) vs complete snapshot of bare ids (Sol)                | **Complete snapshot of rich entries.** Snapshot semantics from Sol; entry widened from bare id to `{ id, status, paused, created, updated }`                                                                                                                                                                                                         | Bare ids force N inspect fetches to paint rows. `waiting` was priced by U1 (`HumanLedger` full-table ticket scan per publish, no in-memory count) and **dropped** — no unit may design against it. Timestamps mirror the snapshot's own names: the field is `created` (U1 audit: `started` asserted a fact the value does not carry) |
| Rail: permanent (planner) vs collapse-after-open (Sol)                                            | **Permanent rail ≥ lg** (Runs above Stack, `offcanvas-lg` drawer below), Sol's mobile behaviours (initial authed view = roster; closes on open)                                                                                                                                                                                                      | At ≤5 active the rail is cheap and delivers the owner's literal ask — "see them as they come up" — with nothing to press                                                                                                                                                                                                             |
| Insertion: newest-first top + queue-and-notify (planner) vs append-bottom acquisition order (Sol) | **Append-bottom, acquisition order, no queue mechanism**                                                                                                                                                                                                                                                                                             | At ≤5 rows everything is on screen; stability beats recency; planner conceded the queue is dead weight at this size                                                                                                                                                                                                                  |
| aria-live on the list (Sol) vs dedicated status line (planner)                                    | **Dedicated visible `role="status"` line; list carries no aria-live**                                                                                                                                                                                                                                                                                | Deterministically serves the anti-spam constraint; sighted users get the same coalesced fact                                                                                                                                                                                                                                         |
| Reload: land on roster (Sol) vs restore last-open run (planner)                                   | **Restore last-open run** when live/retained, else land on rail with stated reason; pointer cleared on logout                                                                                                                                                                                                                                        | Zero-step resume is the strongest reading of "automated"; the rail is visible beside the restored run, so the primary surface is not bypassed                                                                                                                                                                                        |
| Signature motion: one `spinner-grow` for waiting (planner) vs none (Sol)                          | **No continuous motion anywhere.** The signature readout derives from `status`/`paused` facts only — the waiting badge is struck with the `waiting` field (no data source ships)                                                                                                                                                                     | Sol's refusal + planner's own R5; resolves reduced-motion by construction. U4/U5 must not design a waiting indicator                                                                                                                                                                                                                 |
| Refusal focus: password-selected (planner) vs username (Sol + research inference)                 | **Password, contents selected.** Full focus table (recorded at U6 audit round 1): an outstanding field on arrival and after empty submit; the password with contents selected after a refusal; the submit control after any other failure — nothing typed is in question there, so focusing a field would invite editing input the server never read | Fastest correct retry with values preserved; the transport-destination row was forced when refusal stopped marking fields, ruled principled by the U6 subjective lane; to be validated in capture round A                                                                                                                            |

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

| Split                                                                                                        | Ruling                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Route + vocabulary: `GET /workflows` + "All runs"/catalog (planner) vs `GET /history` + completed-only (Sol) | **`GET /history`, completed-only.** The rail already owns live runs; a combined list re-blurs the boundary the design labors to communicate, and `catalog` collides with the ecosystem's package-catalog term. Rail header "Live runs", History heading "Completed history", overlap during decay labelled |
| Search interaction                                                                                           | **Compose both:** server-side case-sensitive prefix (both lanes), Sol's copy ("Filter by run ID"), planner's browser mechanics (debounced ~250ms, AbortController, cursor reset on change)                                                                                                                 |
| Placement                                                                                                    | Sol's fully specified shape: first-class content-area destination from the rail footer; open run's state/subscription intact; "Back to run"; mobile full-width, drawer closes                                                                                                                              |
| Open-by-id door                                                                                              | Folds INTO History as the collapsed technical disclosure (satisfies the owner's never-primary ruling); History's empty state routes back to live runs                                                                                                                                                      |
| Terminal-open fact                                                                                           | `ApplicationTail.terminal` is computed server-side and discarded by handler+client today — H5 must surface it: a historical terminal run opens read-only with no live subscription                                                                                                                         |

Sol's closing question (a legal/operational retention deadline) is answered from the owner brief:
none stated; append-only v1 stands. Planner's (compare vs find-and-open): find-and-open, per the
one-run operator model. H3/H4/H5 route objective → Sol; H6 subjective → Opus; U7 gains the
History five-state × two-viewport × two-theme capture matrix plus a real restart journey
(process A creates, process B discovers and opens).

## Routing ledger

| #     | Unit                                                   | Role · Engine                                   | Owns (disjoint, serialized)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ----- | ------------------------------------------------------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| U1    | Roster-liveness capability, wire to browser client     | `codex`→implementer · Sol                       | `app/core/types.ts`+`constants.ts`, `app/server/*` (broker/viewer/handlers/routes/SupervisorApplication), `app/browser/services/Client.ts`+`LiveStream.ts`, `CommandBar.vue` consumer move, server tests                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| U2    | Browser RosterManager + lifecycle                      | `codex`→implementer · Sol                       | `app/browser/types.ts`, new manager service, `Operator.ts`, tests                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| U3    | Reload/re-login restore                                | `codex`→implementer · Sol                       | `Operator.ts`, `StorageOperatorStore.ts` (queues behind U2 — same files)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| U6    | Login ergonomics                                       | `implementer` · Opus                            | `LoginPanel.vue` + its tests                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| U4    | Runs rail + ended door                                 | `implementer` · Opus                            | new `RunList.vue`/`RunItem.vue`, `OpenPanel.vue` demotion, tests                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| U5    | Shell recomposition + signature                        | `implementer` · Opus                            | `ApplicationView.vue`, tests. Binds to the U3-fix contract: a reactive `operator.notice` (RestoreNotice), not a consuming read; the shell's existing `const notice` local (logout fault) must be renamed rather than colliding. Renders the stated reason for a failed restore                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| H1/H2 | History design lanes (parallel with U1–U3, read-only)  | `planner` · Opus + `analyst` · Sol              | —                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| H3+   | History implementation                                 | routed after H reconciliation                   | `src/core` store contract, `app/*`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| U7    | Guides, parity, seeders/showcase, capture harness      | `builder` · Sonnet                              | `guides/**`, fixtures, `README.md` (route table + Live feed section gained `GET /roster/live`; guide example `supervisor.md:2139` and method tables move to the `client.roster` sub-entity; parity set at U1 close is 20 exports + 3 phantom rows incl. inherited `ViewerInterface.destroy` placement; regenerate the committed `demo/showcase.html` via `npm run show` — it still mounts the pre-U1 `client.roster()` call. Three guide PROSE sentences falsified by U3, outside any parity row, named explicitly: `supervisor.md:1884` "The one durable browser value is the reload view" (now two values), `:1886` the `VIEW_PREFIX` key claim (views are prefix+id; the pointer seam has its own key), `:1897-1899` the reload-answered-by-reopening limit (U3's purpose falsifies it) |
| U8/U9 | Capture review rounds A/B (`orkestrel-polish-surface`) | `reviewer` · Opus + `analyst` · Sol + `checker` | read-only; portfolio is the review input. Capture harness law post-U1: an authenticated page holds a permanently open roster SSE stream, so Playwright `networkidle` never fires — every wait is a concrete locator/UI condition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

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

Owner doctrine (final form, adopted from the owner's parallel project and adapted to this repo's
paths — adapt, never import): journey tests simulate a person, not a script. Trusted input only —
Vitest Browser Mode's `userEvent` on the Playwright provider for in-browser tests, Playwright's
real keyboard/mouse for the Node-side harness; never programmatic `dispatchEvent`/`.click()`
shortcuts, never direct session or transport calls inside a journey. Interactions are limited to
what a human can actually see and reach: a journey layer in `tests/setupBrowser.ts` resolves
targets ONLY among currently visible, focus-reachable elements by their accessible names, and
REFUSES anything else — a test structurally cannot cheat past the interface's own freedoms and
restrictions. Journey assertions read perception — visible text, focus, announcements — never
session refs or store internals. Journeys live in the reserved end-to-end scope
(`tests/app/browser/integration/`); the polish rounds reuse the same journeys as their capture
instrument, stepping screenshots out of each journey state. Transport-level integration proofs
remain a SEPARATE, DECLARED class, and every observation of async state — live wire, storage
round trips — awaits the visible outcome or polls to convergence; never one-shot identity against
a moment (complete-snapshot semantics emit successive frames within milliseconds, so two
observers of one stream legitimately differ by a frame at any instant).

Two units join the ledger from this doctrine:

| # | Unit | Role · Engine | Owns |
| --- | --- | --- | --- |
| J1 | The journey layer + first journey set (after U5): the visibility/reachability resolver in `tests/setupBrowser.ts`-adjacent journey infrastructure, retrofit of the U6 login journey onto it (its recorded doctrine violations, from the U6 closing audit: CSS-ID targeting, `state: 'attached'` waits, `.is-invalid` internal reads instead of perception — each must die in the retrofit), rail click-open and keyboard-only open journeys. CARRIES from U5 audit: move the `halfmoon/css/halfmoon.min.css` import from `tests/app/browser/ApplicationView.test.ts` into `tests/setupBrowser.ts` per `tests.md` placement, rerun the whole browser project, and repair every component suite whose visibility assumptions become truthful — J1's owned list must grant those component test files, and the carry must be named in its brief or it becomes a permanent per-file idiom | `codex`→implementer · Sol (precision layer, fixed doctrine) | journey infra + integration journey files + component test files for cascade-truth repairs |
| SK1 | After the polish rounds: author `.agents/skills/orkestrel-human-journey/` (SKILL.md + one-level `references/` + `agents/openai.yaml`) with the `.claude/skills/orkestrel-human-journey/SKILL.md` bridge, in the supervisor repo, matching house skill structure and voice, written per the instruction-file laws — every line a directive with its observable trigger, no persuasion, no history. It carries ONLY what this campaign proved, each canonized finding backed by a recorded experience: the resolver design, trusted-input requirements, the purity boundary, the convergence law, the journey/transport class separation, and the failure modes J1 and the polish rounds actually hit | `implementer` · Opus (instruction voice), audited like every unit | the skill files |

SK1 is a candidate for upstream promotion into the scaffold host at the debrief; until the fleet
canon absorbs it, `scaffold audit` reads it as a foreign path — expected and recorded.

### U5 rulings (audit round 1, subject 7c0ddd3)

Verdicts: reviewer FAIL (2 broken, 2 not-evidenced), Sol FAIL (3 broken), checker 4 judgment
findings. Claims 1 (one rail/one region) and 5 (journey doctrine) confirmed by both engines.

- **Fix round (u5-brief-2, Opus writer, Sol closes):** rewrite the shell's drawer/Escape/focus
  proofs onto real `userEvent` (both engines broke the claim; `dispatchEvent`/bare `.click()`
  verified at ApplicationView.test.ts:311-539); apply the writer's StackList empty-state patch —
  four frames rendered "Open one from Workflow above" against a control the same commit deleted,
  an invalid deferral; render `operator.fault` in the authenticated shell (non-ABSENT restore
  failures retain a fault nothing shows; both lanes routed it here); convert the integration
  stack-count one-shot to a convergence wait; probe-and-report the drawer's Tab-escape path.
- **Ratified:** the `seeders.test.ts` out-of-owned edit (3 assertions). Revert ships a red
  project and splits one change across two commits; the replacements assert shell behavior the
  old badge check never covered. Breach recorded here.
- **Retained:** the restore notice renders with NO live region — not alert-styled, same
  stated-fact idiom as RunList's stale line; one voice for "a fact, not an emergency", and the
  status-line ruling forbids two regions speaking at one arrival.
- **Accepted:** the below-lg signature caption is the bare count with words in `aria-label`
  (menu-with-count idiom; the caption sweep's containment holds). U8 must read pause/warning
  glyph distinguishability at 390px without their words.
- **Capture debt before U8:** claims 2 and 3 are code-confirmed but NOT-EVIDENCED on the capture
  law. The portfolio must add: a paused-run rail (desktop light+dark, mobile), a
  roster-stream-fault rail with the "updates stopped" mark (desktop light+dark), and the restore
  notice in both states (gone, refused) at both widths — after the fix round lands, so no frame
  memorializes the StackList drift.
- **Advisories carried:** rail `aria-labelledby="runs"` names a region also holding Stack and
  the door → H6; OpenPanel's "workflow" nouns → H6; stacked stated-fact lines (notice above the
  first heading, stale line below it) need one visible order — the fix round records its choice;
  `renderFleet` stays a local single-use helper, J1 sweep candidate.

### U5 closing rounds (fix at 419aafb; toasts ruled by the user)

Fix round landed at 419aafb (real userEvent throughout the shell suite, StackList copy, the
`operator.fault` rail line, convergence count reads); full chain green — only the declared U7
parity four red, membership unchanged.

- **Sol closing audit:** claims 2–4 CONFIRMED; claim 1 BROKEN — two Escape proofs seed state
  through `attached?.open()`/`select()` instead of row presses → micro round (`u5-brief-3`,
  builder). Claim 5's provenance UNRESOLVED closed on the Orchestrator's own session record:
  the Orchestrator ran the commit; the writer's report states nothing committed.
- **Reviewer portfolio re-rule (nine new frames):** claim 3 CONFIRMED — notice and fault
  surface, voice/placement/order all hold; claim 8's StackList repair CONFIRMED in every frame;
  claim 2 one state short — closed by two further frames (mobile, drawer closed, signature
  showing paused and fault marks as bare glyphs + count), final reviewer pass rides with the
  post-toast recapture. U8 must read pause/warning glyph distinguishability at 390px.
- **USER RULING (binding, overrules the rail-top stacking call):** the restore notice and fault
  line must not reflow the rail — they become overlay toasts that stack. Unit **U5c** added:
  Opus `implementer`, owns `ApplicationView.vue` + its test; no timers (no auto-dismiss —
  facts clear reactively, plus a real dismiss control), no live region (standing), Vue-owned
  visibility, no-reflow proved. RunList's stale-updates state line stays in place (list state
  with Retry, not a notification). Serial order: micro round → U5c → J1.
- **Referral answered (Orchestrator, from source):** fault-without-notice IS reachable
  (`#capture` command failures; a failed logout cleanup). The standalone copy stands — as a
  toast the deictic gains its antecedent temporally, appearing when the action fails.
- **H6 addition (reviewer, out-of-claims, verified):** `OpenPanel.vue:28`'s grant-list branch
  drops its noun — "Authorized for unused." H6's OpenPanel patch must cover that branch with a
  number-agreeing noun ("Authorized for workflow 'unused'."), named explicitly.
- **Polish-round candidates:** triple "updates stopped" on one desktop screen (header mark,
  rail notice head, status-line tail) → U8; the run pane's Address field renders a raw JSON
  array (`["build-a"]`) → U8; the stacked "That…" openers tighten only if U5c's design finds
  it free.

### The rail footer (user ruling; unit U5d)

USER RULING (binding): the rail's bottom-left cluster — the "Logged in as… Authorized for…"
sentences, the "Open by id" disclosure, and its help line — feels out of place; the surface
should feel like a usual admin dashboard, with creative latitude. The user offered a plus-icon
button or a search bar for the door.

- **Ruling split (Orchestrator):** the search bar is H6's form — History's surface already
  carries prefix search over completed runs, so the door's terminal shape is a search field over
  discoverable runs, now user-endorsed; U5d must not build an interim search H6 replaces.
- **Unit U5d** (Opus `implementer`, after U5c, before J1): session identity leaves the rail
  footer for the banner (the dashboard idiom, near Logout); the door compacts to an icon-button
  disclosure (never primary, unchanged ruling); the grant sentences are repaired with the file
  in hand — the H6 noun carriers move here: every "workflow" noun in OpenPanel's reader-facing
  copy, and the `OpenPanel.vue:28` missing-noun branch with number agreement. H6 keeps the
  door-into-search fold and the local fault-echo removal.
- Serial order stands: micro round → U5c (toasts) → U5d (footer) → J1.

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
