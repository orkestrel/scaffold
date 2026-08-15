Auth already restores a live cookie without the form. Opening a workflow does not: the UI still types an id, even though `GET /roster` already lists live authorized runs.

### 1. Login flow as a human sees it

Load `/` (`app/browser/index.html`). Vue mounts a full-height shell with the wordmark, an Idle badge, and the theme switch. Login, Logout, and Workflow stay hidden. `ApplicationView` immediately calls `operator.identify()` and holds the form until that probe returns (`ApplicationView.vue:13-20`, `95-99`, `201-226`).

`identify` issues `GET /session` with `credentials: 'same-origin'` (`Operator.ts:133-148`, `Client.ts:59-62`, `172-178`). No cookie, or `AUTH`, leaves `session` undefined and is not a fault. Then the centered card appears: **Username**, **Password**, **Login**. Focus lands on the first input (`LoginPanel.vue:48-52`, `75`, `78-140`). Empty submit marks the blank field and does not call the server. A real submit `POST`s `{ name, secret }` to `/session` (`LoginPanel.vue:53-74`, `Client.ts:53-57`). Success is `204`; the client then `GET`s `/session` for `{ user, workflows, csrf }` and the shell switches to the logged-in layout with **Open a workflow** (`Operator.ts:150-167`, `ApplicationView.vue:151-157`).

Server path: assets skip auth; session middleware may mint only on `POST /session`; access then CSRF, limiter, body (`ApplicationServer.ts:79-118`, `middlewares.ts:99-137`). Login compares the secret constant-time, refuses uniformly, destroys the session on failure, clears session data, writes the user name, regenerates the id (`ApplicationHandlers.ts:86-120`). Logout is `DELETE /session` from the header button (`ApplicationView.vue:52-57`, `138-147`).

### 2. Credentials, validation, cookie/session

Two credentials, never mixed. Humans submit `APP_USERS` `name` + `secret`; each user borrows an `APP_PRINCIPALS` token (`app/core/types.ts:61-72`, `114-117`, `parsers.ts:116-170`, `173-203`). The API token is bearer-only (`Authorization: Bearer …`); MCP is bearer-only; the token never enters the browser (`middlewares.ts:103-118`, `152-167`, `helpers.ts:545-556`). Bearer and a session cookie together destroy the session and return `AUTH` (`middlewares.ts:105-109`).

The cookie is `supervisor-session`: `httpOnly`, `SameSite=Strict`, `Path=/`, host-only (no `Domain`), session-scoped (no `Max-Age`); idle/absolute expiry live in the store (`ApplicationServer.ts:79-90`, `constants.ts:40-47`, `middlewares.test.ts:133-154`). Loopback HTTP tests assert **no** `Secure` (`middlewares.test.ts:153`). `supervisor-csrf` is the readable double-submit cookie; mutations send `x-csrf-token` (`Client.ts:153-154`, `app/core/constants.ts:123`). Login regenerates the id; a refused login destroys the session; which half of the credential was wrong never crosses the wire (`ApplicationHandlers.ts:97-114`, `LoginPanel.vue:18-24`).

### 3. What persists across reloads

A returning user with a live session **skips the form**. `ApplicationView` waits on `identify` before rendering login vs shell (`ApplicationView.vue:19-20`, `95-99`, `151`, `201-203`). The page cannot read the cookie; `GET /session` is the only test (`Operator.ts:133-148`, `types.ts:691-699`). Success restocks CSRF so commands work immediately (`Client.ts:59-62`).

The opened workflow does **not** come back. `StorageOperatorStore` keeps only selection and collapsed rows, keyed by workflow id, and only after a successful open (`StorageOperatorStore.ts:9-22`, `types.ts:777-784`, `Operator.ts:206-214`). `identify` never calls `open`. Relogin reopens only if `#workflow` is still in memory (expiry while watching, not a full reload) (`Operator.ts:166-167`, guide `1798-1804`).

### 4. Automation candidates

Already automatic: cookie restore, CSRF after `GET /session`, same-origin credentials, uniform auth refusal, IP-keyed login limiter (`Client.ts:172-178`, `ApplicationServer.ts:75-78`, `LoginPanel.vue:27-34`).

Still typed: username and password. The UI never prefills a name; the roster is server env, not a browser fact. Session `workflows` are **grants**, often `['*']`, shown as help text, not a picker (`OpenPanel.vue:17-26`, `ApplicationSession` at `app/core/types.ts:106-111`). The typed workflow id is the main ask the system already knows another way: `GET /roster` returns live authorized `runs` (`ApplicationRoster` at `app/core/types.ts:100-104`). Local storage knows previously opened ids but has no index API.

### 5. Where the workflow id is typed and what it does

Only `OpenPanel.vue:49-58`: one text field, submit **Open**. `useOperator` is just `inject` (`useOperator.ts:26-31`). `open()` trims the id and calls `operator.open(named)` (`OpenPanel.vue:27-41`).

`Operator.open` is the whole viewer for **one** id: `GET /workflows/:workflow` (inspect), restore stored view, `GET …/journal` (tail), `GET …/live` (SSE) (`Operator.ts:187-232`, `Client.ts:89-114`). The left stack is that run’s phases/tasks, not a catalog. A second open replaces the first (`Operator.ts:50`, `70-71`, `187-189`). `inspect` serves a live run or a retained ended snapshot (`SupervisorApplication.ts:126-153`). The browser has no start-workflow form; `POST /workflows` exists only on the client (`Client.ts:83-87`).

### 6. Can the server enumerate workflows?

