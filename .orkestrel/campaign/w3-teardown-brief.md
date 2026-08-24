# Unit W3 — probe: bounded createTeardown adoption

Role: builder. Engine: native cheap tier. You perform this unit directly and spawn nothing.

## Objective

In `/home/user/orkestrel/probe` (baseline: the head commit when you start), land the
`createTeardown` half of ruling 11 from
`/home/user/scaffold/.orkestrel/campaign/d2c-reconciliation.md`: adopt `createTeardown` from
`@orkestrel/test` ONLY in `finally` blocks holding MORE THAN ONE teardown call (the leak it
exists to fix — an early teardown throw skips the rest). Single-call `finally` blocks STAY.

1. Read the installed `createTeardown` declaration in
   `node_modules/@orkestrel/test/dist/src/core/index.d.ts` first and follow its real contract.
2. Find the sites: `grep -n -A6 "finally" tests/src/**/*.test.ts` and judge each block by its
   teardown-call count. The map in
   `/home/user/scaffold/.orkestrel/campaign/g-probe-tests.md` (§ 1-2) lists known multi-call
   blocks; re-locate by fragment.
3. Convert each qualifying block; leave every single-call block byte-identical. Name every
   converted and every skipped multi-call block (with the reason) in the report.

## Environment

Native run; `node_modules` installed; Vitest runs for you. Scoped runs only.

## Scope

- Owned: the `tests/src/**` test files the grep names.
- Off-limits: `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`,
  `tests/setup*.ts`, `src/**`, `vite.config.ts`, guides. No commits.

## Acceptance criteria (cheap-first)

1. Scoped oxlint/oxfmt clean on touched files.
2. One scoped suite per touched file green where the suite does not spawn children; spawning
   suites recorded as host observations with exact commands.
3. The converted/skipped ledger complete.

## Deviation contract

Stop and report if `createTeardown`'s real contract cannot express a block's ordering needs —
report the block, do not improvise a wrapper.

## Output

Final message = report: converted and skipped ledgers, gate tails, `git diff --stat`,
`git status --porcelain`, deviations or none.
