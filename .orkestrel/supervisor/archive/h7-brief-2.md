# H7 fix round — the scope line tells the truth, one verb per act

Successor to `h7-brief.md`/`h7d-brief.md`. Carries both audit lanes' reconciled findings.
CONFIRMED and closed: the contract, the predicate placement, the manager, the phrase
discipline, name-before-id, Clear behavior. The missing filtered-state and showcase films
are the Orchestrator's, after your changes land. Recorded without change: the
whitespace-asymmetry at the parser (a blank name is absence; a prefix travels exactly as
typed), the total `matchesRunName` behind its validated boundary, the id-length bound reuse,
the unicode case-folding limit (guide carrier), and three polish advisories deferred to U8
(quoting the interpolated term, the Clear-button column resize, the "run ID/id" casing).

## Role and engine

`builder`, native. Sole serial writer in `/workspace/supervisor` from clean committed
baseline **7f84886**. Perform directly, spawn nothing, no commits/pushes/installs. You are
listener-capable: run the scoped browser files you touch, then the full
`npm run test:app:browser`.

## The changes

1. **The scope line** (`app/browser/components/HistoryView.vue:197-200`): replace
   `Both filters search every completed run, not only the ones listed here. Pages are read newest first.`
   with EXACTLY
   `Both filters search completed history, not only the runs listed here. Pages are read newest first.`
   — true for both halves (the id prefix searches everything per press; the name searches
   the traversal page by page, and "completed history" claims the scope without the
   per-press arithmetic). Update the component test's verbatim assertion.
2. **One verb per act** (`HistoryView.vue:82`): the empty-with-cursor announcement's final
   sentence becomes `Older runs can be loaded.` (the machine's act takes the machine's verb,
   as `:87` already has it). Update the mirrored assertions.
3. **The seeder sentence tells the truth** (`app/browser/seeders.ts:489-491`): the seeded
   words `rehearsal`/`licence` DO appear in the ids — mid-id, where a start-anchored prefix
   cannot reach them. Rewrite the TSDoc sentence to that true property.
4. **`HistoryFilter` documents its members** (`app/browser/types.ts:432-435`): one TSDoc
   line per member stating its match rule (name: case-insensitive substring; prefix:
   case-sensitive start, exactly as typed).
5. **Dead branch removed** (`HistoryView.vue:56`): the `clauses.length === 0` arm is
   unreachable (the manager never stores `{}`); remove it so the type stops permitting a
   state the contract forbids — narrow honestly, no assertion weakening.
6. **The handler stops shadowing the fact** (`HistoryView.vue:101`): rename the submit
   handler `filter` → `apply` (the applied state keeps `operator.history.filter`).
7. **Regenerate the showcase bundle**: run the repository's own showcase build
   (`npm run show`) so `demo/showcase.html` carries the H7 surface; commit nothing — the
   regenerated output stays in the tree for the Orchestrator's commit. Report the marker
   proving the new bundle carries the filter (a grep for `history-name` in the output).

## Scope

**Owned:** `app/browser/components/HistoryView.vue`, `app/browser/seeders.ts` (the TSDoc
sentence only), `app/browser/types.ts` (item 4 lines only), `demo/**` (item 7 output),
`tests/app/browser/components/HistoryView.test.ts` and any test asserting the two changed
strings. Everything else off-limits. Forbidden: the standing list; no assertion weakening;
the ruled copy elsewhere untouched.

## Acceptance criteria

1. Tree-wide grep: zero `search every completed run`; zero `Older runs can be read`; the two
   new strings exact.
2. Items 3-6 landed; `npm run format:check`, `lint:check`, `check`, `test:app:browser` green
   natively.
3. `demo/showcase.html` carries the `history-name` marker.

## Output

The diff (excluding the demo bundle body — report its size and marker greps); per-item
closure; per-criterion proofs with commands and tails; `git status --porcelain`; deviations
or none.
