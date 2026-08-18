# Unit: replace fake timers with real short timers and observable assertions

## Role and engine

`implementer` on **Opus 5**, one instance per repository. Each instance owns exactly one repository
and never reads or writes another.

## Objective

The fleet policy rule `policy(no-mocking)` now fails these repositories' `lint:check`. Rewrite every
fake-timer test to drive real short timers and assert observable behaviour, so the gate passes
because the tests are correct — not because the rule was weakened.

## Your repository

The dispatch message names it. Its sites:

| Repository | File                                    | `useFakeTimers` | `advanceTimersByTime` | `getTimerCount` |
| ---------- | --------------------------------------- | --------------- | --------------------- | --------------- |
| `console`  | `tests/src/core/Spinner.test.ts`         | 15              | 3                     | 18              |
| `agent`    | `tests/src/core/Agent.test.ts`           | 4               | 2                     | 3               |
| `ollama`   | `tests/src/server/OllamaProvider.test.ts` | 4               | 0                     | 4               |

Counts were taken with `grep -rho` over `tests/`. Re-measure in your own repository as step one and
report any disagreement rather than trusting this table.

## Two distinct violations, two distinct repairs

Do not treat these as one search-and-replace. They fail different rules and need different fixes.

**1. `useFakeTimers` / `advanceTimersByTime` replace the host clock.**
`.claude/rules/tests.md`: "Prefer real short timers and observable wakeups. Never replace the host
clock." Keep default suites fast — canon puts test timers at 10–50 ms.

Repair: configure the entity's own period to a real short value and wait real time.
`console`'s `SpinnerOptions` exposes `interval` (`src/core/types.ts:1013`); check for the equivalent
option in your repository and report if none exists. Wait with `waitForDelay` from `@orkestrel/test`
— every one of these repositories declares it — and never with an inline timeout promise.

**2. `getTimerCount()` asserts a scheduler internal.**
`.claude/rules/tests.md`: "Do not assert private state, internal timers, or framework scheduler
internals." This one is not fixed by switching to real timers. It is fixed by asserting the property
through the public surface instead.

Repair, by what the assertion was actually proving:

- `expect(vi.getTimerCount()).toBe(0)` as a **leak guard after stop** → wait longer than one period
  with `waitForDelay`, then assert the recording sink received no further frames. That proves the
  timer stopped, observably.
- `expect(vi.getTimerCount()).toBe(0)` proving a path **never armed a timer** → same shape: wait a
  period, assert nothing was written.
- `expect(vi.getTimerCount()).toBe(1)` proving the entity is **running** → assert the public state
  the entity already publishes (`console`'s `Spinner` exposes `active`), or assert frames keep
  arriving. Prefer the public state.

## Constraints

- Never delete, skip, or `.todo` a test to satisfy the linter. `AGENTS.md` forbids removing a symbol
  to silence lint, and the same applies to a proof.
- Never add `oxlint-disable` or `eslint-disable`. The policy sweep fails on either, and it is not
  suppressible from inside a file.
- Every test must still fail for the defect it named. Where you change what a test asserts, the new
  assertion must be at least as strong as the old one against that defect. Where it cannot be, say
  so explicitly rather than quietly weakening it.
- Keep each test's total real wait small. A test that now sleeps for seconds is a defect; reduce the
  configured period instead.
- Do not change `src/`. If a test cannot be rewritten without a source seam — a missing injectable
  period, an unobservable stop — **stop and report it**. That is a real finding and the Orchestrator
  routes it, per `.claude/rules/tests.md`: "Untestable usually means missing seam."

## Standing conditions — known, do not report these as deviations

- **The tree is dirty.** Your repository carries ~27 uncommitted vendored-host changes from a
  propagation wave. `git status` is noisy. Leave every one of them alone.
- **`tests/config.test.ts` contains the string `useFakeTimers` inside a lint-rule fixture.** It is
  text in a fixture, not a call, and the linter does not flag it. It is vendored. Do not touch it.
- Your repository's `lint:check` currently fails **only** on `policy(no-mocking)` in your owned test
  file. If you see any other error, that is a finding: report it.

## Scope

**Owned files:** the single test file named for your repository in the table above, plus any
`tests/setup*.ts` in the same repository if a shared helper is the right home for a repeated wait.

**Off-limits:**

- `src/**` — no source change is in scope.
- `AGENTS.md`, `CLAUDE.md`, `.claude/**`, `.agents/**`, `.codex/**`, `.cursor/**`
- `configs/**`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`
- `.oxlintrc.json`, `.oxfmtrc.json`, `.prettierignore`, `package.json`, `package-lock.json`
- `vite.config.ts`, `tsconfig.json`
- Every other repository under `/workspace`

**Permissions.** Do not commit, push, install a dependency, or run a destructive command. Do not run
`npm run format` or `lint --fix` tree-wide; scope any formatting to your owned file.

## Execution

Perform this assignment directly. Spawn nothing.

## Governing law

Read before editing: `AGENTS.md` and `.claude/rules/tests.md`. No skill is named for this unit.

## Unknowns

- Whether your repository's entity exposes a configurable period at all. `console` does; the
  Orchestrator did not check `agent` or `ollama`. Find out first and report what you found.
- Whether any of these tests depends on fake timers for something neither category above covers — a
  date, a deadline, an expiry. If so, name it and say what you did.

## Acceptance criteria

Each closes using owned files alone.

1. `grep -rn "useFakeTimers\|advanceTimersByTime\|getTimerCount\|useRealTimers\|setSystemTime" tests/src/`
   returns nothing.
2. `npm run lint:check` exits 0.
3. Your owned test file passes, with a test count **equal to or greater than** the pre-change count.
   Record both counts and the exact command. A count that dropped means a test was lost — that is a
   deviation, not a result.
4. The file's wall-clock runtime stays under 10 seconds. Record it.
5. `npm run check` exits 0.
6. `npx prettier --check` on your owned file passes.

## Output

Return, and nothing else:

- Your re-measured site counts versus the table above.
- Whether the entity exposes a configurable period, and what you set it to.
- For each `getTimerCount` site: what it was proving, and the observable assertion that replaced it.
- Test counts before and after, the exact command, and the file's runtime.
- Any test whose assertion is now weaker than before, and why it could not be kept as strong.
- Exit status of each acceptance command.

No process diary.

## Deviation contract

Stop and report if a rewrite needs a `src/**` seam, if a test count would drop, or if a fake-timer
use falls outside both categories above. Report expected, found, exact evidence, done or not done,
and at most one hypothesis. Do not redesign and do not touch source.

How a replacement test is worded, where a shared wait helper sits, and which real period you pick
inside the 10–50 ms band are yours to decide. Decide them and carry on.
