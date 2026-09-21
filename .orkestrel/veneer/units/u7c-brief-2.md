# Unit U7c — fix round brief 2: the audit's implementation findings

## What changed and why

This brief supersedes `u7c-brief.md`; that brief stands with its dispatch message
`u7c-dispatch-message.txt`, and `u7c-report.md` is the baseline. The audit
round on the brief-1 tree (claims `../u7c-audit-claims.md`) confirmed the section, the
specimen table, the projection, the journeys' drives, the capture registry, and the consumer
case, and the verifier's whole chain exits 0 on Chromium and Edge (`npm test`, `test:journey`,
`CAPTURE=1 test:journey`, `test:guides` included). The findings below are the implementation
defects the lanes substantiated; each names its site. Audits cover implementation only by the
user's ruling: make no wording, comment, or guide-prose change beyond what a code change
requires (a one-line comment beside a table stating why a member is absent is permitted).

## Findings carried

1. (analyst 2) `tests/app/browser/sections/ButtonSection.test.ts`: the ownership proof reclaims
   `Toggle` and `Primary` only, and reclaiming after destruction cannot prove a host was owned
   beforehand. Assert the complete partition before destruction: every plain host refuses a
   second `Button` with `BUTTON_HOST_OWNED`, and every delegated host (`Anchor`, `Toggle`,
   `Pressed`, `Disabled`, `Label`) accepts one (destroy that probe engine at once). Keep the
   release proof after destruction over every plain host. Derive the two populations from
   `BUTTON_SPECIMENS` and `BUTTON_SELECTOR`, never from a hand list.
