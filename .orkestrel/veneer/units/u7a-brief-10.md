# Unit U7a — fix round brief 10: the contrast assertions without a conditional expect

## What changed and why

This brief supersedes `u7a-brief-9.md`; that brief stands, and
`u7a-report-9.md` is the baseline: every finding of the round is closed in the working
tree (findings 3, 5, 9 reverted, 6, 7, 2, 4, 8, 1), the two controls reddened and are restored,
the styles suite passes 104 cases on managed Chromium, `format:check` exits 0, and the unit
stopped on the next gate: `lint:check` rejects the contrast case's branches under
`vitest/no-conditional-expect` (`tests/src/styles/components/button.test.ts:47-90`), because
the case chooses between the `light` role's floor and the other roles' pinned ratio inside one
`it`. The lint rule is right; the assertion shape was the brief's suggestion.

## Finding carried

- Restructure the contrast assertions so no `expect` sits under a condition: split the
  population in `tests/setupStyles.ts` into two exported frozen tables — the rows that assert
  the 4.5 floor (the `light` role, both modes) and the rows that pin a measured ratio (every
  other role and mode, `toBeCloseTo(…, 2)`) — and register one `it.each` (or one `for` loop of
  `it` calls) per table, each with its unconditional assertion; add the two names to the
  export-inventory case and remove `BUTTON_CONTRAST_CASES` if nothing reads it (the standing
  clause). Red first: the lint gate is the red (`gate-lint-9.log`); green when `lint:check` exits
  0 and the styles suite still passes with the same readings.

## Role, engine, law, context, host, unknowns, output, scope, controls, deviation contract

As in `u7a-brief-9.md`, verbatim. `HEAD` is `2bc922d`; the working tree carries the
brief-9 tree, uncommitted, controls restored. Continue from it; do not restore or reset
anything. The controls need not re-run: their red readings and restore proofs in report 9
stand, and this change touches no partial.

## Execution

1. The restructure above; `npm.cmd run lint:check` green; `npm.cmd run test:src:styles` green
   with the contrast readings unchanged.
2. Then the remaining gates in order: `npm.cmd run format:check`, `npm.cmd run check`,
   `npm.cmd run test:src:core`, `npm.cmd run test:setup -- tests/setupStyles.test.ts`,
   `npm.cmd run test:conformance`, `npm.cmd run test:guides`,
   `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles`; record each command's final lines and
   the cascade's SHA-256 (expected to stay `14cbc6faabb24667bcd75068bec54c0d9c1646ec27a7b237bc11c500d6b5d363`,
   since no partial changes).

## Output

Write `u7a-report-10.md` and return its content: the two tables' names and the cases
that read them; the export-inventory names added and removed; the lint red-then-green; each
gate's final lines; the digest; the actual `git diff --stat` and `git status --porcelain
--untracked-files=all`. Do not repeat reports 5 to 9.

## Acceptance criteria

1. No `expect` under a condition in the two Button test files; `npm.cmd run lint:check` exits 0.
2. Every gate in item 2 exits 0 on managed Chromium and Edge; the styles suite's contrast
   readings match report 9's table.
3. `git status --porcelain --untracked-files=all` shows only the owned set and the report.

## Review evidence

The actual `git diff` and `git status` at return; this report with reports 5 to 9.
