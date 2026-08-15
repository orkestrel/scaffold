## Ruled design

### 1. The live workflow surface

Replace the typed-ID gate at `#workflow`. That is the correct seat: it already mediates entry into a run and disappears when a run opens ([ApplicationView.vue:62–68](/workspace/supervisor/app/browser/ApplicationView.vue:62), [ApplicationView.vue:126–157](/workspace/supervisor/app/browser/ApplicationView.vue:126)). Do not place the roster inside `StackList` or `CommandBar`: the operator owns one workflow at a time, and opening another replaces that workflow’s snapshot, stack, feed, and stream ([Operator.ts:187–232](/workspace/supervisor/app/browser/controllers/Operator.ts:187)).

Desktop:

```text
┌ Supervisor ─────── [● 3 live · 1 new] [theme] [logout] ┐
├ Live workflows ─────────────────────────────────────────┤
│ ● build       Live       Viewing                        │
│ ● release     Live       Open                           │
│ ○ audit       Ended      Open final state               │
│                                      [Open by ID ▾]      │
├─────────────────────────────────────────────────────────┤
│ workflow stack              │ selected workflow detail  │
└─────────────────────────────────────────────────────────┘
```

On mobile, activating the fleet control opens the roster as a full-height layer below the navbar. The navbar, theme control, and logout remain reachable. It closes after a row opens. When no workflow is open, it is the initial authenticated view.

A row shows only facts the contract supplies:

- Workflow ID.
- “Live,” because presence in `runs` proves that fact.
- “Viewing” when its ID equals the operator’s open snapshot.
- “New” as browser-local acknowledgement state.
- “Ended” after local decay.

Do not add progress, owner, start time, or task summary to the roster contract. The current roster contains only run IDs and executor capabilities ([app/core/types.ts:100–104](/workspace/supervisor/app/core/types.ts:100)), and its server projection derives those IDs from currently live application runs ([SupervisorApplication.ts:62–72](/workspace/supervisor/app/server/SupervisorApplication.ts:62)).

The five states are:

| State | Ruling |
|---|---|
| Ideal | A `list-group` of live workflow buttons in acquisition order. Opening a row calls the existing one-run `operator.open(id)` path. |
| Empty | “No workflows are live. New runs will appear here.” Keep “Open by ID” below it. |
| Loading | Skeleton rows that preserve the panel’s shape, hidden from assistive technology, plus a calm loading status. |
| Partial | Preserve the last good roster. Add an inline warning: “Live updates stopped. This list may be out of date.” Include Retry. |
| Error | When no snapshot ever arrived, show an inline error and Retry without removing “Open by ID.” An `AUTH` response exits to login instead of becoming a roster error. |

New runs append at the bottom. Never reorder existing rows, auto-scroll, auto-open, or expand a collapsed roster. When collapsed, the chrome control changes to “4 live · 1 new.” Opening the roster clears the new count.

An ended run decays instead of vanishing immediately:

- Keep the open run pinned as “Ended” and preserve its final detail and current selection.
- Keep other ended rows in place until the roster closes or reloads, capped at the 20 most recent.
- Never evict the focused row. Remove the oldest non-focused ended row first when the cap is reached.
- Do not select another workflow automatically.

The semantic structure is a plain list, not an ARIA feed or hand-built listbox. Its live container exists empty before the first result and uses `aria-live="polite"`, `aria-relevant="additions removals"`, and `aria-atomic="false"`. Apply one DOM update per coalesced roster snapshot. No continuous pulse or row motion is required. If the subjective lane elects a Bootstrap `.fade`, it must disappear under reduced motion.

Subjective territory begins with icon choice, exact copy, spacing, type hierarchy, status variants, and the visual strength of “New” and “Ended.” It may not alter the seat, ordering, five states, focus continuity, no-scroll rule, or the facts shown in a row.

### 2. The roster-liveness capability

#### Exact wire contract

Add `GET /roster/live`, named by `APP_ROSTER_LIVE_PATH`.

The response is SSE. Every event has:

- SSE event name: `roster`
- SSE data: one complete `ApplicationRoster` JSON value

Do not introduce `RosterFrame`. `ApplicationRoster` already has the exact complete-state shape: readonly `runs: readonly string[]` and readonly `executors: readonly Executor[]` ([app/core/types.ts:100–104](/workspace/supervisor/app/core/types.ts:100)). A second identical type would be a rename-only wrapper.

Add one declaration to `app/core/types.ts`:

| Type | Exact members |
|---|---|
| `RosterViewerInterface` | readonly `events: AsyncIterable<ApplicationRoster>`; `close(): void`; `destroy(): void` |

