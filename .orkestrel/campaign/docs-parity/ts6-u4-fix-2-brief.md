# Unit brief — U4-fix-2: the classifier fixture's shape and one fold (scaffold)

Follows `u4-fix-brief.md`, whose unit stopped under its deviation contract: edit 3 (the `Entry.declaration` booleans) reddens the classifier fixture in `tests/src/core/templates.test.ts`, which that brief left off-limits. The scoping was the Orchestrator's error; this brief grants the file.

## Role and engine

`builder`, Sonnet. Perform the assignment directly and spawn nothing. You are the sole writer in `/home/user/scaffold` for the life of this unit.

## Objective

Bring the classifier fixture to the boolean `declaration` shape the template now emits, fold the one-use `requireDriver` helper into its binding, and take the staged proof reading U4-fix could not reach.

## Context

- Read first: `/home/user/scaffold/AGENTS.md` § Design laws (fold trivial one-use logic into its caller), then `u4-fix-report.md` under `/home/user/scaffold/.orkestrel/campaign/ts6-api/` § Deviation, then the case `classifies staged exports by browser reachability and runtime format` in `tests/src/core/templates.test.ts` (about lines 1500 to 1780) and the proof block's `Entry` interface and `buildStage` in `src/core/templates.ts` (about lines 1173 to 1180 and 1660 to 1680).
- The tree carries U4 and U4-fix uncommitted; commit nothing. `dist/src/core` and `dist/bin` were rebuilt by U4-fix and reflect the template as it stands; the classifier lift in the test reads the emitted proof, so the fixture must match what the template emits now.
- Host: Linux, Node 22.22.2, npm 11 at `/opt/npm11/bin`. The staged proof instrument is `/home/user/scaffold/.orkestrel/campaign/ts6-api/instruments/u4/proof.sh` (read it first; it re-emits the proof into a staged copy under the scratchpad, runs the baseline, then the two planted controls, and writes nothing under `/home/user/scaffold`).

## Scope

Owned: `tests/src/core/templates.test.ts` (the case named above only), `src/core/templates.ts` (the `requireDriver` function and the `BROWSER_DRIVER` binding only). Off-limits: everything else, in particular `tests/distribution.test.ts`, every vendored file, `package.json`, and `.orkestrel/**`.

No `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, no commit, no install, no `npm run build`, no tree-wide `format` or lint `--fix`; `npm run build:src:core` and `npm run build:src:bin` are permitted if the emitted proof must be refreshed after edit 2.

## Edits

1. **The fixture's shape.** In the case named above, every `declaration: { module: …, commonjs: …, browser: … }` literal in the expected `entries` carries booleans that state whether the classifier resolved that face's declaration: a path string becomes `true`, `undefined` becomes `false`. Change nothing else in the expectation (the other members, the `undeclared`, `excluded`, `targets`, and `subpaths` lists stay). Keep the case's name and comment.
2. **The fold.** In `src/core/templates.ts`, replace `function requireDriver(label: string): Resolution { … }` and `const BROWSER_DRIVER = requireDriver('bundler')` with one module-scope binding that finds the `bundler` row of `RESOLUTIONS` and throws when it is absent, in the style of the file's other module-scope guards, so the one-use helper is gone; keep the comment that names why the browser face answers under that driver alone.

## Unknowns

- The staged proof: run `bash /home/user/scaffold/.orkestrel/campaign/ts6-api/instruments/u4/proof.sh` after your edits and quote every line it prints; the expected reading is `baseline exit=0` with every test passed and each plant reporting lines naming it with `vitest exit=1`. Report the reading either way.

## Output

Write `/home/user/scaffold/tmp/units/ts6-u4-fix-2-report.md` with: per edit one to three sentences and the lines; the unknown answered with the instrument's output quoted; every criterion below with PASS or FAIL and its evidence; and any deviation.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a member of the expectation other than `declaration` differs from what the classifier emits, when the fold needs a file you do not own, or when the staged proof reddens on something these edits did not touch.

## Acceptance criteria (cheap first)

1. `npx oxfmt --config .oxfmtrc.json --check src/core/templates.ts tests/src/core/templates.test.ts` exits 0.
2. `npx oxlint --config .oxlintrc.json --deny-warnings src/core/templates.ts tests/src/core/templates.test.ts` exits 0.
3. `grep -n "requireDriver" src/core/templates.ts` prints nothing.
4. `npx tsc --noEmit --project tsconfig.json` exits 0.
5. `npm run test:src:core` exits 0.
6. The staged proof instrument reports the expected reading (the unknown).

## Review evidence

The Orchestrator captures `git diff` and `git status --short` after you exit; write nothing under `.orkestrel/`.
