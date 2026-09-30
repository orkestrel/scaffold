# Unit TOKEN-RETIRE round 2 — the forced-colors proof reads what a stylesheet can move, and the prose reads once

Successor to `token-retire-brief.md`, which stays in place unedited and still binds except where this brief overrides it.
What changed: round 1 (`a5a85d8` on `unit/tret`) was audited in `tret-audit-verdict.md` (FAIL 4, 5; F1). This round
carries those findings and nothing else. The fixture edit round 1 made in `tests/src/styles/fixtures/mixins.scss` is
accepted and stays.

## Role and engine

`opus` on Opus 5.5, the same sole writer in `/home/user/veneer-tret` (branch `unit/tret` at `a5a85d8`), resumed. Read
`tret-audit-verdict.md`, `tret-audit-objective-verdict.md` (claim 4), and `tret-audit-subjective-verdict.md` (claim 5
and F1), all under `/home/user/scaffold/.orkestrel/veneer/units/`, and the Orchestrator's run in
`/home/user/scaffold/.orkestrel/veneer/units/tret-instruments/orchestrator-probe/`. The Law, Host, Tools, and Deviation
contract of the first brief bind unchanged.

## Objective

The every-caller forced-colors case fails when a shipped caller's reset paints a shadow; the retired-name proof and
`role-each` name what they test; and each guide sentence the audit named reads once.

## Items

1. **The every-caller case (claim 4).** Make the case `outlines every shipped focus-ring caller at the focus width under
   forced colors and paints no shadow ring` in `tests/src/styles/mixins.test.ts` read a result a stylesheet edit can move:
   each shipped caller's declared forced-colors `box-shadow` text (as `tmp/units/probe/readings.test.ts` reads it), or each
   specimen with `forced-color-adjust: none` so a painted shadow shows. Keep the outline readings. Keep the title true of
   what the case reads.
2. **F1.** In `role-each`, drop the `$tiered` local and write both guards as `@if list.index($aliased, $role)`, the test
   the `:root` loop in `_tokens.scss` writes. Retitle the retired-name case and word its comment with "channel triplet".
3. **Claim 5, the guide.** Apply the subjective lane's smallest fixes, or wording that reads once as plainly:
   "Only the `.btn-tertiary` and `.btn-outline-tertiary` classes read the `tertiary` role, and they read its fill and its
   emphasis tier."; "carries only a fill and an emphasis tier"; "Only that partial holds the tertiary triplet: …"; and the
   `-rgb` sentence written so its purpose attaches to the token, not to `tertiary`. Re-run `npm run test:guides` and the
   reference-map proof.
4. **Plants.** In a successor driver `tmp/units/tret-plant-2.sh`, which records the target's digest before the plant and
   compares the restored file with that digest: **`shadow`**, the `.btn` caller's `$reset` in
   `src/styles/components/_button.scss` written as `0 0 0 5px red`, which must fail the every-caller case with an
   `AssertionError`; re-run round 1's `focus-reset` and `tertiary-subtle` plants (the latter against the new guard). The
   `shadow` plant's file joins the owned set for the plant alone.

## Execution

Perform the assignment directly and spawn nothing. Run the `shadow` plant red against the round-1 case first (record the
command and its result), then Items 1 to 3, then the plants, then every Acceptance gate of the first brief, logged under
`tmp/units/` with the `-2` suffix.

## Output

Write `tmp/units/tret-report-2.md` and return the same text: the red and green readings; the case as written; the plant
table; the guide sentences as written; the gate table; `tmp/units/tret-2.diff` (`git diff a5a85d8`) and
`tmp/units/tret-2-status.txt`. State no count in prose.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` exits 0 over the owned files.
2. After `npm run build:src:styles`, `tokens.test.ts` and `mixins.test.ts` pass.
3. Every plant fails a case with an `AssertionError` and restores to its pre-plant digest.
4. After `npm run build:src`, `npm run test:setup`, `npm run test:conformance`, `npm run test:guides`, and
   `npm run test:policy` exit 0.

## Review evidence

The diff and status, the plant logs, and the gate logs. The audit runs the objective and subjective lanes on a successor
claims file.