All members are single words. There is no decorative discriminant, timestamp, sequence, change verb, gap arm, or duplicated authorization field.

#### Broker and viewer mechanics

Keep `LiveFrame` unchanged. It is a closed workflow-event union of `ObserveFrame`, `TranscriptFrame`, `TerminalFrame`, and `GapFrame` ([app/core/types.ts:151–189](/workspace/supervisor/app/core/types.ts:151)). Extending it would force roster state through a viewer that rejects other workflow IDs ([LiveViewer.ts:69–71](/workspace/supervisor/app/server/LiveViewer.ts:69)), a browser parser that requires SSE names to match `frame.source` ([LiveStream.ts:90–104](/workspace/supervisor/app/browser/services/LiveStream.ts:90)), the operator’s four-arm feed projection ([Operator.ts:440–475](/workspace/supervisor/app/browser/controllers/Operator.ts:440)), and MCP’s workflow-notification path ([MCPProjection.ts:180–195](/workspace/supervisor/app/server/MCPProjection.ts:180)). That is the wrong semantic union.

Instead:

- `LiveBrokerInterface` gains readonly child property `roster: RosterBrokerInterface`.
- `RosterBrokerInterface` has `count`, `watch(grants)`, `publish(roster)`, and `destroy`.
- `RosterFrameHandler` accepts one `ApplicationRoster`.
- `RosterViewerOptions` has `grants`, `roster`, `attach`, and `release`.
- `RosterBroker` and `RosterViewer` are separate one-class files, composed by `LiveBroker`, not subclasses of the workflow viewer.

`watch` receives a copied grant list, never a `Principal` or bearer token. Each viewer filters the broker’s complete process roster against those grants. `*` means all current runs. Executor capabilities pass through unchanged.

`SupervisorApplication` publishes:

1. An initial empty roster after executors are registered.
2. A new complete roster immediately after the workflow enters `#workflows`. That map insertion currently establishes the live application run ([SupervisorApplication.ts:109–115](/workspace/supervisor/app/server/SupervisorApplication.ts:109)).
3. A new complete roster after the workflow stream drains and the workflow leaves both live maps ([SupervisorApplication.ts:253–262](/workspace/supervisor/app/server/SupervisorApplication.ts:253)).

Use one private roster projection for both `GET /roster` and broker publication so snapshot and stream cannot compute membership differently.

Each `RosterViewer` holds at most one pending payload. A newer complete roster replaces the pending one. A waiting consumer receives it immediately. Identical filtered rosters emit nothing. The server pump uses the existing socket-drain discipline: when `write` refuses, park on `drain` before pulling again ([ApplicationHandlers.ts:297–315](/workspace/supervisor/app/server/ApplicationHandlers.ts:297)). No gap event is needed because every payload replaces the whole state.

This intentionally coalesces presence, not history. A workflow that starts and ends entirely while a slow consumer is blocked may never be painted. Durable audit belongs to workflow records, not the live roster.

#### Browser composition

Replace the `Client.roster()` method with a roster sub-entity:

| Type | Exact surface |
|---|---|
| `ClientRosterInterface` | `read()` returns the current `ApplicationRoster` result; `watch(signal)` returns `AsyncIterable<ApplicationRoster>` |
| `ClientInterface` | readonly property `roster: ClientRosterInterface` |

Update every consumer atomically. `CommandBar` currently fetches the roster once and uses only `executors` ([CommandBar.vue:58–62](/workspace/supervisor/app/browser/components/CommandBar.vue:58), [CommandBar.vue:178–181](/workspace/supervisor/app/browser/components/CommandBar.vue:178)); it should consume the operator’s shared roster state instead.

Add a browser `RosterManager` independent of the operator’s per-workflow generation. It owns the roster stream, last good snapshot, live fact, and roster fault. Opening a workflow must not abort it. Login or successful session identification starts it; logout, session invalidation, and operator destruction abort it. The manager exposes enough independent facts for the UI to derive loading, partial, and error rather than storing a second state label.

Generalize `LiveStream` to a guarded typed SSE stream and reuse it for both workflow and roster events. Do not duplicate the parser. The current implementation already supplies same-origin credentials, no-store fetches, cancellation, content-type checks, bounded incremental parsing, and typed refusal mapping ([LiveStream.ts:21–125](/workspace/supervisor/app/browser/services/LiveStream.ts:21)).

#### Authentication, CSRF, and expiry

The route uses the existing middleware stack. Authentication still resolves either bearer or session credentials before routing ([ApplicationServer.ts:102–118](/workspace/supervisor/app/server/ApplicationServer.ts:102), [middlewares.ts:99–138](/workspace/supervisor/app/server/middlewares.ts:99)). The browser uses only its SameSite session cookie.

