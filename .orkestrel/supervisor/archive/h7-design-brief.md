# H7 design brief — the name filter, honestly

One brief, two blind lanes: `planner` (engine **Opus 5**, native, read-only — the subjective
lane: shape, control feel, vocabulary, what the operator should experience) and `analyst`
(engine **GPT-5.6 Sol**, journaled bench CLI, read-only — the objective lane: what the store,
wire, and pagination law actually permit, at what cost). Neither sees the other's answer.
Return a ruled proposal, not a survey.

## The user's instruction (verbatim intent, binding)

"For the filter it looks good and happy get use out of the id but we should be able to filter
by name, a simple fuzzy search would be good." — The id-prefix filter stays useful and used.
Name filtering is added. The user asked for SIMPLE fuzzy, not a search engine.

This reopens §4 of `tmp/redesign/history-analyst.md`, which ruled v1 id-prefix-only and
refused name search as "a scan, full-text structure, or a second authoritative application
catalog … not justified in v1". The user's instruction outranks that ruling. The §4 honesty
law it rested on still binds: a search box that looks general and is not is worse than no
search box — whatever ships must say exactly what it matches.

## Standing facts

- Wire: `GET /history` carries `limit`/`cursor`/`prefix`; prefix is a server-side
  case-sensitive run-id prefix applied at the store (`SupervisorStoreInterface.list` via
  `RunListOptions`), under the honest-watermark traversal law (fixed `until`, descending
  `(updated, id)`, exclusive continuation; H3's binding ruling — an UNCHANGED traversal never
  duplicates or skips).
- `HistoryRun` rows carry `id`, `name`, `status`, instants. Names are free text, not unique.
- The browser holds loaded pages in `HistoryManager` (rows/cursor/prefix as facts, five
  derived states, cursor-presence continuation). The control is "Filter by run ID" with help
  text refusing wider promises, submit/clear through `load(prefix)`.
- Both stores (memory + SQLite through the one-lane spine) serve history from released run
  records; SQLite could express `LIKE`; the memory store scans. Terminal qualification
  happens after the store's limit (the under-filled-page law: cursor presence alone signals
  continuation).
- The §3 surface: one filter field, five states, "Load older", no client-side filtering
  today, and copy that tells the truth.

## The questions to rule

1. **Where does the name match live?** Server-side (a store scan or SQL `LIKE`/subsequence
   under the watermark traversal — what does a low-selectivity fuzzy filter do to page
   fullness and cursor semantics?), client-side over LOADED rows (cheap and instant, but §4's
   honesty law demands the copy say "searches the loaded runs" — is that honest enough to
   ship?), or hybrid (id prefix stays server-side; name fuzzy filters the loaded pages
   client-side with explicit copy). Name the recommended split and its exact honest copy.
2. **What is "simple fuzzy"?** Case-insensitive substring? Subsequence (each typed character
   in order)? Token prefix? Pick ONE, name it in the help text in operator words, and keep it
   implementable in both stores or in the client without a dependency (zero unsolicited
   packages).
3. **What does the control become?** One field that matches id-prefix OR name-fuzzy together?
   Two explicit fields? A mode toggle? The §4 label law binds: the control must say exactly
   what it matches. Single-word member names for any new wire/manager/API surface.
4. **Pagination truth.** If the name filter is server-side: how does the cursor interact with
   a filter that disqualifies most rows (under-filled pages, continuation honesty)? If
   client-side: what does "Load older" mean while a name filter is active, and what does the
   empty-filtered state say (no loaded match ≠ no match in history)?
5. **The wire delta.** Exactly which names are added (`RunListOptions`, query parameters,
   `HistoryOptions`, manager facts/commands), staying single-word, with the H5 seam's
   patterns (facts in, derived states, commands).

## Evidence slice

Read: `tmp/redesign/history-analyst.md` §4; `app/browser/components/HistoryView.vue` (the
filter form); `app/browser/controllers/HistoryManager.ts`; `app/browser/types.ts` (history
section); `app/core/parsers.ts` (history query); `app/server/ApplicationHandlers.ts` (the
history route); `src/core` store `list`/`RunListOptions`/helpers; `.claude/rules/names.md`
and `patterns.md`. The tree at the committed baseline stated in the dispatch message.

## Output

A ruled proposal: the recommended answer to each of the five questions with its reasoning in
tradeoff form (option, cost, recommendation), the exact control copy and help text, the exact
new names, the unit decomposition (types → store/wire if any → manager → surface → tests),
and the risks. No survey, no diary.
