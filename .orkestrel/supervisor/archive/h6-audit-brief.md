# H6 audit — the History surface

One brief, two blind lanes: `analyst` (engine **GPT-5.6 Sol**, journaled bench CLI, read-only)
and `reviewer` (engine **Opus 5**, native, read-only). Per-claim verdicts per
`orkestrel-falsify` (CONFIRMED / BROKEN / UNRESOLVED / NOT-EVIDENCED), evidence, one terminal
line. The unit's writer was the Opus implementer; the fix round's closing auditor will be Sol.

## Subject

Commit `7ebb93d` (range `4e2263d..7ebb93d`) in `/workspace/supervisor`, branch
`claude/orkestrel-test-package-0m1m8u`: 12 files, +1368/−47. New `HistoryView.vue` +
mirrored test; `ApplicationView.vue` (destination, door, focus); `OpenPanel.vue` (`open`
prop); `ContentPane.vue`/`FeedList.vue` (the `operator.terminal` carriers — an accepted
scope ruling, see below); `seeders.ts` (`seedHistory`); test updates.

Authority: `tmp/redesign/history-analyst.md` §3-4 (the ruled design);
`tmp/redesign/h6-brief.md` (the unit's ten items and grants); `AGENTS.md` + rules (`names`,
`typescript`, `architecture`, `patterns`, `tests`, `browser`, `styles`); the H5 seam is
CLOSED contract (`app/browser/types.ts` untouched by this unit).

## Orchestrator rulings already on the record (audit them as rulings, not as deviations)

1. The rail door lives in the door strip at the top of the offcanvas body, not a literal
   footer — accepted: the toast surface (U5c) owns the bottom edge and the placement is
   proved by `keeps the door clear of the surface the shell states its facts on`.
2. `ContentPane.vue`/`FeedList.vue` were touched under item 9's own requirement; the brief's
   off-limits line contradicted its criterion and the criterion won — ratified.

## Orchestrator-supplied evidence

- Full diff: `/home/user/scaffold/tmp/redesign/h6-evidence.diff` (1748 lines).
- Native acceptance (`tmp/redesign/h6-acceptance.log`): all gates green; 215/215 app:server,
  409/409 app:browser, 10/10 integration, 251/251 src, 100/100 core, 17/17 policy; guides at
  the recorded 8-failure U7 ledger.
- **Capture portfolio** (the review input for every rendered claim; reviewer reads these):
  `/tmp/claude-0/-home-user/6d2dc0ef-4f55-5fcd-ae2e-97129e7119cf/scratchpad/h6-*.png` —
  empty, rail, ideal (both widths/themes), drawer, filter, older, disclosure, terminal (both
  themes), partial, error, and `h6-changed-MISSING-desktop-light.png`.
- **A live defect, found on film and pinned by probe** (`tmp/redesign/h6-changed-probe.mjs`,
  log `tmp/redesign/h6-changed-probe.log`): against the real server, `changed` flips TRUE
  when a run merely STARTS after the first page (a start is not new completed history) and
  flips BACK TO FALSE when that run stops — the ended run leaves the roster, the live-set
  `(id, updated)` content key collapses toward the baseline, and the affordance erases
  itself at exactly the §3 moment it exists for. The component proof passes against a
  fixture roster because the fixture never removes a run. The derivation is H5's
  (`HistoryManager.#rosterKey`, `app/browser/controllers/HistoryManager.ts:150`), reopened
  here on capture evidence.

## Claims

1. **The destination is whole** (§3): heading, focus moves (open → heading; row → run
   heading), collection copy, retention sentence, back-to-run continuity (run state,
   selection, feed, subscription untouched), mobile drawer close and return — each proved by
   a binding test AND visible in the portfolio.
2. **The rows and doors are right** (§3): "Live runs" heading; History door with "Completed
   runs" supporting text; row anatomy (name, status word + glyph, monospace id, ended time,
   whole row operable); the typed-id door folded shut inside the view; a history row and the
   typed door land the reader in the same place through the same `open` path.
3. **The five states derive and render** (§3): ideal/empty/loading/partial/error from
   `history.state` alone, each with a binding test; partial keeps rows beside one retry;
   error keeps heading, search, and door. The portfolio's partial and error frames match the
   tests' claims.
4. **The search is honest** (§4): exact label "Filter by run ID", help text refusing wider
   promises, server-side exact prefix through `load(prefix)`, submit and clear reset the
   cursor, no case folding, no client filtering, no debounce/timers.
5. **No polling and no silent movement**: nothing asks the server without a human command
   (mount read, Refresh, Older, Filter, Clear, Retry); rows never mutate under the reader;
   generation/loading guards hold; the seeded showcase demonstrates the ideal state.
6. **The changed defect is real and its fix has a right shape** (the probe above): rule on
   the mechanism — what fact SHOULD `changed` derive from so §3's affordance appears when a
   run completes after the first page and does not appear for mere starts or reconnects; the
   objective lane pins the roster/decay semantics at source
   (`RosterManager`, `HistoryManager.#rosterKey`, the wire roster's membership rule); the
   subjective lane rules what the honest word and TSDoc become. Name the smallest fix and
   which files it owns (H5 controller files are in scope for the fix round).

## Standing conditions

The Sol sandbox denies loopback listeners — rule from source, tests-as-written, and the
supplied acceptance/probe/capture evidence. The reviewer reads the portfolio images
directly. `guides/**` is U7's (the parity delta is recorded, not a finding).

## Output

Per-claim numbered verdicts with `file:line` (and frame-name) evidence, findings outside the
claims if any, then exactly one terminal line:
`VERDICT: PASS|FAIL — N broken, N unresolved, N not-evidenced, N findings outside the claims`
