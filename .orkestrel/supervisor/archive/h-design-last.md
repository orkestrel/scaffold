## Ruled design

### 1. Store contract

Add one method to `SupervisorStoreInterface`: `list`. Do not overload `get`, add offset paging, or expose database cursors.

The supporting types belong in `src/core/types.ts`:

- `RunRecord`: `id`, `created`, `updated`, optional `released`.
- `RunCursor`: `until`, `updated`, `id`.
- `RunListOptions`: optional `cursor`, `limit`, `prefix`, `runs`, `released`.
- `RunPage`: readonly `runs` and optional `cursor`.

All member names satisfy the single-word law.

A separate catalog record is necessary. Existing lease rows contain only owner, epoch, and expiry; unit timestamps do not cover taskless workflows and cannot identify logical completion. The catalog is updated transactionally with supervisor operations:

- First `acquire`: create the record.
- Takeover `acquire`: preserve `created`, clear `released`, advance `updated`.
- `set`: advance `updated` in the same transaction as the unit write.
- `renew`: do not advance it; heartbeats must not reorder the catalog.
- `release`: set both `updated` and `released` to the release instant.

`list` orders newest-first by descending `(updated, id)`. The first page fixes an `until` watermark; later pages retain it and use an exclusive `(updated, id)` boundary. New or newly changed records therefore do not shift rows into an in-progress traversal. No totals are returned.

`prefix` is a case-sensitive run-id prefix. `runs` restricts candidates to a supplied set without importing authorization policy into core. `released: true` selects history candidates.

The database store gets a dedicated `runs` table and composite ordering index. The memory store gets the equivalent map. Both must prove:

- Empty, one-page, multi-page, tie, prefix, candidate-set, and released filtering.
- Exact descending order and exclusive cursors.
- No duplicate or skipped rows through an unchanged traversal.
- First-acquisition `created` preservation across takeover.
- Release/reacquire transitions.
- Atomic catalog updates with lease/unit changes.
- Frozen, owned results.
- Invalid limits/cursors fail as `STORE`.
- Database calls remain on the shared `Lane`.

A listed value is not an id alone, and the server must not perform one `SupervisorStore.get` per row. It remains deliberately lightweight: workflow name and terminal status stay authoritative in `WorkflowStoreInterface`, so the application performs one bounded, sequential snapshot lookup per candidate. Duplicating those fields into the supervisor record would create two workflow authorities.

### 2. Endpoint and restart behavior

Add authenticated `GET /history`.

Accepted query parameters:

- `cursor`: opaque encoded page cursor.
- `limit`: default 25, maximum 50.
- `prefix`: optional run-id prefix.

Unknown, duplicate, malformed, or out-of-range values return `PROTOCOL`/400.

The response contains readonly `runs` plus an optional `cursor`. Each history row carries:

- `id`
- `name`
- terminal `status`
- workflow `created`
- workflow `updated`
- supervisor `released`

Only `completed`, `failed`, `skipped`, and `stopped` workflow snapshots qualify.

Authorization happens before paging:

- For `'*'`, enumerate released records normally.
- For named grants, pass those ids through `RunListOptions.runs`.
- Never return a global total, unauthorized identifier, or cursor payload containing unauthorized row data.

`SupervisorApplication.history` composes the existing supervisor and workflow stores. Snapshot joins must be sequential, not `Promise.all`: the current SQLite composition shares one driver across independent databases, and the repository already records that concurrent transactions on that arrangement are unsafe.

The route accepts both existing bearer and human-session authentication. It is a safe GET, so it requires no CSRF header. Responses retain the existing `no-store` envelope.

Opening a historical row continues through `SupervisorApplication.inspect`:

1. Use live workflow plus held run when both exist.
2. Otherwise read the persisted workflow snapshot and supervisor record.
3. Return `NOT_FOUND` if either required half is missing.
4. Never acquire a lease or hydrate a live workflow merely to inspect history.

A previous-process terminal run therefore opens read-only from SQLite. The browser must recognize the terminal snapshot and not attach a live subscription. The existing server already computes `ApplicationTail.terminal`, but the HTTP handler and browser client currently discard it; that fact must reach the operator or terminal status must be derived directly from the inspected snapshot.

### 3. Surface

History is a first-class destination from the live rail’s footer, not another list mixed into the rail and not another hierarchy inside the open run’s Stack.

On desktop:

- The permanent rail remains visible.
- Its list is explicitly headed “Live runs”.
- The footer action is “History” with “Completed runs” as supporting text.
- History occupies the content area as an explicit alternate destination.
- If a run is open, its state, selection, feed, and subscription remain intact; “Back to run” restores its pane without reopening it.

On mobile:

- History opens as the full-width content destination.
- The Runs drawer closes.
- Opening a history row returns to the run content view.

