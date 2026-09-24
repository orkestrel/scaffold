# Audit claims — OFFCANVAS (`oc`), round 3

Subject: round 3's record — `oc-3.diff` and `oc-3-status.txt` (the worktree `/home/user/veneer-oc`
against `2a3f223`), `oc-shared-3.patch` (superseding `oc-shared-2.patch` whole), the report
`b-modal-oc-report-3.md`, and the round-3 records under `oc-instruments/` (`oc-3-shared-interdiff.txt`,
`oc-gates-3.log.txt`, `oc-3-navbar-cascade-reading.txt`) — against the successor brief
`b-modal-oc-brief-3.md`, the round-2 verdict `oc-audit-2-verdict.md`, round 2's record (`oc-2.diff`,
`oc-shared-2.patch`), and the release source at `/home/user/veneer-oc/node_modules/bootstrap/js/src/`.
The unit was written by `opus` on Opus 5.5. Each claim is falsifiable; a lane rules CONFIRMED or BROKEN
with `file:line` evidence.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the round-2
verdict's rulings stand; the Orchestrator's apply check (`oc-shared-3.patch` on a fresh `2a3f223`
extract, exit 0) settles the apply clause; the compatibility table re-pads under the formatter.

1. **Scope and delta.** `oc-3-status.txt` lists round 1's owned paths and nothing else; against round 2,
   the owned files change only at the `_navbar.scss` comment, and the shared patch only at the Offcanvas
   `plugin` row, the ramp paragraph, the backdrop sentence, and the table's padding; no code, assertion,
   or specimen changes.
2. **O-d.** Each clause of the rewritten `plugin` row — the toggle trigger's disabled guard, its `hide`
   call on the open panel that the `hide.bs.offcanvas` event can cancel, its `toggle` call on the named
   panel and the focus return; the dismiss trigger's disabled guard and `hide` call on the named panel or
   its `.offcanvas` ancestor; the `Escape` key under and without the `keyboard` option; the backdrop
   press and the `'static'` value; the load and resize handlers; the defaults; the `Backdrop` utility
   under the `backdrop` option — is borne out by `offcanvas.js`, `util/component-functions.js`, and
   `util/backdrop.js`, and no clause promises an unconditional visibility change.
3. **O-e and the sweep.** The `fixed` value, the `keyboard` option, the defaults, and the ramp
   paragraph's `auto` and `0` values carry their nouns; the backdrop sentence carries the `backdrop`
   option's condition; no line rounds 1 to 3 added leaves a code token without its noun.
4. **O-f.** The `_navbar.scss` comment says the bar's more specific rule unfixes and shows the panel, the
   release's important width, height, border, transform, and visibility declarations win over the
   offcanvas partial's placement and hidden rules, and the collapsible content's important display
   declaration wins over its collapse class's hidden state; `oc-3-navbar-cascade-reading.txt` bears out
   each clause.
5. **Law and report.** No changed line adds an `any`, an `as` beyond a const assertion, a `!`, a
   suppression, or a nested function; the report states no temporal word and no tally, and writes each
   gate's command with its result line; the lane lists every count the report states, for the record.