`GET /roster/live` is CSRF-safe. The existing CSRF battery expressly treats `GET`, `HEAD`, and `OPTIONS` as safe while still authenticating them ([middlewares.ts:152–178](/workspace/supervisor/app/server/middlewares.ts:152)).

Authorize once at the SSE handshake, matching `/workflows/:workflow/live`. Session idle expiry or logout in another tab does not revoke an already-open stream. The viewer retains only copied grants, not the session or token. Local logout aborts both browser streams immediately. The next command, explicit Retry, or reconnect after expiry receives `401`; the operator clears its session while preserving the last workflow view. This matches the existing stream’s deliberate handshake-only posture documented at [guides/src/supervisor.md:741–746](/workspace/supervisor/guides/src/supervisor.md:741).

Do not reconnect on a timer. A broken roster stream enters partial or error state and offers a keyboard-reachable Retry.

### 3. Login ergonomics

Keep the credential model and existing native autofill wiring. The form already contains both fields, uses `autocomplete="username"`, `type="password"`, and `autocomplete="current-password"` ([LoginPanel.vue:78–108](/workspace/supervisor/app/browser/components/LoginPanel.vue:78)). Add no paste handlers and no app-level username memory.

Change refusal presentation:

- Empty-submit validation still marks only each empty field invalid and retains its inline message.
- A server `AUTH` refusal marks neither field invalid and sets neither field’s `aria-invalid`. The server does not reveal which credential failed.
- Render one form-level `alert alert-danger` with `role="alert"`: “Login refused. Check the username and password, then try again.”
- Focus the username field after refusal.
- Preserve both entered values for retry.

This removes the current false attribution where both fields receive `is-invalid` ([LoginPanel.vue:82–106](/workspace/supervisor/app/browser/components/LoginPanel.vue:82)) while the shared refusal is merely an `invalid-feedback` block without alert semantics ([LoginPanel.vue:117–119](/workspace/supervisor/app/browser/components/LoginPanel.vue:117)).

Rely on browser/password-manager autofill only. Do not store the username in local storage.

After reload, restore the session and land on the live roster, not inside the last workflow. The existing session probe already restores authentication without opening a workflow ([Operator.ts:133–148](/workspace/supervisor/app/browser/controllers/Operator.ts:133)). Stored views are point-addressed by workflow ID and contain selection/folds, not a “most recent workflow” index ([StorageOperatorStore.ts:42–74](/workspace/supervisor/app/browser/stores/StorageOperatorStore.ts:42), [app/browser/types.ts:777–784](/workspace/supervisor/app/browser/types.ts:777)). Do not add another persistence pointer merely to bypass the new primary surface.

Cut the sentence “Both are sent once and exchanged for a session…” from the form. It is implementation copy, not action guidance. The security posture remains documented outside the critical login path.

“More automated” therefore means: browser autofill, automatic session adoption, automatic roster subscription, live arrivals, and one-click opening. It does not mean secret persistence or implicit workflow selection.

The subjective lane owns the final alert wording and spacing, but not the refusal semantics, focus target, autocomplete tokens, paste support, or persistence ruling.

### 4. The ended-run door

Keep manual ID entry as a secondary disclosure named “Open by ID.”

This is required because `inspect` can return retained workflow and supervisor state after the run leaves the live map ([SupervisorApplication.ts:126–153](/workspace/supervisor/app/server/SupervisorApplication.ts:126)), while the supervisor store offers only point access through `get(id)` and no catalog operation ([src/core/types.ts:630–693](/workspace/supervisor/src/core/types.ts:630)).

Do not pretend the live roster is history. Do not add an ended-run listing without a durable index and explicit retention/search policy.

Cost: one technical-looking secondary affordance and its absent-ID error remain. Keep it subordinate, collapsed by default, and always available in empty/error states.

### 5. The signature

Use the fleet pulse in the navbar, but make it a static disclosure control rather than ambient animation:

- Live glyph.
- Visible count: “3 live.”
- Pending acknowledgement: “3 live · 1 new.”
- Partial state: “3 known · updates stopped.”
- Loading state: “Connecting.”
- Activating it opens the roster.

This replaces the generic “Workflow” control and the current pulse, which reports only whether the one open workflow stream is live, paused, or idle ([ApplicationView.vue:30–45](/workspace/supervisor/app/browser/ApplicationView.vue:30), [ApplicationView.vue:114–137](/workspace/supervisor/app/browser/ApplicationView.vue:114)).

Use only Bootstrap component structure and utilities. Keep a text count visible below `sm`; do not collapse the whole signature to an unexplained icon. Use a glyph, not an empty badge. Measure text at 4.5:1 and the mark/focus chrome at 3:1 against the shipped Halfmoon cascade in both themes.

