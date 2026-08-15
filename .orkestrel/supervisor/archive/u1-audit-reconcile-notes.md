# U1 audit round 1 — Orchestrator reconciliation notes (in progress)

Checker returned FAIL. Two findings reproduced and ruled by the Orchestrator; lanes still out:
reviewer (Opus), analyst (Sol, thread 01a000a2).

## Checker finding 1 — claim 8, scope-honesty statement in the audit brief: REAL, carrier = this record

The audit brief said three files sit outside u1-brief.md's strict owned list; the true count is
nine plus mirrored tests. File-by-file ruling (all **in-scope fallout**, none a violation):

| File | Ruling |
| --- | --- |
| `app/browser/types.ts` | Required by types-first + centralize-by-kind: `ClientRosterInterface` et al. must live here before implementation. (Also U2-owned later — serial writers, no race.) |
| `app/browser/services/ClientRoster.ts` (new) | The criterion-5 sub-entity implementation, one class per file. The brief named the new server files but failed to pre-name this one — brief defect, not writer defect. |
| `app/browser/index.ts` | Barrel law: new reusable capability exports through the environment barrel. |
| `app/browser/validators.ts` | Centralize-by-kind: `isApplicationRun` guard lives in the designated validators file. |
| `app/browser/seeders.ts` | Consumer move of the widened roster (same class as CommandBar's). |
| `app/server/ApplicationServer.ts` (+1) | Composition wiring — the brief guessed `ApplicationRuntime.ts` as the composition point; the real one is here. `ApplicationRuntime.ts` untouched. |
| `app/browser/helpers.ts` | Already ruled: exported event resolver the generalized LiveStream requires. |
| `tests/app/setup.ts` | Already ruled: shared SSE helper in the file that owns shared test infrastructure. |
| `tests/setupBrowser.ts` | Already ruled: ScriptedClient stub gains the roster sub-entity. |

Root cause: u1-brief.md's owned list was scoped by declarations, not consumers — the exact
brief-check published in AGENTS.md 0.0.33, under-applied by the Orchestrator writing that brief.
Successor briefs for U2+ carry the corrected fallout expectation.

## Checker finding 2 — claim 10 evidence gap: SETTLED, now CONFIRMED

The checker was right that the supplied log truncated the enumeration. Orchestrator ran the full
guides project at 173dffa (appended to u1-gates.log): exactly 16 undocumented export names + 2
phantom `roster` method rows, matching the writer's declared set byte-for-byte. Nothing else red.

## Claim 6 enumerate-yourself: SETTLED

Orchestrator tree grep `\.roster(` at 173dffa: six hits, all `application.roster(principal)` —
the server-side shared projection method (claim 4's subject), not the removed client method.
Zero client `.roster()` call sites. The writer's stricter `\.roster\(\)` pattern was truthful but
narrower; the open-paren enumeration is the binding one.

## Full reconciliation (all three lanes returned; both engine lanes FAIL)

Round ruling: **FAIL — fix round 2 dispatched** (`u1-brief-3.md`, Sol thread). Per-claim:

| # | Analyst | Reviewer | Reconciled | Carrier |
| --- | --- | --- | --- | --- |
| 1 | UNRESOLVED | CONFIRMED | **CONFIRMED** — reviewer's source chain (route-agnostic chokepoint, CSRF-safe GET) + Orchestrator's posture check (no logout seam on either stream; uniform). The lanes answered different questions (soundness vs execution); one cheap 401-stream assertion added anyway | fix item 8; U2/U3 note: streams do not end on logout, browser aborts |
| 2 | UNRESOLVED (suspicion) | BROKEN | **BROKEN** — Orchestrator reproduced: 4 publish sites, no lifecycle subscription; the earlier gate failure's buffered frame was w-two's insertion publish, not a transition. Blocking for U2/U4 | fix item 1 (workflow emitter attach/detach) |
| 3 | CONFIRMED | CONFIRMED | **CONFIRMED** (both lanes, distinct attacks: parser uniqueness, LiveFrame byte-sameness, composition) | — |
| 4 | UNRESOLVED | CONFIRMED | **CONFIRMED as claimed** (reviewer found the named-grant cross-door proof the analyst missed: setup binds cookie user to `one:w-one`); the twice-written predicate both lanes flagged is real debt | fix item 2 (one pure leaf + named-grant divergence case) |
| 5 | UNRESOLVED + concurrency finding | UNRESOLVED | **UNRESOLVED → fix** — Orchestrator reproduced the `#waiting` overwrite by reading `#read()`; destroy-while-parked untested (both lanes) | fix item 3 |
| 6 | BROKEN (guide) | CONFIRMED | **CONFIRMED for U1's scope** — the stale guide is real and already carried: guides are U7's by the original brief's criterion 7; exact sites added to U7's row in REDESIGN.md | U7 |
| 7 | CONFIRMED | CONFIRMED | **CONFIRMED** (reviewer additionally attacked and dismissed the `#waiters` candidate) | — |
| 8 | BROKEN (brief count) | BROKEN (brief count + U2 collision) | **BROKEN against the audit brief, not the code** — all three lanes; file-by-file fallout ruling above; operative consequence: U2 gets a successor brief (its owned `app/browser/types.ts` already carries U1's types) | this record + u2-brief-2 |
| 9 | BROKEN (TSDoc) | BROKEN (3 naming defects) | **BROKEN** — union of both lanes: RosterFrameHandler→RosterSnapshotHandler, handlers.roster sub-entity replaces `subscribe`, `WorkflowStatus` named type, TSDoc completion, import order; plus Orchestrator ruling `started`→`created` (REDESIGN.md amended) | fix item 4 |
| 10 | CONFIRMED | CONFIRMED | **CONFIRMED** (full enumeration run by Orchestrator; reviewer's note honored — one full `npm test` at acceptance) | acceptance gates |
| 11 | BROKEN | BROKEN | **BROKEN** — reviewer's five items: (1)=claim 2; (2) close() has no production caller → delete; (3) read() forwards twice → seam collapse; (4) #pump property-sniff → event parameter + shared resolver; (5)=claim 4 | fix items 1,5,6,7,2 |
| 12 | UNRESOLVED | CONFIRMED | **CONFIRMED** — reviewer constructed the swallow attempt and showed the loop cannot absorb a removal failure (explicit throw or loud timeout); Orchestrator's worktree control aborted on a vite-config path issue and is superseded by the construction; timeout-path comment added | fix item 9 |

Findings outside claims (reviewer, both substantiated):
- **F1**: REDESIGN.md still shipped `waiting?` + waiting-badge signature ruling after U1 dropped
  the field — amended (entry shape `{id,status,paused,created,updated}`; signature derives from
  status/paused only). U4/U5 briefs must be written against the amended record.
- **F2**: `GET /roster/live` has no documentation carrier (README off-limits to U1, unowned) —
  assigned to U7's owned files in REDESIGN.md.

Dropped on the record: analyst claim-1 cross-origin Chromium demand (SameSite=Strict cookie +
GET-no-state-change + no-CORS-headers makes the run disproportionate; reviewer's chain suffices);
analyst claim-12 throwaway-checkout control (superseded by reviewer's construction).

## Round 3 (closing) — both Opus lanes PASS 5/5. U1 ACCEPTED at a261b6d.

Sub-threshold residues recorded, none forcing a round: the lifecycle test's name understates what
it now proves; `app/server/types.ts:132` says `ViewerInterface<ApplicationRoster>` where its
siblings say `RosterViewerInterface` (one-word consistency edit for any future writer in that
file); `RosterViewer.test.ts` binds the refusal message but not `name: 'TypeError'`; the
`ViewerInterface.events` remark is one shade stronger than either class guarantees when a value
is queued (refusal fires only against a PARKED read — identical in both classes, so unified).
Objective lane verified the fix-4 deviation exactly against the installed workflow package
(persistence observer holds 5 events, never pause/resume → counts 2/2/2/2/2 + 1/1).

Carried to U7 (now in its REDESIGN row): stale guide roster sites, README route table, parity
set 20+3, and `demo/showcase.html` regeneration (`npm run show`) — committed bundle still mounts
`client.roster()`.

Acceptance evidence: full chain at a261b6d — src 232/232, app 599/599, policy 17/17, guides red
on exactly the declared set (u1-gates.log FIX4 ACCEPT).
