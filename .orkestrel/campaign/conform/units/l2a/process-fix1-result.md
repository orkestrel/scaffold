Fix round 1 complete. Every row P1 to P10 closed; the gate chain is green.

## Touched files

| File | Change |
| --- | --- |
| `/home/user/fleet/process/src/server/processes/Process.ts` | Moved from `src/server/`; `cloners` and `helpers` imports reach the module root |
| `/home/user/fleet/process/src/server/processes/ProcessManager.ts` | Moved from `src/server/`; imports unchanged |
| `/home/user/fleet/process/src/server/processes/Session.ts` | Moved from `src/server/`; imports unchanged |
| `/home/user/fleet/process/src/server/processes/Supervisor.ts` | Moved from `src/server/`; imports repointed; the `deliver` `@example` now constructs its own engine with `writable: true` |
| `/home/user/fleet/process/src/server/index.ts` | Star-exports the four class modules from `./processes/` |
| `/home/user/fleet/process/src/server/factories.ts` | Imports `Process`, `ProcessManager`, `Session` from `./processes/` |
| `/home/user/fleet/process/tests/src/server/processes/{Process,ProcessManager,Session}.test.ts` | Moved; `setupServer` import repointed |
| `/home/user/fleet/process/tests/src/server/processes/Supervisor.test.ts` | Moved; two cases carry `{ timeout: 20_000 }`; the pendency case inherits the default drain window |
| `/home/user/fleet/process/tests/src/server/factories.test.ts` | Backlog-refusal case carries `{ timeout: 20_000 }` |
| `/home/user/fleet/process/tests/src/server/helpers.test.ts` | The Windows tree-kill case carries `{ timeout: 40_000 }` |
| `/home/user/fleet/process/tests/guides.test.ts` | `Supervisor` imported; transcription cases for the class and `deliver` examples |
| `/home/user/fleet/process/guides/process.md` | Entities lead reworded; `Supervisor` readonly members named in Surface notes; moved test paths |
| `/home/user/fleet/process/README.md` | Names `Supervisor` in the Guide paragraph and the Package server list |
| `/home/user/scaffold/tmp/units/conform/conform-process-report.md` | Rewritten for the whole unit, with a `## Fix round 1` section |

Diffstat, `git diff --stat HEAD`: 18 files changed, 723 insertions(+), 112 deletions(-).

## Failing-first tests

- `returns what deliver's example claims` — red at `1 failed | 113 passed | 1 skipped`, `expected false to be true`, captured at `/home/user/work/evidence/process-proofs/fix1-P2-control-red.txt`; green at `114 passed | 1 skipped` in `fix1-P2-green.txt`. The class example's claim passed in the same red run, which localizes the defect to `deliver`.
- P8 ran the question rather than reasoning about it: the never-holding predicate re-planted with the case timeouts in place reported `2 failed | 142 passed | 8 skipped`, each failure naming its own condition (`Condition "the orphan root records its own native exit" did not hold within 10000ms`), never a case timeout. So both comments are true and stay. Evidence: `fix1-P8-control-red.txt`, restored green at `fix1-P8-green.txt` (`144 passed | 8 skipped`).

## Gates (exit 0 each, 2026-09-03)

`format:check` 56 files clean · `lint:check` no diagnostic · `check` root plus both scopes clean · `build` core and server, ES and CJS · `test` `src:core`+`src:server` 196 passed 8 skipped, `policy` 111, `config` 46, `setup` 10, `guides` 114 passed 1 skipped.

## Deviations

1. **`git mv` does not create its destination directory.** Expected the move brief's "git creates the directory"; found exit 128, `fatal: renaming 'src/server/Process.ts' failed: No such file or directory`. Took the brief's own stated fallback: the Write tool created each directory, then `git mv -f` moved the tracked file over the placeholder. `git status --short` records those files as renames with no content change, so nothing stray remains. Done, not stopped, because the brief names the fallback.
2. **P10 cannot be met as worded, and the cause is the tool.** `npx oxlint --config .oxlintrc.json --deny-warnings .` prints nothing at all on a clean tree, on stdout or stderr, and its `stylish` reporter prints nothing either, so `gate-lint-check.txt` is banner-only after a fresh capture. I added `/home/user/work/evidence/process-proofs/gate-lint-check-json.txt` from the same configuration and population under the `json` reporter, which does carry a result: `"diagnostics": []` over 36 files and 128 rules. Read the pair as this gate's evidence.
3. **P4's criterion reaches a site the finding did not name.** `tests/src/server/helpers.test.ts` `reaches a detached descendant while the root is alive and leaves one whose root already exited` runs three sequential `{ budget: 10_000 }` conditions under the default timeout and is skipped off Windows. It took `{ timeout: 40_000 }`, the value the same file already uses for its longest case, so every budget in `tests/src/server/**` now sits inside a case that outlives it.
4. **Carried, not rows, as instructed:** r1b F3 (the `try`/`finally` gap in `Supervisor.test.ts`, house style shared with `Process.test.ts`) and r1b's referral on whether the published `Supervisor` should expose the raw `stdout` `Readable` at all. Nothing changed for either.

## Observations, not criteria

- The first `test:src:server` run after P4 and P5 landed reported `1 failed | 192 passed | 8 skipped` on an **untouched** case, `Process.test.ts > reaches the terminal moment on stop alone with no destroy call`, `Test timed out in 5000ms`. The immediate re-run reported `193 passed | 8 skipped`, and every later run of that project and of `npm test` was green. The deciding run belongs to you after this unit exits.
- Pre-existing sites in `tests/src/server/processes/{Process,Session,ProcessManager}.test.ts` carry `{ budget: 5_000 }` under the 5 s default timeout. That does not *exceed* the timeout, so criterion 4 holds, but it cannot outlive it either, so such a site would report the case timeout rather than its condition. Recorded against the capability that owns the server suite rather than reopened here.

## Shared-file patches

None. `/home/user/work/evidence/conform-process.status` lists 18 entries, every one inside Owned.
