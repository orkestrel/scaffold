# Unit propagation-6, continuation — allocate the adopter outside the checkout and run it whole

Fill every section. Write `none` in an empty one.

## Role and engine

`astra` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief with a full shell. Executor: BENCH_ENGINE. Perform the whole assignment yourself and spawn nothing. You are the sole writer in `C:/Users/mikes/WebstormProjects/scaffold` for this unit's duration.

## Objective

The previous run of this unit (report: `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-6-report.md`; brief: `tmp/units/propagation-6-brief.md`, whose Execution, Scope, and Tree state sections still bind) wrote the scratch adopter in `tests/distribution.test.ts` and `spawnNpm` in `tests/setupServer.ts`, generated and installed the complete selection, and stopped when the generated workspace's `npm run lint:check` exited 1 with `No files found to lint`: the adopter was allocated under this checkout's ignored `tmp/`, so Oxlint's ignore discovery, reading the parent repository, excluded the whole workspace. Allocate the adopter under the host's temporary directory (`os.tmpdir()`, as `.claude/rules/portability.md` prescribes and as a real external consumer sits), run every adopter step to the end, and rewrite the report as the finished unit's.

## Context

- **The allocation.** Read how `createScratch` in `tests/setupServer.ts` chooses its root and where the previous run placed `tmp/propagation-adopter-*`; make the adopter case allocate under `os.tmpdir()` (through the existing helper if it takes a root, otherwise through the smallest change to the helper, proved in `tests/setupServer.test.ts`), with `createTeardown` removing it. Nothing of the adopter lives under the checkout.
- **The steps.** As the original brief's step 2: pack once, generate `--src core,browser --app core,browser --styles --themes --showcase --extend browser:vue,styles:print` through the packed CLI, install with `--ignore-scripts --prefer-offline --no-audit --no-fund`, then run `lint:check`, `check`, `build`, `test:src`, `test:app`, `test:setup`, `test:setup:browser`, `test:config`, `test:policy`, `test:journey`, `test:journey:vue`, `build:showcase`, `build:showcase:vue`; assert each exit code; assert `showcase/browser.html` and `showcase/vue.html` carry one stamp line equal to `computeStamp` of the page; import the built CSS exports (`./styles`, `./print`, `./styles/themes`) from a consumer; delete `configs/src/vite.print.config.ts`, run `repair --offline --json`, assert the file returns byte for byte; append a line to it, run `audit --offline --json`, assert the stale report names it. Read every generated script's output bare and quote any failure in full; the vendored lint config was repaired this campaign (`propagation-5`), so the generated workspace's `lint:check` is the first real reading of the seeds under live restrictions, and a hit there is a finding to quote, not to silence.
- **Timing.** Measure the whole adopter; the distribution project's timeout and the case's 600 000 ms limit are as the previous report states; if the run needs more, report the number and stop.
- **Tree state and gates.** As the earlier briefs: uncommitted campaign changes everywhere, never touched; `npm run build` before `npm run test:distribution`; `host.json` differs by regeneration alone.

## Unknowns

- Whether the generated workspace's `lint:check`, `check`, or the Chromium projects surface a defect in a seed under the live restrictions; the run settles it, and every hit is quoted.

## Scope

- **Owned.** As the original brief: `tests/distribution.test.ts`, `tests/setupServer.ts`, `tests/setupServer.test.ts`, `host.json` (regenerated only).
- **Off-limits.** As the original brief.
- **Tools and limits.** As the original brief.

## Execution

1. Move the adopter's allocation to `os.tmpdir()`; prove the helper change if any.
2. Run, in order: `npx oxfmt --config .oxfmtrc.json --write tests/distribution.test.ts tests/setupServer.ts tests/setupServer.test.ts`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint --config .oxlintrc.json tests`, `npm run test:setup`, `npm run build`, `npm run test:distribution` (bare; let it complete), then `npx oxfmt --config .oxfmtrc.json --check` over the three files.
3. Record every adopter step's exit code and output, the page-stamp readings, the CSS consumer result, the repair and audit readings, and the wall time.

## Output

Rewrite `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-6-report.md` as the finished unit's report: the files changed; every helper with one line; the adopter's step table with exit codes and outputs; the wall time; each command, its exit code, and its test count; every deviation. Your final message is that report verbatim. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when a generated script fails for a reason in the generator or a seed (quote its output bare: a real finding), when the install needs the network and it is unavailable, when the run exceeds the project's timeout, or when a change needs a file outside the owned set.

## Acceptance criteria

1. `tsc`, scoped lint, and scoped format exit 0.
2. `npm run test:setup`, `npm run build`, and `npm run test:distribution` exit 0 with the adopter case complete.
3. No file outside the owned set differs from its state at your start; `host.json` differs by regeneration alone; no scratch directory remains under the checkout or the temporary directory.

## Review evidence

The diff of the owned files and the report.
