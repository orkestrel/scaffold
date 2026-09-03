# Unit T2 — follow the layer's renamed readers in terrain's suite

## Role and engine

`builder` on Sonnet, native Claude Code subagent. Sole writer in
`C:\Users\mikes\WebstormProjects\terrain`. Perform the assignment directly and spawn nothing.
Fully specified; stop on any deviation.

## Objective

Rename every call into `@orkestrel/test/browser` that the 0.0.12 release renamed, so the suite
compiles and runs against the re-staged build.

## Context

`node_modules/@orkestrel/test` holds the 0.0.12 build packed from test commit `e7739e2`, re-staged
with `npm install --no-save` by the Orchestrator before this unit launched. Prove it first:
`grep -c readContrast node_modules/@orkestrel/test/dist/src/browser/index.js` prints a number
above zero, and `grep -c 'export function contrast' node_modules/@orkestrel/test/dist/src/browser/index.d.ts`
prints zero. Standing conditions: `git status --porcelain` shows a staged `package-lock.json`
change by the user; never stage, restore, or rewrite it; commit nothing; no `npm install`.

## The renames

| Was                       | Now                          |
| ------------------------- | ---------------------------- |
| `contrast(`               | `readContrast(`              |
| `style(`                  | `readStyle(`                 |
| `token(`                  | `readToken(`                 |
| `rootToken(`              | `readRootToken(`             |
| `pixels(`                 | `readPixels(`                |
| `rgba(`                   | `parseCSSColor(`             |
| `colorEqual(`             | `matchesColor(`              |
| `portfolio.states` (the `PortfolioInterface` member) | `portfolio.placements` |

The `states` option passed into `createPortfolio` keeps its name. A CSS `rgba(...)` literal inside
a string is not a call and keeps its text.

## Steps

1. In `tests/app/browser/integration.test.ts`, `tests/app/browser/setup.ts`,
   `tests/app/browser/styles/tokens.test.ts`, `tests/setupBrowser.ts`, and any other file under
   `tests/` that imports from `@orkestrel/test/browser`, rename the import specifiers and every
   call site per the table. Read each hit before changing it.
2. Run `npm run check` and `npm run lint:check`; both exit 0.
3. Run the integration file at `light-1280` and `dark-390`, and the tokens file:
   `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser <file>`
   with `VITE_VARIANT` set; every run green.
4. Run `npm run format:check`; exit 0.

## Scope

**Owned.** The test files named in step 1. **Off-limits.** Everything else; no commit; no
`git checkout`/`restore`/`stash`/`reset`/`clean`; no `npm install`.

## Output

Write `tmp/units/terrain-rename-report.md` in the terrain checkout and return it: the installed
build proof, per file the count of renames, the gate and run readings, `git diff --stat`,
`git status --porcelain`.

## Deviation contract

Stop and report when the installed build still exports an old name, when a call site does not
map to one row of the table, or when a run is red for a reason other than a rename.

## Acceptance criteria

1. No old name from the table is called anywhere under `tests/`.
2. `check`, `lint:check`, and `format:check` exit 0; the three runs are green.
