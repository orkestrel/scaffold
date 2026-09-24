# Unit OFFCANVAS (`oc`), round 3 — the prose the round-2 audit ruled (successor of `b-modal-oc-brief-2.md`)

## Role and engine

`opus` on Opus 5.5, reached as the native subagent that wrote rounds 1 and 2, continued in the worktree
`/home/user/veneer-oc` (branch `unit/oc` from `2a3f223`). The executor that opens this brief is that
subagent.

## Objective

Round 2's plugin row, its bare values, and the navbar partial's next sentence read true, and nothing
else changes: the verdict is `oc-audit-2-verdict.md`; this brief names the one fix for each finding.

## Context

**Evidence.** `/home/user/scaffold/.orkestrel/veneer/units/oc-audit-2-verdict.md` and its lane verdicts
(`oc-audit-2-objective-verdict.md`, `oc-audit-2-checker-verdict.md`); round 2's record (`oc-2.diff`,
`oc-shared-2.patch`, `b-modal-oc-report-2.md`). The landed MODAL row (`md-shared-3.patch`, the Modal
`plugin` row) shows the calls-and-cancellation form this round's O-d takes.

**Law.** As round 1: `AGENTS.md` in the worktree; the scaffold rule files the round-1 brief names; the
notes `w2-w3-note-1.md` and `w2-w3-note-2.md`; the round-1 brief, whose scope, off-limits list, standing
conditions, and host facts bind this round unchanged; skill: none.

**Host.** As round 1. Write every instrument and log under this worktree's `tmp/units/` or `tmp/probe/`
with the `oc` prefix, and nothing into the session scratchpad.

**Standing conditions.** The validation copy under `tmp/probe/` is rebuilt for this round from
`2a3f223`, your owned files, and your revised shared patch; delete it before the report.

## Unknowns

None.

## Scope

**Owned.** Round 1's owned files, at the `_navbar.scss` comment and any site the sweep finds.

**Shared (report-only).** `guides/veneer.md` (the Offcanvas `plugin` row and the ramp paragraph), and
any shared line the sweep finds; return one revised `oc-shared-3.patch` against `2a3f223` that
supersedes `oc-shared-2.patch` whole.

**Off-limits.** As round 1.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-oc/tmp/units/oc-report-3.md` and the same text as the final message: each
fix with its file, the before and after text, and the release source lines each clause rests on; each
gate's command exactly as it ran with every argument and its result line; `oc-shared-3.patch`,
`oc-3.diff`, `oc-3-status.txt`, and an interdiff against round 2 at `tmp/units/oc-3-shared-interdiff.txt`.
The report states no temporal word and no tally, and follows every code token with a noun.

## Deviation contract

Stop and report per `.agents/orchestration.md` § Deviation protocol when a fix cannot be made without
changing what ships beyond the sentence it names. Decide, record, and carry on for re-flowing a
paragraph or comment the fix touches and for the exact wording of O-d within what the source bears out.

## Fixes

- **O-d.** Rewrite the Offcanvas `plugin` row's trigger, dismiss, and `Escape` clauses as the calls the
  release makes, read from `node_modules/bootstrap/js/src/offcanvas.js` and `util/component-functions.js`:
  a toggle trigger calls the `hide` method of the open panel, which that panel's `hide.bs.offcanvas`
  event can cancel, then calls the `toggle` method of the panel it names; a dismiss trigger calls the
  `hide` method of its panel unless the trigger is disabled; the `Escape` key calls the `hide` method
  under the `keyboard` option. Promise no unconditional visibility change. Keep every other clause.
- **O-e.** Give the `fixed` value, the `keyboard: false` setting, and the ramp paragraph's `auto` and `0`
  values their nouns.
- **O-f.** Rewrite the `_navbar.scss` comment's sentence after the one round 2 replaced so it states what
  wins: the bar's more specific rule unfixes and shows the panel, and the release's `!important` flags
  on the panel's width, height, border, and transform, and its important visibility declaration, win over
  the placement and hidden rules the offcanvas partial writes; check each clause against the built
  cascade before writing it.
- Sweep every line rounds 1 and 2 added for another unconditional behaviour clause or bare token.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. On the rebuilt validation copy: `npm run check`, `npm run build:src`, the round-1 style proof command,
   `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0.
3. O-d to O-f are present at their sites.
4. `oc-shared-3.patch` passes `git apply --check` on a fresh extract of `2a3f223`, and it differs from
   `oc-shared-2.patch` only at the O-d and O-e sites, any sweep fix the report names, and their re-flow.

## Review evidence

`oc-3.diff`, `oc-3-status.txt`, `oc-shared-3.patch`, `oc-3-shared-interdiff.txt`, and `oc-report-3.md`.
