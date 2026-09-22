# F5d PHYSICAL — audit verdict (Orchestrator reconciliation, 2026-09-22)

Subject: Veneer commit `07fc3c3` (the unit's writes over `3ff4e9a` plus the Orchestrator's
integration of the unit's returned patches), audited from `.orkestrel/veneer/f5d-audit-claims.md`.

## Lanes

| Lane       | Role       | Engine                 | Transport                                                       | Terminal line                                              |
| ---------- | ---------- | ---------------------- | --------------------------------------------------------------- | ---------------------------------------------------------- |
| Objective  | `analyst`  | GPT-6 Astra            | `codex exec`, thread `01a0ca42-be15-7511-b0ac-410198b8d8c6`     | FAIL 2, 3, 6, 10, 11; outside the claims: none             |
| Subjective | `reviewer` | Opus 5 (`opus` alias)  | native subagent                                                 | FAIL 2, 10, 12; outside the claims: F-A to F-F             |
| Mechanical | `checker`  | Sonnet                 | native subagent                                                 | FAIL 9, 10; outside the claims: none                       |

The `opus` alias served `claude-opus-5`: Claude Code 2.1.278 carries no Opus 5.5 id. Every lane
ran; the checker read the gate log before it completed and ruled claim 9 UNRESOLVED, which the
completed log (`units/f5d-gates.log.txt`, every gate `exit=0`, `=== gates done` at 17:57:26)
closes.

## Per-claim ruling

1. CONFIRMED (analyst executed walk with a planted control; reviewer structural).
2. BROKEN in code: `.btn` and `button` wrote four corner longhands where Bootstrap writes
   `border-radius`. The brief's corner map caused it; D11 overrides the map. Fixed in the fix round.
3. CONFIRMED with the claim's wording corrected: the required D11 conversions (`text-align: start`
   to `left`, `float: inline-start` to `left`, and the two-longhand collapses) change value text by
   design; the claim's "value text unchanged" meant the token and measure text, which held.
4. CONFIRMED. Changed expectations are rendering differences the report names. Reviewer R-1 (the
   table case's `dir="rtl"` leg cannot fail against the logical form) is accepted as a limit of
   that leg, not a defect: the `vertical-rl` leg discriminates.
5. CONFIRMED (all lanes).
6. CONFIRMED for the keys; BROKEN for freeze coverage: no case froze the `TEXT_*` tables. Fixed in
   the fix round with one case over every `TEXT_*` export.
7. CONFIRMED (all lanes).
8. CONFIRMED; reviewer F-A (the `vr` compatibility row's "inline size") fixed in the fix round.
9. CONFIRMED on the completed log.
10. BROKEN as written; a claims-file defect. The claim omitted the integrated patches to
    `configs/src/vite.styles.config.ts`, `tests/distribution.test.ts`, and
    `tests/app/browser/integration.test.ts` that the evidence index disclosed. No scope defect in
    the tree. Corrected here: scope is the owned files plus the integrated patches the evidence
    index names.
11. CONFIRMED for the tree. The analyst's BROKEN is about the unit's report ("currently", tallies);
    the report is the unit's retained record and is not rewritten.
12. CONFIRMED for the helpers; BROKEN in prose for the icon-link departure bullet's lead. Fixed in
    the fix round.

## Findings outside the claims

- F-A: fixed in the fix round.
- F-B (the plugin's name) and F-C (the comment's `both` and `F6`): not changed here. F6 FOUNDATION
  deletes the plugin and its comment under D5 in its running worktree; an edit here would conflict
  with that deletion at integration.
- F-D (the legend row's vocabulary and dangling referent): not changed here. F5b ACCOUNTING-LEDGER
  replaces § Departures from Bootstrap with the ledger tables in its running worktree.
- F-E: fixed in the fix round (the module comment and the guide paragraphs rewrapped; the serial
  comma restored).
- F-F (the brief lists `ROADMAP.md` as shared and as off-limits): a brief-writing rule for the
  Orchestrator; the running briefs carry the same pair and read it as report-only, which no unit
  has stopped on.
- R-2 (nothing catches a logical property re-entering the cascade): carried by F5b's
  `collectDepartures` comparison, which reports a property the inventory lacks as an unrecorded
  difference.

## Fix round

Orchestrator-written (Opus engine) on the main checkout over `07fc3c3`: the radius collapse at the
two sites, the `TEXT_*` freeze case in `tests/setupStyles.test.ts`, and the prose corrections (F-A,
F-E, claim 12). Evidence: `units/f5d-fix.diff`; gates `units/f5d-fix-gates.log.txt`; objective
auditor `analyst` on Astra, thread `01a0ca51-9805-7230-a32c-fa4b8b6ef409`, verdict
`units/f5d-fix-audit-analyst-verdict.md`. The first gate run over the fix reddened `check`
(TS2769 on `Array.from` over the union of table types); the case now types the list as
`readonly (readonly unknown[])[]`, and the second run is the authoritative one.

The fix audit (`units/f5d-fix-audit-analyst-verdict.md`) confirmed claims 1, 2, and 4 and broke
claim 3 on wrap width (`tests/setupStyles.ts` line 5 at 113 columns; `guides/veneer.md` line 270 at
106 columns). The Orchestrator reflowed the comment block and the paragraph without changing a
word; every changed non-table line measures at most 100 columns (`git diff -U0 | awk` over the
added lines, 2026-09-22 18:21 UTC), and `format:check`, `lint:check`, and `test:guides` exit 0
after the reflow. The third gate run (`units/f5d-fix-gates.log.txt`) is green on every gate.

FIX-ROUND OUTCOME: PASS. F5d landed as Veneer commits `07fc3c3` and `7863d0d`, with roadmap fold 6
at `cabfe3a`.
