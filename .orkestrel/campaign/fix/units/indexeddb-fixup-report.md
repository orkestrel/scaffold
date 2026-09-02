# Unit indexeddb-fixup — report (2026-09-02)

Writer: `builder` on Claude Sonnet (native). Returned report, as data:

- R1 closed — `src/browser/types.ts:331-332`: the `IndexedDBStoreInterface` summary reads "An
  object store — the keyed record surface plus the store's own schema metadata and `index`
  accessor."
- R2 closed — `guides/indexeddb.md`: the `IndexedDBUpgradeContext` paragraph moved from between
  the transaction-store table and the store-manager heading into the `## Methods` preamble, as a
  second paragraph after the existing one, reworded to state the Surface row and the `stores`
  asymmetry (referral F1 closed as ruled).
- R3 closed — `src/browser/IndexedDBStore.ts:77,98,140`: "as in `get` above" → "as in the `get`
  method"; `guides/indexeddb.md:119`: "Each extending table below" → "Each extending table that
  follows". The pre-existing instances outside the unit were left.
- R4 closed — `tests/src/browser/IndexedDBCursor.test.ts:181-182`: the non-record cursor case
  asserts `key` and `primary` read `['a', 'b']`; passed on the first run.
- Voice closed — `src/browser/types.ts:109,136`: the manager blocks open "The store manager of a
  version-change upgrade." and "The secondary-index manager of a version-change upgrade."

Deviation note (non-blocking): acceptance criterion 3 named four pre-existing `above`/`below`
lines; the actual pre-existing set is larger (`IndexedDBStore.ts:169`; `guides/indexeddb.md:11`,
`:60`, `:62` (the `rangeAboveKey`/`rangeBelowKey` identifiers), `:104`, `:230`, `:294`, `:423`),
none touched. Recorded for the TSDoc and prose voice wave, which owns the pre-existing prose.

`test:src` after R4: 111 passed (8 files).

Gates: `npm run format:check` 0; `npm run lint:check` 0; `npm run check` 0; `npm run build` 0;
`npm test` 0 (src:browser 111, policy 111, config 46, setup 11, guides 58).

```text
 guides/indexeddb.md                       | 6 +++---
 src/browser/IndexedDBStore.ts             | 6 +++---
 src/browser/types.ts                      | 8 ++++----
 tests/src/browser/IndexedDBCursor.test.ts | 2 ++
 4 files changed, 12 insertions(+), 10 deletions(-)
```

Status at return: the four owned files modified; nothing committed, staged, pushed, or
installed.
