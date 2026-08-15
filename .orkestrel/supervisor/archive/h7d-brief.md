# H7d — the two-field filter surface

## Role and engine

`implementer`, engine **Opus 5**, native, high effort. Sole serial writer in
`/workspace/supervisor` from clean committed baseline **b769627** (amend at dispatch).
Perform directly, spawn nothing, no commits/pushes/installs.

## Authority and the seam beneath you

The reconciled H7 design ruling (`tmp/redesign/h7-brief.md` headnote) and the subjective
lane's ruled copy (quoted below verbatim — build it as written). H7a-c is committed: the
manager exposes `filter: HistoryFilter | undefined` and `load(filter?: HistoryFilter)`
(`{ name?, prefix? }`, AND semantics, all-blank → `undefined`); the wire carries `name`; the
join matches case-insensitive substring server-side over every completed run, one page per
press; a page may return zero rows WITH a cursor. `AGENTS.md`; rules `names`, `typescript`,
`patterns`, `tests`, `browser`, `styles`. H6's laws stand: states derive from
`history.state`, the staleness sentence needs retained rows, no polling, rows never mutate
under the reader.

## The unit

1. **Two fields, name first** (the rows print name above id; the filter ranks the same way),
   in one form row, each with its own label and help, Enter submitting from either:

   ```
   [label for="history-name"]      Filter by name
   [help  id="history-name-help"]  Matches any part of a run name. Capitals do not matter.

   [label for="history-prefix"]     Filter by run ID
   [help  id="history-prefix-help"] Matches the start of a run id, exactly as typed.

   [shared line beneath the form]
   Both filters search every completed run, not only the ones listed here. Pages are read newest first.

   [submit]  Filter    aria-label: Filter the list
   [clear]   Clear     aria-label: Clear the filter    (renders only while filter !== undefined)
   ```

   The shared scope line is VISIBLE copy, not a comment — it is the §4 honesty claim stated
   where the doubt arises. The word "fuzzy" appears nowhere. Submission trims only to detect
   blank halves; typed text reaches `load` verbatim; blank-both stores nothing.
2. **One derived phrase, two consumers**: derive the filter phrase once — name only:
   ` with a name containing {name}`; id only: ` with an id starting with {prefix}`; both:
   ` with a name containing {name} and an id starting with {prefix}` — and quote it in BOTH
   the empty branch and the `role="status"` announcement so they cannot disagree.
3. **Three empty sentences**, split on cursor presence:
   - no filter: the existing first-run guidance, unchanged;
   - filter active, `cursor === undefined`: `No completed run{phrase}. Clear the filter to
     see every completed run.`
   - filter active, `cursor !== undefined`: `In the pages read so far, no completed
     run{phrase}. Press Older to read further back.`
   "Older" keeps its label and meaning; nothing auto-loads.
4. **The announcement** keeps its established shapes with the phrase substituted where
   ` starting with {prefix}` sits today; empty-with-cursor:
   `No completed runs{phrase} in the pages read so far. Older runs can be read.`
5. **The showcase demonstrates both halves**: `seedClient`'s history read honors the `name`
   key over the seeded page the same way it honors `prefix` (case-insensitive substring), so
   the frozen scenario can demonstrate a name filter without a server.
6. **Proofs** (component + integration): both fields render with exact labels/help/scope
   line; Enter submits from each; each of `{name}`, `{prefix}`, `{name, prefix}` sends
   exactly its keys and resets the page; Clear renders only with an active filter and resets
   both drafts; the three empty sentences render for their three fact combinations; the
   status line and empty line quote the same phrase in the same state; keyboard order
   name → id → Filter → Clear; both themes hold contrast on the new copy via tokens (no
   inline styles); the H6 battery (five states, staleness gate, disclosure, Back) still
   passes; one integration proof drives a real name filter end-to-end.

## Scope

**Owned:** `app/browser/components/HistoryView.vue`, `app/browser/seeders.ts` (item 5),
`tests/app/browser/components/HistoryView.test.ts`, `tests/app/browser/seeders.test.ts`,
`tests/app/browser/integration/integration.test.ts` (one added proof),
`tests/setupBrowser.ts` (additive fixture support only if needed). **Off-limits:**
`app/browser/controllers/**`, `app/browser/services/**`, `app/browser/types.ts` (the manager
contract is closed — deviation-stop if it cannot express the surface), `app/core/**`,
`app/server/**`, `src/**`, `guides/**` (report the parity delta).

Forbidden: the standing list; no timers; no client-side name filtering of the live surface
(the server owns the match — the showcase seeder is the one sanctioned local matcher).

## Environment facts

Native, listener-capable: run the scoped browser files during development and the full
`npm run test:app:browser` + `test:app:browser:integration` before reporting. Chromium at
`/opt/pw-browsers`.

## Acceptance criteria

1. Every item-1 through item-4 string exact, proved by component tests; the shared phrase
   derivation single-sourced.
2. Item-5 proof green; item-6's battery green natively including integration.
3. `format:check`, `lint:check`, `check`, `build` green; the parity delta reported exactly.

## Output

Touched files + diffstat; per-criterion proofs with commands and tails; the parity delta;
`git status --porcelain`; deviations or none. No diary.