**Yes, for live authorized runs.** `GET /roster` → `SupervisorApplication.roster`: in-memory `#workflows` ∩ `supervisor.runs.run(id)` ∩ principal grants (`SupervisorApplication.ts:62-73`, `ApplicationHandlers.ts:144-154`, `ApplicationRoutes.ts:35-38`). `RunManager.runs()` lists held runs in acquisition order (`RunManager.ts:37-44`).

**No store-wide index.** `SupervisorStoreInterface` is `acquire` / `renew` / `get` / `set` / `release` by id (`src/core/types.ts:630-693`). `DatabaseSupervisorStore` and `DatabaseBriefStore` are point access; briefs are instruction lineage, not a workflow catalog. `inspect` can still open a retained ended id that `roster.runs` omits (`SupervisorApplication.ts:148-153`). `CommandBar` already fetches `/roster` once on mount and uses only `executors`, never `runs` (`CommandBar.vue:178-181`, `58-62`).

### 7. Live transports and “a new workflow appeared”

Human live path is per-id fetch-SSE: `LiveStream` → `GET /workflows/:workflow/live`, `credentials: 'same-origin'`, `Accept: text/event-stream` (`LiveStream.ts:8-46`, `app/core/constants.ts:89`). Server: `ApplicationHandlers.live` → `LiveBroker.watch` → `LiveViewer` (`ApplicationHandlers.ts:265-276`, `LiveBroker.ts:67-76`). Frames are only `observe` | `transcript` | `terminal` | `gap`, each already tagged with a workflow id (`app/core/types.ts:151-189`). `LiveViewer` drops frames for any other workflow (`LiveViewer.ts:69-71`).

`WorkflowTranscript` publishes provider text; `TerminalOutput` tees stdout (`WorkflowTranscript.ts:11-15`). `InferenceStream` is NDJSON on `/inference/:vendor`, not workflow catalog (`InferenceStream.ts:6-44`). Nothing pushes “a new workflow appeared.” `LiveBroker.publish` fans out to every viewer, but the closed `LiveFrame` union and per-id route cannot carry a catalog event without a new type and a new subscription. `GET /roster` is a snapshot, not a stream.

### 8. How the feed consumes live data

`Operator.#subscribe` appends each frame through `#project` into `FeedManager` (`Operator.ts:340-348`, `438-476`). `FeedManager` dedupes by id, bounds retention, exposes `sequence` so a trim still counts as an arrival (`FeedManager.ts:26-58`). `useFeed(row)` filters by stack lineage; gaps always show (`useFeed.ts:28-46`). `FeedList` watches `sequence` + visible length, stick-to-bottom, register checkboxes (`FeedList.vue:25-32`, `84-88`, `92-144`). A live workflow list would follow roster/session, not this per-run feed. Architecture: no polling (`Operator.ts:34-37`).

### 9. Bootstrap / theme / conventions

Bootstrap **5.3.8** via **Halfmoon 2.0.2** (`halfmoon.min.css`), plus **bootstrap-icons 1.13.1**. No project SCSS (`package.json:117-119`, `main.ts:1-2`). Theme is `document.documentElement.dataset.bsTheme` (`'dark' | 'light'`), defaulting to `prefers-color-scheme` (`useTheme.ts:21-41`). `ThemeToggle` is `btn btn-sm btn-outline-primary` with sun/moon (`ThemeToggle.vue:17-24`).

Conventions to match: Bootstrap utilities and components (`form-control`, `form-label`, `btn-primary`, `btn-outline-secondary`, `card`, `alert`, `spinner-border`, `invalid-feedback`, `form-text`, `badge`, `navbar`, `container-fluid`, `bi bi-*`), `aria-*` on every control, icons beside captions, `visually-hidden-focusable` skip link. `index.html` has no `data-bs-theme`; JS sets it after mount.

### 10. App shell — where a live list would sit

`ApplicationView`: header (name, live/paused/idle badge, theme, Workflow gate, Logout) → if logged in, `#workflow` section with `OpenPanel` → split **StackList** (left) / **ContentPane** (right) (`ApplicationView.vue:104-199`). The gate hides once the stack has rows; Workflow toggles it back (`ApplicationView.vue:62-68`, `126-137`, `152`).

`ContentPane` is the selected row: `CommandBar` + tier view + `FeedList` (`ContentPane.vue:27-51`). `CommandBar` is pause/resume/stop/steer/reply for the open run, not chrome (`CommandBar.vue:184-196`). A live workflow list belongs in the `#workflow` gate (replacing the typed field), not in the stack (one run’s hierarchy) and not in `CommandBar`. The operator still holds only one open workflow.

---

### Constraints most likely to bind a redesign

1. **Two different “workflow lists.”** `session.workflows` is principal grants (often `*`). `roster.runs` is this process’s live authorized ids. Typed `open` also inspects retained ended runs that `roster.runs` omits. Auto-listing only live runs changes what can be opened.

2. **Liveness has no catalog transport.** SSE is per workflow id; `LiveFrame` has no appear/disappear event; `/roster` is a one-shot GET (and `CommandBar` already calls it, ignoring `runs`). A live list needs a new subscription or a new frame kind. Polling is out of contract.

3. **The operator is one-run.** Stack, feed, selection, and SSE all belong to a single `#workflow`. A live list is a picker into that model, not a second stack. Reload restores the session, not the last id.

**Surprising:** the catalog endpoint and client method already exist (`GET /roster`, `Client.roster()`). The typed id in `OpenPanel` is the only reason humans still type one. Session restore is already the automated half of auth; username/password are the remaining human secret, by design (httpOnly cookie, no token in the page).
