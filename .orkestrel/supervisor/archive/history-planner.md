# H-DESIGN subjective lane report — planner (Opus 5)

Recovered verbatim from the agent task result (task a43d5d71e5f1b8986), filed beside
its brief per dispatch law.

---

I hold the **subjective lane** (`planner`, Opus 5). Ruled design over the brief's six items follows.

Ground read: `/home/user/scaffold/tmp/redesign/history-brief.md`, `/home/user/scaffold/.orkestrel/supervisor/REDESIGN.md`, `absorb-report.md`, `capture-report.md`, `research-report.md`, the captures, `/home/user/scaffold/.agents/skills/enterprise-bootstrap/SKILL.md`, and first-hand code: `/workspace/supervisor/src/core/types.ts`, `/workspace/supervisor/app/server/SupervisorApplication.ts`, `/workspace/supervisor/app/server/ApplicationRoutes.ts`, `/workspace/supervisor/app/browser/constants.ts`, `/workspace/supervisor/app/browser/helpers.ts`, and the installed `@orkestrel/workflow` declaration at `/workspace/supervisor/node_modules/@orkestrel/workflow/dist/src/core/index.d.ts`.

---

# Design

## The organising decision

**History is not a second list. It is the whole list, and the live rail is its head.**

The rail becomes one column with two labelled blocks, top to bottom:

- **Now** — the live roster the main redesign already bought (≤5 rows, ended runs decaying in place, the pinned open run, the collapsed "Open by id" door).
- **All runs** — every run this supervisor has kept, newest activity first, searchable, paged.

A live run appears in both. That is containment, not duplication, and it is the ruling that answers the brief's "the operator never wonders which list they are looking at". The blocks are labelled by **time** ("Now" / "All runs"), never by **set** ("Live" / "Ended"). A partition would have to model decay — a client-side timing fact the server cannot see — so its boundary would move on every reload and the same run would appear in different places at different times with no explanation. Containment is stable across reloads: All runs always has everything.

Two rules make containment legible rather than confusing:

1. **A row that is live renders its status from Now, not from the archive.** The browser already holds the rail snapshot. `paused` is runtime-only truth (`/workspace/supervisor/app/core/types.ts:77` — "retained durable snapshots are never paused"), so without this rule a paused run reads "Paused" in Now and "Running" in All runs, six inches apart. Derived from state already in hand; no request, no drift.
2. **A run that ends live and is not in the loaded archive set is prepended to All runs by the browser**, from the rail's own data. No fetch, no second channel, containment stays true while you watch.

## 1. The store contract — what the surface needs

Precision is the objective lane's. The surface's requirements are these, and they are firm:

- **One member, `list`.** Verb, one word, consistent with `acquire` / `renew` / `get` / `set` / `release`. Options bag follows the file's existing `{X}Options` shape (`LeaseOptions`, `JournalOptions`). I considered `runs()` for symmetry with `RunManager.runs()` and reject it: that member set is verbs, and a noun accessor there reads as a property.
- **The ordering key must be the instant the row displays.** This is the hard requirement. If the store orders by `Lease.expiry` while the row shows `WorkflowSnapshot.updated`, the displayed times run non-monotonically down a list labelled "newest first", which is a visible defect. Fix it by making the store's key the run's **last durable activity**, and by putting that same instant on the row.
- **The listing carries, per run: the id, the last-activity instant, and the first-activity instant.** Those three are all inside the supervisor store's own data (unit `created` / `updated`, `Lease` as the fallback for a run with no units). From them the row renders "Last activity 2h ago" and "Ran 4m 12s" with no second source and no second truth.
- **`name` and `status` are joined, not stored.** They live in `WorkflowSnapshot` (`id`, `name`, `description?`, `status`, `created`, `updated`, `phases`) in `@orkestrel/workflow`'s store, which is a foreign contract we cannot extend. `SupervisorApplication` already reads both stores for `inspect` (`/workspace/supervisor/app/server/SupervisorApplication.ts:148-153`) and both sit on one SQLite driver when `APP_STORE` is a path (`ApplicationRuntime.ts:131-135`). One batched point read per row per page — 20 reads inside one request, not N reads across the collection. **I refuse to denormalize name or status into the supervisor store**; that is a second copy of state another store owns, and it drifts.
- **Ordering is total.** Last activity descending, ties broken by id. Without the tie-break the cursor is not stable and a row can appear twice or be skipped.
- **Continuation, not offset.** Offset over a collection that grows at the head shifts rows between pages. The client must be able to ask for "the next 20 after this point" and get each row exactly once under concurrent insertion.
- **The last page is the only short page.** Grant filtering happens before paging, inside the listing, so a narrow-grant principal never sees a short page that reads as the end. This is the thing most likely to be botched and it is worth a dedicated test.
- **Search is one optional term, matched case-insensitively as a substring of the run id, applied before paging.** Rationale under item 4.
- **No total count.** It answers no operator question, and it puts an obligation on both stores for a number nobody acts on. Adding it later is an optional field on the response — no shim.

