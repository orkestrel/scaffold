# H6 — the History surface

## Role and engine

`implementer`, engine **Opus 5**, native, high effort. Sole serial writer in
`/workspace/supervisor` from clean committed baseline **4e2263d** (amend at
dispatch). Perform directly, spawn nothing, no commits/pushes/installs.

## Authority

`/home/user/scaffold/tmp/redesign/history-analyst.md` **§3 Surface and §4 Search are the ruled
design — build them as written.** The History sections of
`.orkestrel/supervisor/REDESIGN.md` bind. `AGENTS.md`; rules `names`, `typescript`,
`architecture`, `patterns`, `tests`, `browser`, `styles`; `app/browser/types.ts` authoritative.
The user's recorded rulings: the bottom-left door work landed as U5d's plus-icon `OpenPanel`;
the user endorsed a search bar as the door's terminal form — §3 folds "Open by id" into this
view as a collapsed technical disclosure, and §4's "Filter by run ID" control is that search
bar landing. The surface should read as a usual admin dashboard, still creative.

## The seam H5 built (committed, proven)

- `operator.history: HistoryManagerInterface` — `runs` (readonly HistoryRun[] in server page
  order), `cursor` (string | undefined), `prefix`, `loading`, `state`
  (`'empty' | 'error' | 'ideal' | 'loading' | 'partial'`), `changed` (the roster runs'
  `(id, updated)` content key differs from the first-page baseline; false before the roster's
  first delivery), `fault`; commands `load(prefix?)`, `older()`, `retry()`, `clear()`.
  Continuation is cursor presence; `older()` is a no-op without one. Loaded rows never mutate
  on roster activity.
- `operator.terminal: boolean` — the open run's persisted snapshot had reached a terminal
  status when its tail was read.
- `HistoryRun` carries the wire's completed-run fields (id, name, status, ended instant).
  Read the exact shape from `app/core/types.ts` / `app/browser/types.ts` before rendering.

## The unit

1. **The destination** (§3): "Completed history" main heading; occupies the content area as an
   explicit alternate destination; the open run's state, selection, feed, and subscription stay
   intact and "Back to run" restores its pane without reopening. Mobile: full-width content
   destination, the runs drawer closes, opening a history row returns to run content view.
2. **The rail door** (§3): the rail list explicitly headed "Live runs"; footer action "History"
   with "Completed runs" supporting text, beside the existing `OpenPanel` door per U5d's
   footer composition.
3. **The rows** (§3): workflow name, terminal status as text plus glyph, run id, ended time;
   whole row keyboard-operable; opens through the ordinary operator path. "Open by id" moves
   into this view as a collapsed technical disclosure.
4. **The five states** (§3): ideal (rows, search, "Load older"); empty (no completed runs, a
   route back to live runs); loading (layout-preserving skeleton rows); partial (loaded rows
   remain, failed next page shows inline retry); error (heading, search, open-by-id remain;
   inline alert with Retry). Drive them from `history.state` alone — derive, never store.
5. **The search** (§4): control labelled "Filter by run ID" — never implying names or unloaded
   pages are searched; submit and clear reset through `load(prefix)`. Server-side
   case-sensitive prefix; no client filtering.
6. **The refresh affordance** (§3): while History is open and `changed` is true, show
   "History changed — Refresh"; it never mutates the page underneath the operator. No infinite
   scroll, no automatic scrolling, no polling, no silent reordering.
7. **Copy and honesty** (§3, §5): supporting copy distinguishing the collections (live and
   recently ended in the rail; durably completed here; a freshly ended run may briefly sit in
   both, labelled); the retention limit sentence under the heading (v1 owns no deletion).
8. **Focus and contrast** (§3): opening History moves focus to its heading; opening a row moves
   focus to the run heading; both themes meet 4.5:1 informative text and 3:1 marks/focus
   chrome using the established token system.
9. **The terminal fact**: where the open run renders, use `operator.terminal` to state a
   finished run's story is complete instead of implying a live stream (the RunList comment at
   `app/browser/components/RunList.vue:36` already anticipates this surface owning that fact).
10. **The showcase shows history** (audit carrier): `app/browser/seeders.ts` currently answers
    one empty history page forever, so the showcase can only demonstrate the empty state. Seed
    a plausible completed-history page (a few terminal runs honoring the frozen scenario's
    vocabulary) so the showcase demonstrates the ideal state too; the seeder stays frozen and
    server-free.

## Scope

**Owned:** new History components under `app/browser/components/`, `app/browser/ApplicationView.vue`,
`app/browser/components/OpenPanel.vue` (the disclosure fold), rail components the door touches,
centralized styles per the styles rule, `app/browser/{constants,helpers}.ts` additive,
mirrored tests under `tests/app/browser/`, `tests/setupBrowser.ts` additive fixtures.

**Off-limits:** `app/browser/types.ts` beyond what rendering genuinely needs (H5's contract
stands — report a needed change as a deviation), `app/browser/controllers/**`,
`app/browser/services/**`, `app/server/**`, `app/core/**`, `src/**`, `guides/**` (report the
parity delta), vendored files, `configs/**`, `package.json`.

Forbidden: the standing list; no timers/polling; no new dependencies.

## Environment facts

Node/npm on PATH; you are native, listener-capable: run the browser suites yourself
(`npm run test:app:browser`, scoped files during development). Chromium lives at
`/opt/pw-browsers`. Captures are the Orchestrator's acceptance, not yours — build nothing for
them beyond the surface itself.

## Unknowns

- The exact HistoryRun field names for rendering — read them from the committed types before
  writing a row; do not invent labels.
- Whether "Back to run" needs new state or falls out of the existing selection model — decide
  from the current `ApplicationView` structure, record the choice.

## Acceptance criteria

1. Every §3 sentence above has its rendered element, proved by component tests: heading, door,
   headed rail list, row anatomy, all five states, refresh affordance, focus moves, retention
   sentence, back-to-run continuity, mobile drawer behavior.
2. The §4 control's exact label and reset behavior proved; the disclosure fold proved (the old
   door's function reachable inside History).
3. No polling; `changed` drives refresh visibility; rows never mutate under the reader.
4. `npm run format:check`, `lint:check`, `check`, `build`, `test:app:browser`,
   `test:app:browser:integration` green natively; report the parity delta exactly.

## Deviation contract

Stop and report if the H5 seam cannot express a §3/§4 requirement, or if a types change is
needed. Ancillary composition — which new component owns which fragment, heading levels within
the rules — is yours, recorded.

## Output

Touched files + diffstat; the component tree you chose and why in three sentences; per-criterion
proofs with commands and tails; the parity delta; `git status --porcelain`; deviations or none.
No diary.
