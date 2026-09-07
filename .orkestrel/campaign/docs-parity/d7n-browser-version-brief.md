# Brief — `d7n-browser-version` (the stale `BROWSER_HAR_CREATOR.version` after the P.1 bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/browser` from the committed tip `e4af75e` (clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-browser-version/` inside this checkout.

## Objective

browser's P.1 bumped `package.json` to `0.0.16`; `src/core/constants.ts` still declares `version: '0.0.15'` inside `BROWSER_HAR_CREATOR`, and the parity case at `tests/src/core/BrowserHARManager.test.ts:23` compares the two (`d7n-browser-converge-report.md` § Defects met, item 1: red on the untouched baseline, `expected '0.0.15' to be '0.0.16'`). This unit moves the literal to the manifest's version so the case reads green.

## Items

1. Take the red-first reading: `PATH=/opt/npm11/bin:$PATH npx vitest run --project src:core tests/src/core/BrowserHARManager.test.ts -t 'stamps archives'` and record its failing line.
2. In `src/core/constants.ts`, change `version: '0.0.15',` inside `BROWSER_HAR_CREATOR` to `version: '0.0.16',`. Change no other byte of the file; the doc block above it stays as it is.
3. Re-run the command of item 1 and record it green.

## Scope

Owned: that one literal in `src/core/constants.ts`. Off-limits: everything else, including the doc block around it, `guides/**`, `README.md`, `tests/**`, every vendored file, `package.json`, `package-lock.json`.

## Acceptance criteria, cheapest first

1. `git status --short` lists `src/core/constants.ts` only; `git diff --stat` reads one file, one insertion, one deletion.
2. `grep -n "version: '0.0.16'" src/core/constants.ts` prints the line; `node -p "require('./package.json').version"` prints `0.0.16`.
3. `npx oxfmt --check src/core/constants.ts` and `npx oxlint --config .oxlintrc.json --deny-warnings src/core/constants.ts` exit 0; `npm run check` exit 0.
4. The item 1 command exit 1 before the edit and exit 0 after, both readings quoted.
5. `PATH=/opt/npm11/bin:$PATH npm run docs` exits 0 and reads `disagreements found: 0` (the guide's constants table names the literal in its description if Ruling 18 applies; if that cell reads `0.0.15` the gate stays at zero because the cell compares to the doc block, and you report the cell's text as an observation for the Orchestrator rather than editing the guide).

## Output

`/home/user/scaffold/tmp/units/d7n-browser-version-report.md`: per item the hunk or the reading, per criterion the command and its last lines, plus the observation of criterion 5. No process diary. No count in prose: name the members or recast the sentence.

## Deviation contract

Stop if the edit reaches any file beyond `src/core/constants.ts` or a criterion goes red for a reason other than the literal.