Both stores prove the same behaviour: `/workspace/supervisor/src/core/stores/MemorySupervisorStore.ts` and `/workspace/supervisor/src/core/stores/DatabaseSupervisorStore.ts`.

## 2. The endpoint

**`GET /workflows`** — the collection route that already exists for `POST` (`APP_WORKFLOW_PATH = '/workflows'`, `/workspace/supervisor/app/core/constants.ts:75`). A REST collection whose `POST` exists and whose `GET` is missing is the anomaly; a new `/history` or `/catalog` noun would invent a second name for runs.

- **Authorization: identical to `/roster`.** Session or bearer principal, filtered against `principal.workflows` with `'*'` meaning all — the same rule `SupervisorApplication.roster` applies at `SupervisorApplication.ts:63-73`. Filtering is server-side and pre-paging; a principal must not learn an id it cannot open.
- **CSRF: none.** It is a read. Mutations carry `x-csrf-token`; `/roster` and `/workflows/:workflow` do not, and the cookie is `SameSite=Strict`. Matching the existing reads is correct and adding a header here would be a lone exception nobody can explain.
- **Paging wire: query parameters on the same call** — a continuation token and the search term. Opaque to the browser; the browser stores it and hands it back.
- **Server-side composition:** `SupervisorApplication.catalog(principal, page)` reads the store's listing, batches the `snapshots.get` join over the page, applies grants, returns the page plus its continuation. Handler in `ApplicationHandlers`, route registered in `ApplicationRoutes`.
- **Opening a long-completed run from a previous process needs no new path.** `inspect` already falls back to `snapshots.get(workflow)` + `store.get(workflow)` and returns the durable snapshot with `paused: false` (`SupervisorApplication.ts:148-153`). A catalog row opens through exactly the `open(id)` the ended door uses. **I refuse to build a second open path.** Two consequences to state where readers meet them: under `APP_STORE=memory` nothing survives a restart, so All runs is empty after one; and a record present in one store but not the other already produces two distinct refusals ("workflow snapshot" / "supervisor record") that the surface must render as an error on the row's open, not as a silent nothing.
- **The listing must not include ids that `inspect` would refuse.** A row you cannot open is worse than an absent row. The join already reads the snapshot, so a run with no snapshot is excluded by construction — say so in the acceptance criteria rather than leaving it to luck.

## 3. The surface

**Placement.** All runs is a section of the rail, below Now, in the same scroll column. At ≥ `lg` the rail is the permanent column; below `lg` it is the `offcanvas-lg` drawer, and All runs sits inside it. One navigation surface, one scroller, no nested scroll container, no sticky chrome, no second overlay. Scrolling past Now to reach the archive is one flick and is exactly what containment predicts. The persistent live signal is the navbar fleet readout the main redesign already bought — the rail's scroll position does not have to carry it.

**The row.** A `list-group-item-action` button inside a `list-group list-group-flush`, two lines:

```
● Completed   capture-real
              Last activity 2h ago · Ran 4m 12s
```