2. (analyst 4, reviewer 10) `tests/app/browser/integration.test.ts:214` compares the fixture's
   exclusion set intersected with the expected steps against itself, so it cannot fail. Assert
   the property the journey depends on: `EXCLUDED` (the fixture's `oracle.excluded`) equals
   `[]`, so a fixture that gains an exclusion reddens and the unit that regenerates the fixture
   rules on it. Delete the self-comparison.
3. (analyst 4) The dark-mode focus-ring sweep reads `Primary` alone (`integration.test.ts:422`).
   Sweep every `PAINTED` specimen in dark mode as the light-mode sweep does, asserting the
   equality across specimens and pinning the dark value once.
4. (analyst 8, reviewer 11, checker 10) `tests/app/browser/integration.test.ts` declares the case
   matrices `BUTTON_STATES`, `ORACLE_ACTIONS`, `UNDER_BAR`, `PAINTED`, `CONTRAST_BAR`, and
   `DISABLED_OPACITY` and the module-scope functions `driveOracle` and `compareOracle` at module
   scope, unexported and untested. `.claude/rules/tests.md` § Shared test infrastructure puts
   data tables and case matrices in a setup file at any size and exports every reusable helper
   from setup files; `AGENTS.md` forbids hidden module helpers. Move each table and `driveOracle`
   to the setup file its host dependence selects (`tests/setup.ts` for host-independent data,
   `tests/setupBrowser.ts` for anything that names a browser helper or a DOM type), export them,
   and prove them in the matching setup proof (`tests/setup.test.ts` or
   `tests/setupBrowser.test.ts`). Split `compareOracle`: the data-returning half (the two
   projections, `carried`, `skipped`) moves with the driver as an exported, proven helper; the
   `expect` calls stay in the journey (a `setup*.ts` never carries `expect`). Update the export-set
   assertions those setup proofs carry.
5. (analyst 10) `tests/app/browser/integration.test.ts:230`: the teardown awaits the pointer
   release before the media release and the mount cleanup with no `finally`, and the installed
   helper's declaration permits the release to reject. Make each cleanup step independent of the
   preceding step's failure (`try`/`finally` chain or the equivalent), so a rejected release
   never leaves the mounted showcase, the delegate, or the staged media behind.
6. (reviewer 12) `app/browser/sections/index.ts` gives the entity subfolder its own barrel;
   `.claude/rules/architecture.md` § Entity subfolders nests only the class files and keeps
   exports in the module barrel. Delete `app/browser/sections/index.ts` and export
   `./sections/ButtonSection.js` from `app/browser/index.ts`. The app barrel's export set is
   unchanged, so `tests/app/browser/index.test.ts` stays as it is unless it names the deleted
   file. Brief 1 named that barrel in the owned set; the error was the Orchestrator's.
7. (reviewer 13) `tests/setupBrowser.ts:84-93` `resolveSpecimen(root, name)` is named for the
   module's general specimen vocabulary while its body hardcodes `.btn`. Name the helper for the
   population it searches and lift the selector to an exported named constant beside it, or take
   the selector as a parameter so the name and the contract agree; update every call site and the
   setup proof's export set.
8. (reviewer 14) `tests/distribution.test.ts:704` and `:1140`: `readBrowserExports`, its
   `published` field, and the `isNames` guard now carry the engine case's reading, which is not
   a published name set. Rename the reader and the field for what they carry (the page's
   `globalThis.subject` reading), keep the guard's name honest about what it admits, and leave
   the export case calling the same reader with the `exports` drive.

Recorded, not carried: the `destroy()` construction-order clause has no observable consequence
(reviewer, analyst 2) and needs no case; `home--*` and `button-primary-rest--*` frames are
byte-identical because both are page frames of the same page (analyst 5), kept until the
Test-side element-frame defect the report names is fixed; the `Label` specimen's absence from
`ORACLE_ACTIONS` needs no assertion (a one-line comment beside the table may state the reason);
`package.json` publishes `.`, `./browser`, `./styles`, and `./package.json` (no `./server`), a
correction to the claims file's wording and nothing in the tree.

## Role, engine, law, context, host, unknowns, deviation contract

As in `u7c-brief.md` and `u7c-dispatch-message.txt`, verbatim (the `opus`
role on native Opus 5; the law under `C:/Users/mikes/WebstormProjects/scaffold`; the scoped
formatter and lint rewrites granted; the standing clause that an enumerating assertion in an
owned file is yours to update). `HEAD` is `0cbb563`; the working tree carries the complete
brief-1 result, uncommitted. Continue from it; do not restore or reset anything. The unit
performs the assignment directly and spawns nothing.

## Scope

Owned: brief 1's owned set, with `app/browser/sections/index.ts` deleted by item 6. Off-limits:
as in brief 1 (`src/**`, `guides/**`, `package.json`, `configs/**`, the vendored files,
`tests/setupConformance.ts`, `tests/conformance.test.ts`, `tests/setupStyles.ts`,
`tests/setupListeners.ts`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/fixtures/**`).

## Execution

1. Items 6, 4, 7, and 8 first (placement and naming, cheapest to typecheck), then items 1, 2,
   3, and 5. For item 2 and item 1 record a red on the old assertion where one is reachable
   without a plant (item 2: the old line cannot red, which is the finding; note that instead).
2. Run and record, in this order, each to completion: `npm run format:check`,
   `npm run lint:check`, `npm run check`, `npm run build`, `npm run test:setup`,
   `npm run test:setup:browser`, `npm run test:app:browser`, `npm run test:journey`,
   `CAPTURE=1 npm run test:journey`, `npm run test:distribution`, `npm run test:guides`,
   `npm test`, then `PLAYWRIGHT_CHANNEL=msedge npm run test:journey`,
   `PLAYWRIGHT_CHANNEL=msedge npm run test:app:browser`, and
   `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser`.

## Output

Write `u7c-report-2.md` in the Veneer checkout and return its content as your final
message: per finding, the change as landed with its site; each gate's exit code and final lines
on both engines; the actual `git diff --stat` and `git status --porcelain --untracked-files=all`.
Do not repeat report 1.

## Acceptance criteria

1. Every finding 1 to 8 is closed at its site, each with the case or assertion that pins it.
2. No module-scope function or case matrix remains unexported in any test file this unit owns.
3. `app/browser/sections/` holds class files only; the app barrel exports `ButtonSection`.
4. Every gate in Execution item 2 exits 0 on managed Chromium and Edge.
5. `git status --porcelain --untracked-files=all` shows only the owned set and the reports.

## Review evidence

The actual `git diff` and `git status` at return; this report with report 1.