The main heading is “Completed history”. Supporting copy distinguishes the collections: live and recently ended runs are in the rail; durably completed runs are here. A freshly ended run may temporarily appear in both while rail decay completes; that overlap is intentional and labelled.

A row shows the workflow name, terminal status as text plus a glyph, run id, and ended time. The whole row is keyboard-operable and opens through the ordinary operator path. “Open by id” moves into this view as a collapsed technical disclosure.

History has all five required states:

1. Ideal: rows, search, and “Load older”.
2. Empty: no completed runs, with a route back to live runs.
3. Loading: layout-preserving skeleton rows.
4. Partial: already loaded rows remain while the failed next page shows an inline retry.
5. Error: heading, search, and open-by-id remain; the first-page failure is an inline alert with Retry.

No infinite scroll, automatic scrolling, polling, or silent reordering. A roster transition while History is open may show “History changed — Refresh”; it does not mutate the page underneath the operator.

Both themes must meet 4.5:1 for informative text and 3:1 for marks/focus chrome. Opening History moves focus to its heading; opening a row moves focus to the run heading.

### 4. Search

V1 uses server-side, case-sensitive prefix search over run ids.

The control must say “Filter by run ID”; it must not imply that names or unloaded pages are searched. Submitting or clearing the prefix resets the cursor.

Costs:

- No search is cheapest but makes the growing collection progressively harder to navigate.
- Client filtering costs little but searches only the loaded page and is therefore misleading.
- Prefix search is portable, indexable, and bounded.
- Substring or workflow-name search requires a scan, full-text structure, or a second authoritative application catalog. That is not justified in v1.

### 5. Retention

V1 owns no deletion.

- SQLite history is retained indefinitely until deployment storage is deliberately removed.
- Memory history lasts only for that process.
- There is no TTL, automatic pruning, delete endpoint, bulk action, or hidden cap.

This limit appears under the History heading and in the guide. Coordinated deletion is a separate design because it must remove the workflow snapshot, supervisor catalog, lease, units, and any retained journal state without leaving an inspectable half-record.

### 6. Implementation units

The fixed campaign order remains:

`U1 → U2 → U3 → U6 → U4 → U5 → H3 → H4 → H5 → H6 → U7 → review/audit/check → verifier`

- **H3 — core catalog, objective/nontrivial.** Owns `src/core/types.ts`, catalog helpers/validators/schema, both supervisor stores, factories, and mirrored core tests. Acceptance is complete memory/database parity for catalog lifecycle, paging, filtering, corruption, and linearization.

- **H4 — application endpoint, objective/nontrivial.** Owns app-core history contracts/constants/guards and server application, handlers, routes, and server tests. Acceptance includes bearer/session authorization, wildcard and named grants, malformed cursors, no CSRF on GET, no-store responses, no unauthorized leakage, and SQLite process-A-create/process-B-list-and-inspect proof.

- **H5 — browser mechanics, objective/nontrivial.** Owns browser types, guards, client/history transport, operator state, and corresponding tests. Acceptance includes cursor reset, load-more preservation, retry, terminal historical open without a live subscription, and restoration of the previously open run.

- **H6 — rendered surface, subjective.** Owns the History components, shell integration, advanced open disclosure, and component/browser tests. Acceptance covers the five states, focus, keyboard use, responsive behavior, both themes, explicit live/history boundary, and no layout shift.

- **U7 — parity and evidence, mechanical plus independent review.** Adds guide/API parity, seeders/showcase states, and the capture harness. Pixel proof is five states × two viewports × two themes, accessibility snapshots, plus a real Chromium/real SQLite restart journey that discovers and opens a previous-process run.

Independent Opus design review, Sol correctness audit, checker conformance, then one verifier run the repository gates.

## Strongest arguments against rulings 1–4

1. The catalog adds write amplification and another durable row that can corrupt. Enumerating leases directly would be smaller, but leases lack stable creation/release facts and cannot page taskless runs correctly.

2. `GET /workflows` would be more conventionally RESTful than `/history`. It would also blur active workflow resources with the explicitly different retained-history collection.

3. History temporarily displaces the open run’s pane. A separate window or modal would preserve visibility, but would split the one-run operator model or misuse blocking UI for ordinary navigation.

4. ID-prefix search is substantially weaker than name or substring search. Name search is the feature most likely to justify an application-owned materialized catalog later; implementing it now would duplicate workflow authority without evidence that operators need it.

## Refused

No offset paging, totals, infinite scroll, polling, client-only “global” filtering, history SSE, full unit payloads in list responses, duplicated workflow status/name in the supervisor store, multi-run tabs, automatic selection, deletion UI, TTL, compatibility shim, or silent skipping of authorization failures.

## Question that would most change the design

Is there a required finite retention or deletion policy—especially a legal or operational deadline? A “yes” would turn this from append-only discovery into coordinated destructive lifecycle work across both durable authorities.