- **Primary: the id**, `font-monospace`, truncating. The id is the operator's handle everywhere in this product — it is what `open` takes, what the ended door asks for, what the pane prints as `Address`, and what gets pasted into a message. Monospace is information here, not decoration: it makes `capture-absent-1` and `capture-absent-4` scannable.
- **Secondary: the name**, on the id's line in `text-body-secondary`, **only when it differs from the id**. The captures show they do differ ("Capture workflow" vs `capture-real`), and showing both when they match is noise.
- **Status: word plus colour, never colour alone.** Reuse `deriveTone(status)` from `/workspace/supervisor/app/browser/helpers.ts:333` — the file's own TSDoc calls `ROW_TONE` "the single place a status becomes chrome", and its measured contrast notes (`/workspace/supervisor/app/browser/constants.ts:16-50`) already pay the 4.5:1 worded-badge bar in both themes. A catalog row has room for the word, so it takes the badge, not the wordless `ROW_MARK` glyph. `StackStatus` is a superset of `LifecycleStatus`, so no new map and no new vocabulary: `pending` / `running` / `completed` / `failed` / `skipped` / `stopped`.
- **Time: "Last activity 2h ago"**, from the listing's ordering key — the same instant the list is sorted by. `&lt;time datetime&gt;` with the absolute instant, and the absolute instant in `title`.
- **Duration: "Ran 4m 12s"**, last activity minus first activity, **rendered only for a terminal status**. A running row shows "Started 2h ago" instead. Derived; no extra field.
- **Relative time is computed at render and does not tick.** No `setInterval`, no timer per row — a stale "2h ago" is harmless and a polling clock is an architecture violation. Say this in the brief; an implementer will otherwise reach for a timer.
- Not on the row: phase counts, unit counts, executor names, owner, epoch, failure text. Opening it is what those are for.

**How it opens.** Click or Enter calls the same `open(id)` the ended door calls. Below `lg` the drawer closes on open, matching the rail's fixed behaviour. The currently open run is marked `aria-current` in All runs as well as in Now — two lists, one `aria-current` each, which the skill permits per list.

**No motion.** The archive does not stream, so there are no arriving rows to highlight, no fade, and `prefers-reduced-motion` is satisfied by construction — the same resolution the main redesign took for the signature.

**Loading policy.** The first page loads once with the authenticated shell, beside the roster subscription. It never refreshes on its own. **All runs is a snapshot of the archive at load.** The question "did my run finish" is answered by Now; the archive answers "what happened before". The prepend rule above keeps containment true without a second live channel.

**The five states**, all in the All runs block, both viewports, both themes:

| State | What renders | Copy |
| --- | --- | --- |
| Ideal | rows + "Load more" while a continuation exists; the button's absence is the end marker | — |
| Empty, nothing kept | one line, no call to action the UI cannot perform | "No runs kept yet. A run appears here as soon as one starts, however it was started." |
| Empty, no match | distinct from the above, with a way out | "No run matches 'capture'." + **Clear** |
| Loading | `placeholder` skeleton rows on first load; in-button spinner on Load more | — |
| Partial | loaded rows kept, `alert alert-warning` below them, keyboard-reachable | "Couldn't load more runs." + **Retry** |
| Error | first load failed: `alert alert-danger` in the section body; the rest of the shell keeps working | "Couldn't load runs." + **Retry** |

The empty-state copy is deliberately not an invitation. The capture report's own finding stands: a human has no UI path to start a run. An empty state that says "Start your first run" would name a control that does not exist.

**Announcement.** A second `role="status"` line, scoped to the All runs block, reporting the loaded or matched set after a request settles. The list itself carries no `aria-live` — the same shape the main redesign already ruled for the rail. It speaks only about this block; hijacking the rail's fleet line for search results would conflate two subjects.

## 4. Search

**Ruling: server-side, one optional term, case-insensitive substring of the run id, applied in the store before paging.**

Costs, stated:

- **None** fails the owner's literal correction. Finding a run from last Tuesday becomes repeated "Load more". Refused.
- **Client filter over the loaded page** is refused on the brief's own criterion. It lies — "no match" is false whenever the run is on page four — and making it honest later changes the wire, the empty-state copy, and the debounce behaviour. That is the shim the brief forbids.
- **Server-side over id and name** is what an operator would guess, and it is the one thing this design cannot do cheaply. Names live in the other store, so a name filter has to run *after* the join, which means the server pulls store pages until the response page fills — unbounded scan on a term that matches nothing, and short pages that are not the last page. That breaks the one guarantee most worth having.

