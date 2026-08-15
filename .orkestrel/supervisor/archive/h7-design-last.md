# H7 objective ruling

Ship a hybrid filter: keep the case-sensitive run-ID prefix on the server; match names in the browser across all pages currently loaded. Do not change the store or wire.

## 1. Match location

**Option:** Server-side ID prefix plus client-side name matching.

**Cost:** Name results cover loaded runs only. A low-selectivity name may require several explicit “Load older” presses.

**Recommendation:** Accept that limit and state it plainly. The baseline store catalog has no `name`; `SupervisorApplication.history()` obtains it only after the store has applied its limit. A global server search would therefore require either:

- duplicating names into `RunRecord` and keeping two durable records consistent; or
- scanning catalog pages, loading snapshots, and advancing the cursor by the last inspected record until enough names match.

The latter can scan the whole catalog. It is especially expensive because the current SQLite store uses the shared in-memory paging spine rather than a native `LIKE` query.

The honest split is:

- Run ID: server-side, case-sensitive prefix across the history traversal.
- Run name: client-side, case-insensitive substring across loaded pages.

## 2. “Simple fuzzy”

**Option:** Case-insensitive substring matching:

```ts
run.name.toLowerCase().includes(name.toLowerCase())
```

**Cost:** This does not correct typos, ignore accents, reorder characters, or admit gaps. Those behaviors would make the control harder to explain and would exceed “simple.”

**Recommendation:** Call it “contains,” not “fuzzy,” in operator copy. Treat an all-space value as absent; otherwise preserve the entered text apart from case folding. Add no package.

## 3. Control

**Option:** Two explicit fields, combined with AND.

**Cost:** A second field takes more space, but avoids an ambiguous single field. One hybrid OR field cannot preserve the server ID prefix: sending the prefix to the server would discard name-only matches before the client saw them.

**Recommendation:** Use this exact copy:

- Group: **Filter completed runs**
- Field 1: **Run ID starts with**
- Field 2: **Run name contains**
- Help: **Run ID is matched across completed history, exactly as typed. Run name ignores capitalization and searches only the runs loaded here. Load older to search more. When both fields are filled in, both must match.**
- Submit: **Apply filters**
- Clear: **Clear filters**
- Continuation: **Load older**

The ID field remains server-backed. The name field filters the accumulated loaded rows.

## 4. Pagination truth

The name filter must not alter or manufacture a cursor. “Load older” means:

> Load the next server page for the active run-ID prefix, append its rows, then apply the name filter to the enlarged loaded set.

A page may add no visible matches and still return a cursor. Cursor presence alone keeps “Load older” available. Neither page fullness nor visible-match count may end traversal.

Use these empty states:

- Cursor present: **No loaded completed run matches these filters. Load older to search more history.**
- Cursor absent: **No completed run matches these filters.**
- No filters and no completed runs: retain the existing first-run guidance.

The manager’s five-state derivation must distinguish raw loaded-page truth from visible matches:

- `loading`: fresh-page request with neither raw rows nor a retained cursor.
- `error`: first-page refusal.
- `partial`: continuation refusal when raw rows or a retained cursor prove a page was already listed.
- `empty`: successful state with no derived matches.
- `ideal`: successful state with derived matches.

This also closes the zero-row, cursor-present case permitted by the existing under-filled-page law.

## 5. Exact name delta

| Layer | Ruling |
|---|---|
| `RunListOptions` | No change. Keep `cursor`, `limit`, `prefix`, `runs`, `released`. |
| HTTP query | No change. Keep `limit`, `cursor`, `prefix`; reject `name` as unknown. |
| `HistoryQuery` | No change. |
| `HistoryOptions` | No change. |
| Manager fact | Add `readonly name: string \| undefined`. |
| Manager derivation | Add `readonly matches: readonly HistoryRun[]`. |
| Manager command | Add `filter(name?: string): void`. |
| Existing manager command | Keep `load(prefix?: string)` server-facing; it must preserve `name`. |
| Reset | `clear()` also clears `name`. |
| Surface identifiers | Use `history-prefix` and `history-name`. |

`runs` remains the immutable accumulated server fact. `matches` is the name-filtered projection in the same page order. The surface renders `matches`; pagination continues from `cursor`.

Applying the form calls `filter(name)`. It calls `load(prefix)` only when the applied prefix changes. Changing only the name is therefore immediate and sends no request.

## Units

1. **Types:** add `name`, `matches`, and `filter(name?)` to `HistoryManagerInterface`.
2. **Store/wire:** no implementation delta; add regression coverage that `name` is not admitted or transported.
3. **Manager:** retain raw runs, derive case-insensitive substring matches, preserve name through refresh/retry/older, and derive states from raw-page and visible-match facts.
4. **Surface:** render two fields, `matches`, cursor-sensitive empty copy, and “Load older.”
5. **Tests:** bind mixed-case substring behavior, reject subsequence-only and typo matches, prove name-only filtering sends no request, prove prefix-plus-name AND behavior, prove a later page can supply the first match, prove zero visible matches retain continuation, and prove exhausted traversal permits the final empty claim.

## Risks

- Operators may expect typo tolerance from “fuzzy”; the shipped copy must consistently say “contains.”
- Low-selectivity names can require many manual page loads.
- `runs` and `matches` can be confused by future consumers; tests and guide parity must bind the surface to `matches`.
- Unicode case folding is simple JavaScript case folding, not locale-aware search.