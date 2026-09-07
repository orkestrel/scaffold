# Brief — U0 `d7-guide-headstart` (the guide checkout takes scaffold's vendored delta and the seed)

## Role and engine

Orchestrator-owned unit, run as one tracked script (`instruments/d7/u0/u0-headstart.sh`) with its log retained beside it. The `checker` audits it in round R1 together with U1, against this brief and the actual diff and status. It performs the assignment directly and spawns nothing.

## Objective

`/home/user/fleet/guide` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `b7dc578`, clean) carries `version` `0.0.18`, the vendored delta `repair --offline` writes from the head-started scaffold, and the voice-rule sites P15 measured, committed by path on that branch with the tree clean after, so U1 dispatches from a committed baseline whose gates read green.

## Read first, in this order

`/home/user/scaffold/AGENTS.md`; `.claude/rules/workspace.md` § Policy instruments and the vendored-imports bullet; `.agents/orchestration.md` § Fixing a dependency before it publishes; `.orkestrel/campaign/docs-parity/d7-guide-plan.md` rulings 6 and 7; `orchestrator-measurements.md` § P14 and § P15.

## What is fixed

- The head start: `node_modules/@orkestrel/scaffold` in the guide checkout is scaffold's tip packed at `81ed3321` (P14), installed `--no-save`; `dist/host/scripts/docs.ts` there is byte-equal to `/home/user/scaffold/scripts/docs.ts` (checked in the script). The replaced range `^0.0.63` is recorded in P14; `npm ci` restores the registry copy before U3.
- `repair --offline` from `node node_modules/@orkestrel/scaffold/dist/bin/main.js` writes exactly the P15 list: `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `scripts/docs.ts`, the `docs` script row in `package.json`, and the `"@orkestrel/guide": ["./src/core/index.ts"]` paths entry in `tsconfig.json`. It leaves every `@orkestrel/*` range, `README.md`, `guides/**`, `tests/guides.test.ts`, `tests/setup.ts`, and `src/**` untouched.
- The voice-rule sites and their fixes (each a file the guide owns, none vendored):
  - `tests/fixtures/broken/missing-example/module/helpers.ts:5` — the `greet` block opens at its `@example` tag; it gains the description line `Greets \`name\`.` and a blank continuation line before the tag. The fixture's purpose (`greet` exampled, `farewell` not; `tests/src/core/helpers.test.ts:1965-1981`) is unchanged.
  - `tests/fixtures/good/tests/widget.test.ts:1` — `Dummy` becomes `Placeholder`.
  - `tests/setup.ts:13` — `Require markdown whose first block is a table.` becomes `Requires markdown whose first block is a table.`
- `version` `0.0.17` → `0.0.18` in `package.json:3`, the only tracked site (P15).

## Standing conditions

- `npm run docs` exits 1 with `rows read: 1, disagreements found: 139` after a build (P15); that reading is the worklist U2 converges, not a failure of this unit.
- The lockfile does not change; no marker action.
- The permission system denies discard-class git commands; an edit is undone by editing.

## Scope

Owned: the files named under What is fixed. Off-limits: every other file, `guides/**`, `README.md`, `src/**`, `tests/guides.test.ts`. Tools: the script's commands only; no install, no publish, no `git checkout`/`restore`/`stash`/`reset`/`clean`.

## Unknowns

- Whether `npm run format:check` reads the vendored files clean under the guide's `.oxfmtrc.json`. The script reports the exit code; a red on a vendored file is a deviation (never edited in a target) and stops the unit before the commit.

## Acceptance criteria, cheapest first

1. `grep -n '"version"' package.json` prints `0.0.18`.
2. `git status --short` after `repair --offline` lists exactly the P15 paths.
3. The fixed sites read as What is fixed states (`sed -n` in the log).
4. `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:policy`, `npm run test:config`, `npm run build` exit 0.
5. `npm run docs` prints `rows read: 1, disagreements found: 139` (exit 1, expected).
6. The commit stages by path; `git status --short` is empty after it; the branch is pushed.

## Output

`d7-guide-headstart-report.md`: per criterion the command and its reading, the commit hash, and any deviation.

## Deviation contract

A gate red on a file this unit does not own stops before the commit; the log is the evidence.

## Review evidence

The diff and the status output before the commit, in the log; the commit's `--stat`.