So: id only, and make the constraint visible before it bites rather than explaining it at failure time. The field is labelled **"Find by id"** with a `form-text` under it reading "Matches the workflow id." One extra line in the rail buys an honest surface. The row shows the id as its primary line, so the operator sees exactly what they are matching against.

Growth path with no shim: same parameter, same wire, same UI, widened matcher, the day the objective lane finds a way to filter names before paging.

Interaction: debounce ~250ms of no typing; cancel the in-flight request with a native `AbortController` when a newer term arrives; a new term resets to page one; clearing returns to the unfiltered list; search applies to All runs only and never filters Now, which is ≤5 rows entirely on screen and would gain only a mode.

Markup: `input-group` with a leading `bi-search`, an `input type="search" class="form-control form-control-sm"`, a `visually-hidden` `&lt;label&gt;`, and the `form-text`. Flagged under Tensions.

## 5. Retention

**This design does not delete. Retention is explicitly out of scope, and the limit is stated in three places a reader meets it.**

Grounds, not stalling:

- The supervisor store has no delete primitive at all. Adding one to a published contract raises fencing (deleting a record whose lease is live), authorization, and a destructive-action ladder — a larger unit than this one, with its own design round.
- Ids are single-use. `SupervisorApplication.#available` (`SupervisorApplication.ts:283-306`) refuses to start any workflow whose id already retains state. So deletion changes which ids can be started. That is a product decision the owner has not made, and inventing it here would be unreviewed design of the exact kind this round exists to prevent.

Where it is stated:

1. The store guide's `list` entry: the supervisor store never deletes a record, so a workflow id is single-use for the life of the store. This is already true today and currently undocumented at the point of use.
2. The operator guide's All runs section: every run this supervisor has kept stays here.
3. The empty state after a memory-store restart is a state, not a bug — the guide says so where an operator meets it.

**What I refuse to build:** a TTL, a retention sweep, a per-row delete control, a bulk clear, or an archive-to-cold-storage seam. Each needs a destructive-action ladder and an owner decision this round does not have.

## Vocabulary

| Layer | Term | Why |
| --- | --- | --- |
| Store member | `list` | Verb, one word, fits `acquire`/`renew`/`get`/`set`/`release` |
| Application method + response type | `catalog` / `ApplicationCatalog` | The owner's own consequence sentence named "a durable catalog" |
| Listed record | `ApplicationRecord` | One durable run's listing row. Deliberately **not** the rail's live entry type: the rail entry carries runtime-only `paused`/`waiting`, the catalog entry carries durable-only `name`. Two truths, two types, no forced union |
| Client method | `catalog()` | Mirrors `roster()` |
| Browser service | `CatalogManager` | Mirrors `RosterManager` from U2 |
| Component | `CatalogList.vue` | — |
| Operator-facing copy | **"All runs"** | An operator does not know "catalog". Code vocabulary and interface copy are governed by different rules; this is not drift, and it should be recorded so a reviewer does not flag it |

---

# Alternatives

**A. All runs as a view in the content pane.** A real archive gets room: a table with sortable columns, a filter toolbar, more facts per row, and it scales to a genuinely large collection.

Why the design wins: the pane is the open run's home — that is the whole point of the one-run operator model this redesign settled. A picker that evicts your open run to find another run is hostile, and getting back means re-opening. It also splits "where do I find runs" across two surfaces, which is exactly the confusion the brief asks the design to close.

**B. All runs as an end-edge `offcanvas` finder, opened from the rail.** Doesn't crowd the rail, doesn't evict the pane, gets a wider row.

Why the design wins: below `lg` the rail is already an `offcanvas-lg` drawer, so two navigation overlays contend and only one can be open — a mechanical conflict for no gain. It adds an open-and-close gesture to every lookup. Worst, it hides the archive behind a door, which is precisely how history came to be deferred in the first place. The owner's correction was that the growing collection must be *discoverable*; leaving it visible in the rail is the literal answer.

---

# Units