The subjective lane owns the exact icon, Bootstrap variant, and typographic emphasis. Continuous pulsing, custom CSS, and rung-4 treatment are outside the ruling.

### 6. Unit decomposition

| Order | Unit and ownership | Owned files | Independent acceptance | Pixel proof |
|---|---|---|---|---|
| 1 | Roster protocol — objective specification by Sol; builder implementation | `app/core/types.ts`, `constants.ts`; server `types.ts`, `LiveBroker.ts`, new `RosterBroker.ts`, new `RosterViewer.ts`, `SupervisorApplication.ts`, `ApplicationRuntime.ts`, `ApplicationHandlers.ts`, `ApplicationRoutes.ts`, factories/barrels; server tests | Initial snapshot; grant filtering; start/end publication; complete-state coalescing; slow-reader drain; disconnect release; authenticated GET; CSRF exemption; expiry posture; no polling | Later integrated capture must show a row appear and end without reload or typed ID. |
| 2 | Browser transport and state — objective specification by Sol; builder implementation | Browser `types.ts`, `validators.ts`, `LiveStream.ts`, `Client.ts`, new roster service/manager, `Operator.ts`, factories, seeders, `CommandBar.vue`; focused tests | Guarded SSE parsing; independent roster/workflow abort lifetimes; login/identify start; logout/expiry cleanup; last-good retention; no duplicate roster fetch; AUTH transition | Captures must distinguish loading, empty, populated, partial, and initial error. |
| 3 | Live surface, ended door, and chrome signature — subjective specification by Opus within this contract; builder implementation | New `RosterPanel.vue`; remove or replace `OpenPanel.vue`; `ApplicationView.vue`; component/integration tests | Row opens the one-run operator; append-only arrivals; no viewport movement; decay rules; selection continuity; manual ID disclosure; live-region semantics; reduced motion | Both viewports and themes for all five states; expanded/collapsed roster; arrival while collapsed; open run ending; keyboard focus retained. |
| 4 | Login treatment — subjective specification by Opus within fixed semantics; builder implementation | `LoginPanel.vue`, login component and integration tests | Shared alert; no false field invalidity; username focus; tokens intact; paste works; no username storage; help text removed | First load, filled, refused, retry, and successful login in both viewports and themes; accessibility snapshot must expose one alert. |
| 5 | Mechanical parity and harness — builder | Guides, route/type/export inventories, showcase/seeders, integration harness, capture scripts | Guide parity, route inventory, all affected real-server tests, prescribed gates | One named portfolio containing both themes and viewports, accessibility snapshots, interaction log, and console log. |

Run the first capture-evidence round after unit 5. Reconcile all three lanes against that same portfolio. Apply any confirmed objective fix before subjective treatment fixes, recapture after each accepted unit, and require all lanes to converge against the same final portfolio.

## Strongest argument against my rulings on areas 1–4

1. A roster that collapses after opening a workflow still makes arrivals indirect: the operator sees a changing navbar count rather than the rows themselves. A permanently visible desktop rail would serve continuous fleet monitoring better, but it would compete with the existing one-run stack and materially redesign the shell.

2. Complete-state coalescing can erase a workflow that starts and ends before a slow viewer receives a frame. If the product expects the roster to be an audit feed, this contract is wrong; it would need durable lifecycle events, ordering, replay, and gap semantics.

3. Landing on the roster after reload adds one click for an operator who nearly always returns to the same long-running workflow. Automatic reopen would provide stronger continuity, especially on a dedicated workstation.

4. Keeping “Open by ID” preserves the technical vocabulary and failure path the owner called cumbersome. A durable, searchable ended-run catalog would be more humane, but the current stores cannot enumerate it and building one is a larger capability.

## What I would refuse to build

- Polling `/roster`, timed refresh, or silent reconnect loops.
- A roster arm added to `LiveFrame`.
- Edge-only `started`/`ended` events without an initial complete snapshot and replay rule.
- A browser-visible bearer token or weakened session/CSRF policy.
- Automatic opening, selection, scrolling, or reordering when a run appears.
- Field-specific login blame that the server does not reveal.
- App-level username or password persistence.
- A fake ended-run “history” derived only from the current process roster.
- A hand-built combobox for workflow IDs.
- Continuous pulse animation, custom rung-4 CSS, or unmeasured theme colors.
- An implementation unit that lacks a real-server proof and the required capture portfolio.

## The single question whose answer would most change the design

Must a human be able to discover retained ended workflows without already knowing their IDs?

A “yes” requires a durable catalog with enumeration, authorization, retention, and search—not merely roster liveness—and would replace the secondary manual door with a real live/history surface.