# H6 micro round — the sentence that needs a page, and the notice that needs a line

Successor to `h6-brief-2.md`. Carries the closing pass's finding F1, its two TSDoc prose gaps,
its `#rosterKey` naming advisory, and the user's rail-notice alignment instruction (photo
evidence: the ⚠ floats alone on its own line, the text wraps beneath it, Retry sits stranded
below-left). The closing pass CONFIRMED items 1-4 and 6 and the register half of 5; the scroll
half is settled by an Orchestrator probe (Chromium restores `scrollTop` across a
`display:none` round trip: 500 → 0 hidden → 500 restored) and will be evidenced on film by
the Orchestrator, not by you.

## Role and engine

`builder`, native. Sole serial writer in `/workspace/supervisor` from clean committed
baseline **d14e1e2**. Perform directly, spawn nothing, no commits/pushes/installs. You are
listener-capable: run the scoped browser files you touch, then the full
`npm run test:app:browser`.

## The changes

1. **The staleness sentence renders only beside a listed page** (closing F1): after a
   departure, a FAILED Refresh renders "A run has finished since this list was read." directly
   above "No page has been listed yet." — two sentences disagreeing about whether a page
   exists — and the same sentence sits over the skeleton during every Refresh read. Gate the
   paragraph on retained rows: `v-if="operator.history.changed && operator.history.runs.length > 0"`
   (`app/browser/components/HistoryView.vue:157`). The manager's fact stays pure — do not
   touch `#changed`'s derivation. Proofs in `HistoryView.test.ts`: (a) departure then failed
   first-page re-read → error state renders WITHOUT the staleness sentence; (b) departure then
   Refresh in flight → skeleton renders without it; (c) the existing changed proof still
   binds (rows present → sentence present).
2. **The TSDoc says "successful"** (closing F1's prose half): `app/browser/types.ts:544`
   says "the next first-page read" where the remarks at `:520-522` say a successful one —
   align `:544` to "Cleared by the next successful current-generation first-page read."; and
   `load`'s own TSDoc (`types.ts:549-555`) gains one sentence: a failed load leaves `changed`
   standing.
3. **The rail notice is one aligned block** (user instruction, photo; AMENDED after the
   builder's correct deviation stop — the brief mis-located the block; it lives in
   `app/browser/components/RunList.vue:92-130`, now granted): in both "Updates stopped"
   notice branches, put the ⚠ icon inline at the head of the text line
   (`d-flex align-items-start gap-2` idiom the codebase already uses for such notices) and
   align Retry with the text column, not the icon. Keep every word. Keep the tone classes.
   `tests/app/browser/components/RunList.test.ts` updates only if it names the notice
   structure; alignment itself is proved by the Orchestrator's capture.
4. **`#rosterKey` says what it keys** (closing advisory, folded): rename the private method
   to state the departure concept (`#departureKey` or the file's own naming choice within the
   rules), comment intact.

## Scope

**Owned:** `app/browser/components/HistoryView.vue`, `app/browser/ApplicationView.vue` (the
notice block only), `app/browser/controllers/HistoryManager.ts` (the rename only),
`app/browser/types.ts` (the two named TSDoc lines only), `tests/app/browser/components/HistoryView.test.ts`,
`tests/app/browser/ApplicationView.test.ts` (only if a test names the notice structure).
Everything else off-limits. Forbidden: the standing list; no derivation changes; no assertion
weakening.

## Acceptance criteria

1. The three item-1 proofs green; the contradiction unreachable (no DOM state renders both
   sentences).
2. The two TSDoc lines exact; tree-wide grep: zero `#rosterKey`.
3. `npm run format:check`, `lint:check`, `check`, `test:app:browser` green natively.

## Output

The diff; per-item closure; per-criterion proofs with commands and tails;
`git status --porcelain`; deviations or none.