Routing ledger derivable from the role and engine named on each row. `src/core/**` is disjoint from every U-unit, so H3 parallelises from the start; everything else serialises into the existing queue.

| Unit | Role · Engine | Owns (disjoint) | Depends on |
| --- | --- | --- | --- |
| **H3** Store enumeration | `codex`→`implementer` · **Sol** | `/workspace/supervisor/src/core/types.ts`, `src/core/stores/MemorySupervisorStore.ts`, `src/core/stores/DatabaseSupervisorStore.ts`, `src/core/index.ts`, `tests/src/core/stores/**` | none — runs in parallel with U1–U3 |
| **H4** Application catalog + endpoint | `codex`→`implementer` · **Sol** | `app/core/types.ts`, `app/core/constants.ts`, `app/server/SupervisorApplication.ts`, `app/server/ApplicationHandlers.ts`, `app/server/ApplicationRoutes.ts`, server tests | H3, U1 (same files) |
| **H5** Client + catalog manager | `codex`→`implementer` · **Sol** | `app/browser/types.ts`, `app/browser/services/Client.ts`, new `app/browser/controllers/CatalogManager.ts`, `app/browser/controllers/Operator.ts`, tests | H4, U3, U5 (same files) |
| **H6** The All runs surface | `implementer` · **Opus 5** | new `app/browser/components/CatalogList.vue`, `CatalogItem.vue`, edits to the rail host and `ApplicationView.vue`, component tests | H5, U4, U5 |
| **fold → U7** Guides, parity, archive fixture | `builder` · **Sonnet** | `guides/**`, `app/browser/seeders.ts`, showcase, capture harness | H6 |
| **fold → U8/U9** Capture portfolio for the new states | `reviewer` · Opus + `analyst` · Sol + `checker` | read-only | U7 |

Revised serial order: **H3 ∥ (U1 → U2 → U3) → H4 → U6 → U4 → U5 → H5 → H6 → U7 → U8 → fixes → U9 → gates.**

H5 sits immediately before H6 on purpose. A catalog manager landing two units before its consumer is a capability with no caller — it trips the creation gate and reads as unfinished work.

**Acceptance criteria**

- **H3.** `list` exists on `SupervisorStoreInterface` with TSDoc; both stores implement it; order is total (last activity descending, id tie-break); a test pages twice over a collection mutated between the pages and proves every row returned exactly once and none skipped; a test proves the last page is the only short page; a test proves the search term matches a substring of the id case-insensitively; a test proves a run with no units still lists. Scoped `check` and the store test project green.
- **H4.** `GET /workflows` registered; an authorized session and an authorized bearer both list; a principal granted one id sees exactly that id and no page shorter than the page size except the last; the join supplies `name` and `status` per row in one batch; a run listed always opens through `inspect`; a run whose snapshot is absent is excluded from the listing. Scoped server tests green.
- **H5.** `Client.catalog()` typed and tested against the real server; `CatalogManager` holds page, term, and continuation, cancels a superseded request with `AbortController`, resets to page one on a new term, and exposes the five states as derived facts rather than stored flags. No timer anywhere in the unit.
- **H6.** All six rendered states exist and are reachable; a live row's status renders from the rail; a run ending live prepends to All runs with no request; status chrome comes from `deriveTone`, with no new status map; every interactive target ≥ 24×24px; the search field has a programmatic label and a visible `form-text`; no `style` attribute, no `&lt;style&gt;` block, no invented utility class.
- **U7 fold-in.** Guide parity closes on every new `src/` export; the store guide states the no-delete limit; the operator guide states the memory-store restart consequence; a seeder produces enough runs to fill more than one page.
- **U8 fold-in (pixel proofs).** All runs: ideal, empty-nothing-kept, empty-no-match, loading, partial, first-load error — each at 1440×900 and 390×844, light and dark. Twenty-four captures against the real composed server, by the mechanism `capture-report.md` already proved.

---

# Tensions

Subjective calls Sol should attack objectively.

1. **Containment over partition.** I show live runs in both blocks. The strongest counter is that the same run twice in one column reads as a bug. My mitigations are the status-from-Now rule and time-based block labels. Sol should check whether a partition — All runs minus the loaded Now set — is actually cheaper than I claim, and price the page-count wobble it causes.
2. **The join versus the brief's "without N gets".** I read that constraint as forbidding N reads across the collection, not 20 batched reads inside one request, and I refuse to denormalize `name`/`status` into the supervisor store because it duplicates state `WorkflowStoreInterface` owns. Sol should price the join under SQLite honestly and say whether twenty sequential awaits per request is what it will actually be, or whether one query can serve it.
3. **Id-only search.** Names demonstrably differ from ids in this product. My defence is that the id is the operator's handle everywhere else and the row shows it primary. Sol should rule on whether a bounded name-matching scan — cap the store pages read per request, return a continuation even on a short page — is affordable, and what it costs the "last page is the only short page" guarantee.
4. **`GET /workflows` rather than a new noun.** Counter: it couples the human read surface to the automation write surface on one path. My answer is that both take a principal and both authorize against grants, so there is nothing to decouple. Sol should verify that the router's literal-path table and the middleware chain treat the same path with two methods identically for CSRF and the login limiter.
5. **The ordering key equals the displayed instant.** This forces the store's key onto the row ("Last activity") rather than the more natural "Ended". Sol should confirm no cheaper key gives a monotonic display, and rule on the run-with-no-units fallback.
6. **A visually-hidden label on the search field.** The skill says visible labels or `.form-floating`, never placeholder-only. I claim a programmatic label plus a magnifier plus a visible `form-text` is not the failure the rule targets, in a 300px column. Sol should rule whether this bends the skill or breaks it.
7. **A second `role="status"` region.** Two status regions in one column, describing different subjects. Legal; possibly an accessory.
8. **The ended door's justification changed.** REDESIGN fixed "Open by id" as "the door to retained ended runs". With All runs listing everything durable, that is no longer its job — it is now the keyboard-fast path and the fallback when the catalog request fails. Its help text must change from "For a run that has already ended", which will otherwise be false on the shipped surface. I am not proposing removing it; I am flagging that its copy is now wrong, and U4 owns that file.
9. **The archive does not follow the stream.** One load per session, plus the prepend rule. Sol should check whether the prepend rule is sound when the same run also arrives in a later "Load more" page — the browser must reconcile by id or a row will double.

---

# Risks

| Risk | Evidence that settles it |
| --- | --- |
| The ordering key and the displayed instant diverge, so "newest first" is visibly wrong | A test that seeds runs whose unit activity and workflow-snapshot `updated` disagree, lists them, and asserts the rendered instants are monotonically descending |
| Grant filtering produces short non-final pages, which read as the end of the archive | A test with a narrow-grant principal over a collection where most rows are foreign: every page but the last is full |
| The join makes a page request slow enough to feel broken | Time `GET /workflows` against a SQLite store seeded with a few thousand runs, in the executor's own sandbox, and record the number rather than asserting one measured elsewhere |
| The loading and partial states cannot be captured without simulating project-owned behaviour | They can, and mock-free: **partial** by stopping the real server child between page one and "Load more"; **loading** by `SIGSTOP`ing the server after the shell paints and before the catalog request resolves, capturing, then `SIGCONT`. Both are real server states. Confirm in the capture harness before U8 |
| The rail column becomes an archive with a small live header, inverting the emphasis the redesign just bought | Read it off the desktop and mobile captures with a populated archive. The navbar fleet readout is the standing live signal; if the captures show it does not carry that weight, the block order is the thing to revisit, not the placement |
| U1's rail entry shape lands without `name`, and my catalog row shows one | Already accommodated — id is primary on both surfaces and the catalog's `name` is secondary-when-different. Confirm against U1's landed `app/core/types.ts`, which was mid-edit at the time of this read |
| `APP_STORE=memory` makes All runs empty after every restart and this reads as a broken feature | Stated in the guide and visible as the empty state. Confirm the empty-state copy does not promise persistence |

**The one question that would most change this design:** *does the operator ever need to compare completed runs, or only to find one and open it?* Everything above assumes the second — that All runs is a picker into the one-run model. If the answer is comparison, the rail section is the wrong home, Alternative A becomes correct, the row needs columns rather than two lines, and sorting and multi-select enter the scope.
